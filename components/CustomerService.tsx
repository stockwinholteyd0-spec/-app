
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  text: string;
  isMe: boolean;
  timestamp: Date;
}

interface CustomerServiceProps {
  onBack: () => void;
}

const FAQ_ITEMS = [
  { id: 'f1', icon: '💰', title: '充值没到账', desc: '秒币充值异常处理' },
  { id: 'f2', icon: '💎', title: '会员权益', desc: 'VIP各等级详细特权' },
  { id: 'f3', icon: '🔒', title: '账号注销', desc: '如何找回或注销账号' },
  { id: 'f4', icon: '🚫', title: '举报投诉', desc: '发现违规行为怎么办' },
];

const CustomerService: React.FC<CustomerServiceProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      text: '您好！我是MIAHUI极速客服专员。请问有什么可以帮您的吗？如果您遇到了技术问题、充值疑问或举报建议，请随时告诉我。', 
      isMe: false, 
      timestamp: new Date() 
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const generateAIReply = async (userMessage: string) => {
    try {
      setIsTyping(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Following guidelines: setting both maxOutputTokens and thinkingBudget together.
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `你是MIAHUI极速社交应用的官方客服。你的名字叫"秒回小助手"。
          MIAHUI的核心功能是极速视频匹配和即时回复（秒回）。
          应用内货币是"秒币"（1元=10秒币）。
          会员等级分为基础会员、专业会员、精英会员。
          你的语气必须非常专业、礼貌且高效。始终以帮助用户解决问题为首要任务。
          如果用户询问充值没到账，请告知他们提供订单号并稍等，系统正在自动同步。`,
          maxOutputTokens: 200,
          thinkingConfig: { thinkingBudget: 100 },
          temperature: 0.7,
        },
      });

      const replyText = response.text || "抱歉，由于网络波动，我暂时无法处理您的请求。请稍后再试或点击FAQ查看。";
      
      setIsTyping(false);
      const reply: Message = {
        id: Date.now().toString(),
        text: replyText,
        isMe: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, reply]);
    } catch (error) {
      console.error("Support AI Error:", error);
      setIsTyping(false);
    }
  };

  const sendMessage = (text: string = inputText) => {
    const finalMsg = text.trim();
    if (!finalMsg) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: finalMsg,
      isMe: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    if (text === inputText) setInputText('');
    
    setTimeout(() => {
      generateAIReply(finalMsg);
    }, 800);
  };

  const handleFaqClick = (faq: typeof FAQ_ITEMS[0]) => {
    sendMessage(`关于"${faq.title}"的问题咨询`);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] animate-in slide-in-from-right duration-300 relative">
      <header className="pt-14 px-6 pb-4 glass-nav sticky top-0 z-30 flex items-center border-b border-slate-100/50">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 active:bg-slate-100 transition-colors mr-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div>
          <h1 className="text-lg font-black text-slate-900">官方在线客服</h1>
          <div className="flex items-center gap-1">
             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
             <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Support Online</span>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Help Center Content */}
        <div className="px-6 pt-8 pb-4">
           <div className="px-2 mb-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">常见问题解答</h3>
           </div>
           
           <div className="grid grid-cols-2 gap-3 mb-10">
              {FAQ_ITEMS.map(item => (
                <button 
                  key={item.id}
                  onClick={() => handleFaqClick(item)}
                  className="bg-white p-4 rounded-[32px] border border-slate-100/50 shadow-sm flex flex-col gap-2 active:scale-95 transition-all text-left group hover:border-emerald-500/30"
                >
                  <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-xl group-hover:bg-emerald-50 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800">{item.title}</h4>
                    <p className="text-[9px] text-slate-400 font-medium">{item.desc}</p>
                  </div>
                </button>
              ))}
           </div>

           <div className="px-2 mb-6 border-t border-slate-100 pt-8">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">对话历史</h3>
           </div>
        </div>

        {/* Chat Messages */}
        <div ref={scrollRef} className="px-6 pb-40 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className="max-w-[85%]">
                 <div className={`px-5 py-3.5 rounded-[24px] text-sm font-medium leading-relaxed shadow-sm ${
                   msg.isMe 
                    ? 'bg-slate-900 text-white rounded-br-none' 
                    : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                 }`}>
                   {msg.text}
                 </div>
                 <div className={`mt-2 flex items-center gap-1 ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                   <span className="text-[8px] font-black text-slate-300 uppercase">
                     {msg.timestamp.getHours()}:{msg.timestamp.getMinutes().toString().padStart(2, '0')}
                   </span>
                 </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white px-5 py-4 rounded-[24px] rounded-bl-none shadow-sm border border-slate-100 flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white/95 backdrop-blur-xl border-t border-slate-50 z-40">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={inputText} 
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="描述您遇到的问题..." 
              className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/10 transition-all placeholder:text-slate-300" 
            />
          </div>
          <button 
            onClick={() => sendMessage()}
            disabled={!inputText.trim()}
            className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all disabled:opacity-10"
          >
            <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerService;
