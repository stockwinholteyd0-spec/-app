
import React, { useState, useEffect } from 'react';
import { User, Gift } from '../types';
import { MOCK_GIFTS, LightningIcon } from '../constants';

interface VideoCallProps {
  user: User;
  onEnd: () => void;
  myAvatar: string;
  miaCoins: number;
  setMiaCoins: React.Dispatch<React.SetStateAction<number>>;
  isVip: boolean;
}

type GiftTab = 'POPULAR' | 'LUXURY' | 'SPECIAL';

const VideoCall: React.FC<VideoCallProps> = ({ user, onEnd, myAvatar, miaCoins, setMiaCoins, isVip }) => {
  const [timer, setTimer] = useState(0);
  const [isPip, setIsPip] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  
  // Gift State
  const [showGiftPanel, setShowGiftPanel] = useState(false);
  const [activeGiftTab, setActiveGiftTab] = useState<GiftTab>('POPULAR');
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [giftEffect, setGiftEffect] = useState<Gift | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredGifts = MOCK_GIFTS.filter(g => g.category === activeGiftTab);

  const getDiscountRate = () => {
    // Simplified logic for video call (can be passed via props if precise tier is needed)
    return isVip ? 0.85 : 1.0; 
  };

  const handleSendGift = () => {
    if (!selectedGift) return;
    
    const finalPrice = Math.floor(selectedGift.price * getDiscountRate());
    if (miaCoins < finalPrice) {
      alert("秒币不足，请充值");
      return;
    }

    setMiaCoins(prev => prev - finalPrice);
    setShowGiftPanel(false);
    
    // Trigger Effect
    setGiftEffect(selectedGift);
    setTimeout(() => {
      setGiftEffect(null);
      setSelectedGift(null);
    }, 3000);
  };

  return (
    <div className={`relative h-full bg-slate-900 transition-all duration-500 overflow-hidden ${isPip ? 'scale-50 translate-x-1/4 -translate-y-1/4 rounded-[48px] shadow-2xl' : 'h-full'}`}>
      
      {/* GIFT EFFECT OVERLAY */}
      {giftEffect && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-black/40 animate-in fade-in duration-300"></div>
            <div className="relative flex flex-col items-center animate-in zoom-in duration-500">
               <div className="text-[120px] animate-[bounce_1s_infinite] filter drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">{giftEffect.icon}</div>
               <h2 className="text-3xl font-black text-white italic tracking-tighter mt-4 drop-shadow-md animate-in slide-in-from-bottom duration-700">{giftEffect.name}</h2>
               <div className="mt-2 bg-gradient-to-r from-emerald-500 to-emerald-400 px-4 py-1 rounded-full shadow-lg">
                  <span className="text-xs font-black text-white uppercase tracking-widest">Sent Successfully</span>
               </div>
            </div>
            {/* Particles */}
            {[...Array(15)].map((_, i) => (
               <div key={i} className="absolute text-2xl animate-[ping_1.5s_ease-out_infinite]" 
                    style={{
                      left: `${Math.random() * 80 + 10}%`, 
                      top: `${Math.random() * 80 + 10}%`,
                      animationDelay: `${Math.random()}s`
                    }}>
                 ✨
               </div>
            ))}
        </div>
      )}

      {/* GIFT PANEL OVERLAY */}
      {showGiftPanel && (
        <div className="absolute inset-0 z-[90] flex items-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowGiftPanel(false)}></div>
          <div className="relative w-full bg-[#1a1a1a]/95 backdrop-blur-2xl rounded-t-[40px] px-0 pt-6 pb-8 animate-in slide-in-from-bottom duration-300 border-t border-white/10">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/20 rounded-full"></div>
            
            {/* Header */}
            <div className="px-6 flex items-center justify-between mb-6">
               <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                  <span className="text-sm">💰</span>
                  <span className="text-xs font-bold text-white">{miaCoins}</span>
                  <button className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[10px] shadow-sm ml-1">+</button>
               </div>
               <div className="flex gap-1 bg-black/40 p-1 rounded-full border border-white/5">
                 {(['POPULAR', 'LUXURY', 'SPECIAL'] as GiftTab[]).map(tab => (
                   <button 
                     key={tab}
                     onClick={() => setActiveGiftTab(tab)}
                     className={`px-3 py-1 rounded-full text-[9px] font-black transition-all ${activeGiftTab === tab ? 'bg-white/20 text-white shadow-sm' : 'text-white/40 hover:text-white/60'}`}
                   >
                     {tab === 'POPULAR' ? '热门' : tab === 'LUXURY' ? '豪华' : '特效'}
                   </button>
                 ))}
               </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-4 gap-y-4 gap-x-2 px-4 max-h-[30vh] overflow-y-auto no-scrollbar mb-4">
              {filteredGifts.map(gift => {
                const isSelected = selectedGift?.id === gift.id;
                const discountRate = getDiscountRate();
                const price = Math.floor(gift.price * discountRate);
                return (
                  <button 
                    key={gift.id}
                    onClick={() => setSelectedGift(gift)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-[24px] transition-all ${isSelected ? 'bg-emerald-500/20 border border-emerald-500/50' : 'hover:bg-white/5 border border-transparent'}`}
                  >
                    <div className="text-3xl mb-1 filter drop-shadow-lg">{gift.icon}</div>
                    <div className="text-center">
                       <p className={`text-[9px] font-bold mb-0.5 ${isSelected ? 'text-emerald-400' : 'text-white/80'}`}>{gift.name}</p>
                       <div className="flex items-center justify-center gap-0.5">
                          <span className="text-[8px] text-white/40">💰</span>
                          <span className={`text-[9px] font-black ${isSelected ? 'text-white' : 'text-white/60'}`}>{price}</span>
                       </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Footer Action */}
            <div className="px-6">
              <button 
                onClick={handleSendGift}
                disabled={!selectedGift}
                className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${selectedGift ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 active:scale-95' : 'bg-white/10 text-white/30'}`}
              >
                <LightningIcon className={`w-3.5 h-3.5 ${selectedGift ? 'text-black' : 'text-white/30'}`} />
                {selectedGift ? `赠送 (${Math.floor(selectedGift.price * getDiscountRate())} 币)` : '选择礼物'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Video Layer */}
      <div className="w-full h-full relative">
        <img src={user.avatar} className="w-full h-full object-cover scale-105" />
        {isVideoOff && <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-white/50"><svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 3l18 18M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></div>}
      </div>

      {/* Top Controls Area */}
      <div className="absolute top-0 left-0 right-0 p-6 z-30 flex items-start gap-4">
        {/* Back/Minimize Button */}
        <button 
          onClick={() => setIsPip(!isPip)} 
          className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 active:bg-black/40 transition-colors shadow-lg"
        >
           {isPip ? (
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5" /></svg>
           ) : (
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
           )}
        </button>

        {/* User Info */}
        <div className="glass-nav p-1 pr-5 rounded-full flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20">
          <img src={user.avatar} className="w-11 h-11 rounded-full border-2 border-emerald-500 object-cover" />
          <div>
            <h4 className="font-black text-white text-sm">{user.name}</h4>
            <p className="text-[10px] text-emerald-400 font-black tracking-tighter uppercase">{formatTime(timer)}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-12 left-0 right-0 px-8 z-40">
        <div className="relative flex items-end justify-center">
          
          {/* Main Controls Center */}
          <div className="flex items-center gap-6">
             <button 
              onClick={() => setIsMuted(!isMuted)} 
              className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all shadow-lg active:scale-95 ${
                isMuted 
                  ? 'bg-white text-slate-900 border-white' 
                  : 'bg-white/20 backdrop-blur-xl text-white border-white/20 hover:bg-white/30'
              }`}
             >
                {isMuted ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" strokeWidth="2.5" /><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2.5" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" strokeWidth="2.5" /></svg>
                )}
             </button>
             
             <button 
              onClick={onEnd} 
              className="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-red-500/30 active:scale-90 transition-all border-4 border-white/20 hover:bg-red-600"
             >
               <svg className="w-9 h-9 rotate-[135deg]" fill="currentColor" viewBox="0 0 24 24"><path d="M21 15.46l-5.27-.61-2.52 2.52a15.045 15.045 0 01-6.59-6.59l2.52-2.52-.61-5.27C8.4 2.39 7.74 2 7.06 2H3c-.55 0-1 .45-1 1 0 10.49 8.51 19 19 19 .55 0 1-.45 1-1v-4.06c0-.68-.39-1.34-1.03-1.48z" /></svg>
             </button>
             
             <button 
              onClick={() => setIsVideoOff(!isVideoOff)} 
              className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all shadow-lg active:scale-95 ${
                isVideoOff 
                  ? 'bg-white text-slate-900 border-white' 
                  : 'bg-white/20 backdrop-blur-xl text-white border-white/20 hover:bg-white/30'
              }`}
             >
               {isVideoOff ? (
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2.5" /><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2.5" /></svg>
               ) : (
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2.5" /></svg>
               )}
             </button>
          </div>

          {/* Secondary Controls Right */}
          <div className="absolute right-0 bottom-0 flex flex-col gap-3">
             <button 
              onClick={() => setShowGiftPanel(true)} 
              className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center shadow-lg border border-white/20 active:scale-90 transition-all animate-[bounce_3s_infinite]"
            >
              <span className="text-xl filter drop-shadow-md">🎁</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VideoCall;
