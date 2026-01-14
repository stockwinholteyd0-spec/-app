
import React, { useState, useEffect, useRef } from 'react';
import { User, Message, Gift, MembershipTier } from '../types';
import { LightningIcon, MOCK_GIFTS } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface ChatRoomProps {
  user: User;
  onBack: () => void;
  onStartCall: () => void;
  miaCoins: number;
  setMiaCoins: React.Dispatch<React.SetStateAction<number>>;
  onOpenWallet: () => void;
  isVip: boolean;
  vipTier: MembershipTier;
  persistedMessages: Message[];
  onMessagesUpdate: (messages: Message[]) => void;
  myAvatar: string;
  freeCredits: number;
  setFreeCredits: React.Dispatch<React.SetStateAction<number>>;
  onOpenMembership: () => void;
}

type GiftTab = 'POPULAR' | 'LUXURY' | 'SPECIAL';

const ChatRoom: React.FC<ChatRoomProps> = ({ 
  user, onBack, onStartCall, miaCoins, setMiaCoins, onOpenWallet, isVip, vipTier, persistedMessages, onMessagesUpdate, myAvatar, freeCredits, setFreeCredits, onOpenMembership
}) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (persistedMessages.length > 0) return persistedMessages;
    return [
      { id: '1', senderId: user.id, text: `嘿，我是${user.name}，很高兴认识你！✨`, timestamp: new Date(Date.now() - 1000 * 60 * 5), isMe: false, status: 'read' },
    ];
  });
  
  const [inputText, setInputText] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showGiftPanel, setShowGiftPanel] = useState(false);
  const [activeGiftTab, setActiveGiftTab] = useState<GiftTab>('POPULAR');
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [showTrialExhausted, setShowTrialExhausted] = useState(false);
  const [giftConfirmation, setGiftConfirmation] = useState<{ giftName: string, userName: string } | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onMessagesUpdate(messages);
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (giftConfirmation) {
      const timer = setTimeout(() => {
        setGiftConfirmation(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [giftConfirmation]);

  const getDiscountRate = (tier: MembershipTier) => {
    switch (tier) {
      case MembershipTier.ELITE: return 0.8;
      case MembershipTier.PRO: return 0.85;
      case MembershipTier.BASIC: return 0.95;
      default: return 1.0;
    }
  };

  const generateAIReply = async (userMessage: string) => {
    try {
      setIsTyping(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `你是${user.name}，一个${user.age}岁的${user.city}女生。你的性格开朗、直接，喜欢用表情符号。如果你收到了礼物，要表现得非常开心和感激。`,
          maxOutputTokens: 100,
          thinkingConfig: { thinkingBudget: 50 },
          temperature: 0.8,
        },
      });

      const replyText = response.text || "哎呀，刚才信号晃了一下，你说什么？😊";
      
      setIsTyping(false);
      const reply: Message = {
        id: Date.now().toString(),
        senderId: user.id,
        text: replyText,
        timestamp: new Date(),
        isMe: false,
        status: 'sent'
      };
      setMessages(prev => [...prev, reply]);
    } catch (error) {
      console.error("AI Reply Error:", error);
      setIsTyping(false);
    }
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    if (!isVip && freeCredits <= 0) {
      setShowTrialExhausted(true);
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputText,
      timestamp: new Date(),
      isMe: true,
      status: 'sent'
    };
    
    setMessages(prev => [...prev, newMessage]);
    const currentInput = inputText;
    setInputText('');

    if (!isVip) {
      setFreeCredits(prev => Math.max(0, prev - 1));
    }
    
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMessage.id ? {...m, status: 'read'} : m));
      generateAIReply(currentInput);
    }, 800);
  };

  const sendGift = () => {
    if (!selectedGift) return;
    
    const finalPrice = Math.floor(selectedGift.price * getDiscountRate(vipTier));

    if (miaCoins < finalPrice) {
      if(window.confirm("秒币不足，是否前往充值？")) {
        onOpenWallet();
      }
      return;
    }

    setMiaCoins(prev => prev - finalPrice);
    const giftMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: `赠送了 ${selectedGift.name}`,
      timestamp: new Date(),
      isMe: true,
      status: 'sent',
      giftId: selectedGift.id
    };
    setMessages(prev => [...prev, giftMessage]);
    
    setGiftConfirmation({ giftName: selectedGift.name, userName: user.name });
    
    setShowGiftPanel(false);
    setSelectedGift(null);

    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === giftMessage.id ? {...m, status: 'read'} : m));
      generateAIReply(`[系统消息] 我刚才送了你一个 ${selectedGift.name}，你看到了吗？`);
    }, 1000);
  };

  const handleRecall = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isRecalled: true } : m));
    setActiveMenuId(null);
  };

  const filteredGifts = MOCK_GIFTS.filter(g => g.category === activeGiftTab);

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] animate-in slide-in-from-right duration-300 relative">
      {giftConfirmation && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-[150] animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-[24px] shadow-2xl border border-white/10 flex items-center gap-3">
            <span className="text-xl">💝</span>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-none mb-1">成功送出礼物</span>
              <span className="text-xs font-bold text-white">
                已赠送 <span className="text-emerald-400">{giftConfirmation.giftName}</span> 给 <span className="text-emerald-400">{giftConfirmation.userName}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {showTrialExhausted && (
        <div className="absolute inset-0 z-[200] flex items-center justify-center p-8">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowTrialExhausted(false)}></div>
           <div className="relative w-full bg-white rounded-[48px] p-8 text-center shadow-2xl animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">💎</span>
              </div>
              <h2 className="text-2xl font-[900] text-slate-900 tracking-tighter mb-2">试用次数已用完</h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8 px-4">
                为了保证社区质量，非会员用户仅限发送5条免费信息。开通VIP即可享受无限次视频匹配与畅聊特权。
              </p>
              <div className="space-y-4">
                <button 
                  onClick={() => { setShowTrialExhausted(false); onOpenMembership(); }}
                  className="w-full bg-emerald-500 text-white font-[900] py-4 rounded-2xl shadow-xl shadow-emerald-500/20 active:scale-95 transition-all uppercase tracking-widest italic"
                >
                  开通VIP心动会员
                </button>
                <button 
                  onClick={() => setShowTrialExhausted(false)}
                  className="w-full py-4 text-slate-400 font-bold text-sm uppercase tracking-widest"
                >
                  稍后再说
                </button>
              </div>
           </div>
        </div>
      )}

      <header className="pt-14 px-6 pb-4 glass-nav sticky top-0 z-30 flex items-center justify-between border-b border-slate-100/50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 active:bg-slate-100 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="flex items-center gap-3 cursor-pointer" onClick={onStartCall}>
            <div className="relative">
              <img src={user.avatar} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 leading-none">{user.name}</h3>
              <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest mt-1">
                {isTyping ? '正在输入...' : '在线 · 即刻视频'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           {!isVip && (
             <div className="px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-1.5 shadow-sm">
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest italic">Trial {freeCredits}/5</span>
             </div>
           )}
           <button onClick={onStartCall} className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform">
             <LightningIcon className="w-5 h-5 text-yellow-400" />
           </button>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-6 no-scrollbar" onClick={() => { setActiveMenuId(null); if (!showGiftPanel) setSelectedGift(null); }}>
        {messages.map((msg) => {
          const gift = msg.giftId ? MOCK_GIFTS.find(g => g.id === msg.giftId) : null;
          return (
            <div key={msg.id} className="flex flex-col">
              {msg.isRecalled ? (
                <div className="text-center my-2">
                  <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
                    {msg.isMe ? '你撤回了一条消息' : `${user.name}撤回了一条消息`}
                  </span>
                </div>
              ) : (
                <div className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} items-end gap-2 relative group animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  {!msg.isMe && <img src={user.avatar} className="w-7 h-7 rounded-full object-cover mb-1 shadow-sm border border-slate-100" />}
                  <div className="relative">
                    {gift ? (
                      <div className={`p-4 rounded-[24px] border border-emerald-100 shadow-xl flex flex-col items-center gap-2 bg-gradient-to-br from-emerald-50 to-white ${msg.isMe ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                        <span className="text-4xl animate-bounce">{gift.icon}</span>
                        <div className="text-center">
                          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{msg.isMe ? '你赠送了' : '收到了'}</p>
                          <p className="text-sm font-black text-slate-900">{gift.name}</p>
                        </div>
                      </div>
                    ) : (
                      <div onClick={() => msg.isMe && setActiveMenuId(activeMenuId === msg.id ? null : msg.id)}
                        className={`max-w-[75vw] px-4 py-2.5 text-sm font-medium leading-relaxed transition-all cursor-pointer ${
                          msg.isMe ? 'bg-emerald-500 text-white rounded-[18px] rounded-br-none shadow-md shadow-emerald-500/10' : 'bg-white text-slate-700 rounded-[18px] rounded-bl-none shadow-sm border border-slate-100'
                        }`}
                      >
                        {msg.text}
                      </div>
                    )}
                    
                    {activeMenuId === msg.id && (
                      <div className="absolute -top-12 right-0 bg-slate-900 text-white text-[10px] font-black rounded-xl py-2 px-4 shadow-2xl z-40 animate-in fade-in zoom-in duration-150 flex gap-4 uppercase tracking-widest">
                         <button onClick={() => handleRecall(msg.id)} className="hover:text-emerald-400">撤回</button>
                         <button className="hover:text-emerald-400">复制</button>
                      </div>
                    )}
                    <div className={`flex items-center gap-1 mt-1 ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-[8px] font-bold text-slate-300 uppercase">
                        {new Date(msg.timestamp).getHours()}:{new Date(msg.timestamp).getMinutes().toString().padStart(2, '0')}
                      </span>
                      {msg.isMe && (
                        <div className="flex">
                          <svg className={`w-3 h-3 ${msg.status === 'read' ? 'text-emerald-500' : 'text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                          {msg.status === 'read' && <svg className="w-3 h-3 text-emerald-500 -ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>}
                        </div>
                      )}
                    </div>
                  </div>
                  {msg.isMe && <img src={myAvatar} className="w-7 h-7 rounded-full object-cover mb-1 shadow-sm border border-slate-100" />}
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex justify-start items-end gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <img src={user.avatar} className="w-7 h-7 rounded-full object-cover mb-1 shadow-sm border border-slate-100" />
            <div className="bg-white px-5 py-4 rounded-[24px] rounded-bl-none shadow-sm border border-slate-100 flex gap-1.5 items-center">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        )}
      </div>

      {/* RE-DESIGNED Gift Panel - SHRUNKEN SIZE */}
      {showGiftPanel && (
        <div className="absolute inset-0 z-[100] flex items-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300" onClick={() => setShowGiftPanel(false)}></div>
          <div className="relative w-full bg-white/95 backdrop-blur-2xl rounded-t-[40px] px-0 pt-6 pb-8 animate-in slide-in-from-bottom duration-400 shadow-[0_-15px_40px_rgba(0,0,0,0.15)] border-t border-white/40 overflow-hidden">
            
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-slate-200 rounded-full"></div>

            {/* Panel Header - Smaller spacing */}
            <div className="px-6 flex items-center justify-between mb-4">
              <div onClick={onOpenWallet} className="flex items-center gap-2 bg-white py-1.5 px-3 rounded-[16px] shadow-sm border border-slate-100 active:scale-95 transition-transform cursor-pointer">
                <span className="text-base">💰</span>
                <span className="text-xs font-black text-slate-800 tracking-tight">{miaCoins}</span>
                <div className="w-4 h-4 bg-emerald-500 text-white rounded-md flex items-center justify-center shadow-md ml-1">
                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path d="M12 4v16m8-8H4" /></svg>
                </div>
              </div>
              
              <div className="flex bg-slate-100/50 p-1 rounded-full border border-slate-200/50 relative">
                {(['POPULAR', 'LUXURY', 'SPECIAL'] as GiftTab[]).map(tab => (
                  <button 
                    key={tab} 
                    onClick={() => { setActiveGiftTab(tab); setSelectedGift(null); }} 
                    className={`relative z-10 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                      activeGiftTab === tab ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-500'
                    }`}
                  >
                    {tab === 'POPULAR' ? '热门' : tab === 'LUXURY' ? '豪华' : '特效'}
                    {activeGiftTab === tab && (
                      <div className="absolute inset-0 bg-white rounded-full shadow-sm -z-10 animate-in zoom-in duration-200"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Gift Grid - Smaller items */}
            <div className="grid grid-cols-4 gap-y-4 gap-x-2 max-h-[32vh] overflow-y-auto no-scrollbar pb-4 px-3">
               {filteredGifts.map(gift => {
                 const isSelected = selectedGift?.id === gift.id;
                 const discountRate = getDiscountRate(vipTier);
                 const discountedPrice = Math.floor(gift.price * discountRate);
                 return (
                   <button 
                    key={gift.id} 
                    onClick={() => setSelectedGift(gift)} 
                    className={`relative flex flex-col items-center gap-2 p-2 rounded-[28px] transition-all duration-200 outline-none ${
                      isSelected ? 'bg-emerald-50 shadow-inner' : 'hover:bg-slate-50'
                    }`}
                   >
                      <div className={`relative w-12 h-12 rounded-[20px] flex items-center justify-center text-2xl transition-all duration-300 ${
                        isSelected ? 'scale-110 -rotate-2 bg-white shadow-lg shadow-emerald-500/5' : 'bg-slate-50 border border-slate-100'
                      }`}>
                         {gift.icon}
                         {isSelected && (
                           <div className="absolute inset-0 bg-emerald-500/5 rounded-[20px] animate-pulse"></div>
                         )}
                      </div>
                      
                      <div className="text-center">
                         <p className={`text-[9px] font-black mb-0.5 transition-colors ${
                           isSelected ? 'text-emerald-700' : 'text-slate-600'
                         }`}>{gift.name}</p>
                         
                         <div className="flex flex-col items-center">
                            <div className="flex items-center gap-1">
                               <span className="text-[6px]">💰</span>
                               <span className={`text-[9px] font-black tracking-tighter ${
                                 isSelected ? 'text-emerald-500' : 'text-slate-400'
                               }`}>{isVip ? discountedPrice : gift.price}</span>
                            </div>
                         </div>
                      </div>

                      {isVip && discountRate < 1 && (
                        <div className="absolute top-0.5 right-0.5 bg-amber-400 text-black text-[5px] font-black px-1 py-0.5 rounded shadow-sm border border-white tracking-tighter uppercase italic">
                           -{Math.round((1 - discountRate) * 100)}%
                        </div>
                      )}
                      
                      {isSelected && (
                        <div className="absolute -bottom-0.5 w-1 h-1 bg-emerald-500 rounded-full"></div>
                      )}
                   </button>
                 );
               })}
            </div>

            {/* Bottom Panel Actions - Shrunken */}
            <div className="mx-4 mt-2 p-4 rounded-[30px] bg-white border border-slate-100 shadow-[0_5px_20px_rgba(0,0,0,0.02)] flex items-center gap-3 animate-in slide-in-from-bottom duration-400">
               <div className="flex-1 min-w-0">
                 {selectedGift ? (
                   <div className="flex items-center gap-2.5 animate-in fade-in slide-in-from-left duration-200">
                      <div className="w-10 h-10 bg-emerald-50 rounded-[18px] flex items-center justify-center text-xl shadow-sm">
                        {selectedGift.icon}
                      </div>
                      <div className="truncate">
                        <p className="text-[9px] font-black text-slate-800 leading-none mb-0.5 uppercase tracking-widest">
                          赠送给 {user.name}
                        </p>
                        <p className="text-[12px] text-emerald-500 font-black italic tracking-tighter">
                          支付 {Math.floor(selectedGift.price * getDiscountRate(vipTier))} 秒币
                        </p>
                      </div>
                   </div>
                 ) : (
                   <div className="flex items-center gap-2 opacity-40 px-1 italic">
                     <span className="text-lg">✨</span>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">请选择一份心动好礼</p>
                   </div>
                 )}
               </div>
               
               <button 
                onClick={sendGift} 
                disabled={!selectedGift} 
                className={`px-6 py-3 font-black text-xs rounded-[20px] transition-all flex items-center justify-center gap-1.5 italic uppercase tracking-widest ${
                  selectedGift 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/15 active:scale-95' 
                    : 'bg-slate-100 text-slate-300'
                }`}
               >
                 {selectedGift && <LightningIcon className="w-3.5 h-3.5 text-yellow-300" />}
                 立即赠送
               </button>
            </div>
          </div>
        </div>
      )}

      <div className="px-6 pt-2 pb-10 bg-white/95 backdrop-blur-xl border-t border-slate-50 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowGiftPanel(true)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${showGiftPanel ? 'bg-emerald-500 text-white shadow-lg rotate-12' : 'bg-slate-50 text-slate-400 active:scale-90 hover:bg-emerald-50 hover:text-emerald-500'}`}>
             <span className="text-2xl">🎁</span>
          </button>
          <div className="flex-1 relative">
            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="此刻想聊什么..." className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/10 transition-all placeholder:text-slate-300" />
          </div>
          {inputText.trim() ? (
            <button onClick={sendMessage} className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 active:scale-90 transition-all">
              <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
            </button>
          ) : (
            <div className="flex gap-2">
              <button className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center active:scale-90 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              </button>
              <button onClick={onStartCall} className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 active:scale-90 transition-transform">
                <LightningIcon className="w-6 h-6 text-yellow-300" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
