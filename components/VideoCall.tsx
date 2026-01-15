
import React, { useState, useEffect } from 'react';
import { User, Gift, MembershipTier } from '../types';
import { LightningIcon, MOCK_GIFTS } from '../constants';

interface VideoCallProps {
  user: User;
  onEnd: () => void;
  myAvatar: string;
  miaCoins: number;
  setMiaCoins: React.Dispatch<React.SetStateAction<number>>;
  isVip: boolean;
  vipTier: MembershipTier;
}

const VideoCall: React.FC<VideoCallProps> = ({ user, onEnd, myAvatar, miaCoins, setMiaCoins, isVip, vipTier }) => {
  const [timer, setTimer] = useState(0);
  const [isPip, setIsPip] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [showGiftPanel, setShowGiftPanel] = useState(false);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDiscountRate = (tier: MembershipTier) => {
    switch (tier) {
      case MembershipTier.ELITE: return 0.8;
      case MembershipTier.PRO: return 0.85;
      case MembershipTier.BASIC: return 0.95;
      default: return 1.0;
    }
  };

  const sendGift = () => {
    if (!selectedGift) return;
    const price = Math.floor(selectedGift.price * getDiscountRate(vipTier));
    if (miaCoins < price) { alert('余额不足'); return; }
    setMiaCoins(prev => prev - price);
    setShowGiftPanel(false);
    setSelectedGift(null);
  };

  return (
    <div className={`relative h-full bg-slate-900 transition-all duration-500 overflow-hidden ${isPip ? 'scale-50 translate-x-1/4 -translate-y-1/4 rounded-[48px] shadow-2xl' : 'h-full'}`}>
      <div className="w-full h-full relative">
        <img src={user.avatar} className="w-full h-full object-cover scale-105" />
        {isVideoOff && <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-white/50"><svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 3l18 18M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></div>}
      </div>

      <div className="absolute top-16 right-6 w-32 h-44 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 z-30">
        <img src={isFrontCamera ? myAvatar : 'https://picsum.photos/seed/backcam/300/400'} className={`w-full h-full object-cover ${isVideoOff ? 'opacity-0' : 'opacity-100'}`} />
        {isVideoOff && <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-[10px] text-white/40 uppercase">Video Off</div>}
      </div>

      {/* Header Info */}
      <div className="absolute top-16 left-6 flex flex-col gap-2 z-30">
        <div className="glass-nav p-1 pr-5 rounded-full flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20">
          <img src={user.avatar} className="w-11 h-11 rounded-full border-2 border-emerald-500 object-cover" />
          <div>
            <h4 className="font-black text-white text-sm">{user.name}</h4>
            <p className="text-[10px] text-emerald-400 font-black tracking-tighter uppercase">{formatTime(timer)}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-12 left-0 right-0 px-8 flex flex-col gap-8 z-40">
        {/* Gift Grid Overlay */}
        {showGiftPanel && (
           <div className="bg-black/60 backdrop-blur-2xl p-6 rounded-[40px] border border-white/10 shadow-2xl animate-in slide-in-from-bottom duration-300">
              <div className="flex justify-between items-center mb-4"><span className="text-[10px] font-black text-white/50 uppercase tracking-widest">发送心动礼物</span><button onClick={()=>setShowGiftPanel(false)} className="text-white/40">关闭</button></div>
              <div className="grid grid-cols-4 gap-4 overflow-y-auto max-h-48 no-scrollbar">
                {MOCK_GIFTS.slice(0, 8).map(g => (
                  <button key={g.id} onClick={()=>setSelectedGift(g)} className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${selectedGift?.id === g.id ? 'bg-emerald-500/20 ring-2 ring-emerald-500' : ''}`}>
                    <span className="text-2xl">{g.icon}</span>
                    <span className="text-[8px] font-black text-white/60">{g.name}</span>
                  </button>
                ))}
              </div>
              <button onClick={sendGift} disabled={!selectedGift} className="w-full mt-4 bg-emerald-500 text-white font-black py-3 rounded-xl disabled:opacity-30">立即赠送 {selectedGift ? `(¥${Math.floor(selectedGift.price*getDiscountRate(vipTier))})` : ''}</button>
           </div>
        )}

        <div className="flex justify-between items-center">
          <button onClick={() => setShowGiftPanel(!showGiftPanel)} className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">🎁</button>
          
          <div className="flex gap-4">
             <button onClick={() => setIsMuted(!isMuted)} className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all ${isMuted ? 'bg-red-500 border-red-400 text-white' : 'bg-white/10 backdrop-blur-md text-white border-white/30'}`}>
                {isMuted ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" strokeWidth="2.5" /></svg> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" strokeWidth="2.5" /></svg>}
             </button>
             <button onClick={onEnd} className="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-all border-4 border-white/20">
               <svg className="w-10 h-10 rotate-[135deg]" fill="currentColor" viewBox="0 0 24 24"><path d="M21 15.46l-5.27-.61-2.52 2.52a15.045 15.045 0 01-6.59-6.59l2.52-2.52-.61-5.27C8.4 2.39 7.74 2 7.06 2H3c-.55 0-1 .45-1 1 0 10.49 8.51 19 19 19 .55 0 1-.45 1-1v-4.06c0-.68-.39-1.34-1.03-1.48z" /></svg>
             </button>
             <button onClick={() => setIsVideoOff(!isVideoOff)} className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all ${isVideoOff ? 'bg-red-500 border-red-400 text-white' : 'bg-white/10 backdrop-blur-md text-white border-white/30'}`}>
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2.5" /></svg>
             </button>
          </div>

          <div className="flex flex-col gap-2">
            <button onClick={() => setIsPip(!isPip)} className="w-14 h-14 bg-white/10 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/30"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" strokeWidth="2.5" /></svg></button>
            <button onClick={() => setIsFrontCamera(!isFrontCamera)} className="w-14 h-14 bg-white/10 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/30"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeWidth="2.5" /></svg></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
