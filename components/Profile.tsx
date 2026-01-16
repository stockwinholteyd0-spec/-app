
import React, { useState } from 'react';
import { LightningIcon, VipBadge, MOCK_GIFTS } from '../constants';
import { MembershipTier, Message } from '../types';

interface ProfileProps {
  onOpenSecurity: () => void;
  onOpenBlacklist: () => void;
  onOpenWallet: () => void;
  onOpenMembership: () => void;
  onOpenCustomerService: () => void;
  onEditProfile: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
  balance: number;
  isVip: boolean;
  vipTier: MembershipTier;
  myProfile: {
    name: string;
    avatar: string;
    photos: string[];
    tags: string[];
    city: string;
    bio: string;
    gender: string;
    age: number;
    education: string;
    height: string;
    weight: string;
    income: string;
    profession: string;
    isVerified: boolean;
    isRealName: boolean;
    isPhoneBound: boolean;
  };
  allChats: Record<string, Message[]>;
}

const Profile: React.FC<ProfileProps> = ({ 
  onOpenSecurity, onOpenBlacklist, onOpenWallet, onOpenMembership, onOpenCustomerService, onEditProfile, onOpenSettings, onLogout, balance, isVip, vipTier, myProfile, allChats
}) => {
  const [fullscreenPhoto, setFullscreenPhoto] = useState<string | null>(null);
  
  // Update: Show Received Gifts instead of Sent Gifts
  const allMessages = (Object.values(allChats) as Message[][]).flat();
  const receivedGifts = allMessages.filter((m): m is Message & { giftId: string } => !m.isMe && !!m.giftId);
  const uniqueReceived = Array.from(new Set(receivedGifts.map(g => g.giftId)));

  // Filter to show only last 3 photos
  const latestPhotos = myProfile.photos.slice(-3);

  const verificationItems = [
    { label: '实名认证', emoji: '👤', active: myProfile.isRealName, color: 'blue' },
    { label: '真人认证', emoji: '🤳', active: myProfile.isVerified, color: 'emerald' },
    { label: '手机认证', emoji: '📱', active: myProfile.isPhoneBound, color: 'amber' },
    { label: '会员认证', emoji: '💎', active: isVip, color: 'purple' },
  ].filter(item => item.active); // ONLY SHOW IF ACTIVE

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] pb-32 overflow-y-auto no-scrollbar relative animate-in fade-in duration-300">
      
      {fullscreenPhoto && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300"
          onClick={() => setFullscreenPhoto(null)}
        >
          <button className="absolute top-14 right-8 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/60 active:bg-white/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img 
            src={fullscreenPhoto} 
            className="max-w-full max-h-[80vh] rounded-[24px] shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-white/10 object-contain" 
            alt="Fullscreen view"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

      {/* Header Card */}
      <div className="relative h-72 shrink-0">
        <div className="absolute inset-0 bg-slate-900 overflow-hidden">
          <img src={myProfile.avatar} className="w-full h-full object-cover opacity-40 blur-2xl scale-125" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-slate-900/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-8 right-8 translate-y-12 z-10 flex flex-col items-center">
           <div className="relative group cursor-pointer" onClick={() => setFullscreenPhoto(myProfile.avatar)}>
             <img src={myProfile.avatar} className="w-28 h-28 rounded-[40px] border-4 border-white object-cover shadow-2xl relative z-10 group-active:scale-95 transition-transform" />
             <div className="absolute -bottom-1 -right-1 bg-emerald-500 p-2.5 rounded-2xl shadow-lg z-20 border-4 border-[#f8fafc]">
               <LightningIcon className="w-4 h-4 text-yellow-300" />
             </div>
           </div>
           
           <div className="mt-4 text-center">
             <div className="flex items-center gap-2 justify-center">
                <h2 className="text-2xl font-[900] text-slate-900 leading-tight">{myProfile.name}</h2>
                {isVip && <VipBadge tier={vipTier} />}
             </div>
             <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase mt-1">ID: 8829103 · {myProfile.city}</p>
           </div>
        </div>

        <div className="absolute top-16 right-8 flex gap-3 z-30">
          <button onClick={onOpenCustomerService} className="w-10 h-10 glass-nav rounded-2xl flex items-center justify-center shadow-xl active:scale-90 transition-transform text-slate-900">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </button>
          <button onClick={onEditProfile} className="glass-nav px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-transform">
            编辑资料
          </button>
          <button onClick={onOpenSettings} className="w-10 h-10 glass-nav rounded-2xl flex items-center justify-center shadow-xl active:scale-90 transition-transform">
            <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>

      <div className="mt-20 px-6 space-y-10">
        
        {/* Verification Strip - Optimized Visibility */}
        {verificationItems.length > 0 && (
          <div className="flex justify-around bg-white p-5 rounded-[32px] shadow-sm border border-slate-100">
             {verificationItems.map(item => (
               <div key={item.label} className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner bg-${item.color}-50 text-${item.color}-500`}>
                    {item.emoji}
                  </div>
                  <span className="text-[8px] font-black text-slate-400 uppercase">{item.label}</span>
               </div>
             ))}
          </div>
        )}

        <section className="animate-reveal">
           <div className="flex items-center justify-between mb-4 px-2">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest italic">个性签名</h3>
           </div>
           <div className="relative bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm overflow-hidden group">
              <div className="absolute top-4 left-6 text-6xl text-emerald-500/10 font-serif">“</div>
              <p className="relative z-10 text-sm text-slate-700 font-medium leading-relaxed italic pr-4">
                {myProfile.bio}
              </p>
           </div>
        </section>

        {/* Interests Tags */}
        <section className="animate-reveal">
           <div className="flex items-center justify-between mb-4 px-2">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest italic">兴趣标签</h3>
           </div>
           <div className="flex flex-wrap gap-2 px-2">
              {(myProfile.tags || []).map((tag: string) => (
                 <div key={tag} className="px-3 py-1.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-600 shadow-sm">
                    #{tag}
                 </div>
              ))}
              {(!myProfile.tags || myProfile.tags.length === 0) && (
                  <p className="text-[10px] text-slate-300 italic">暂无标签</p>
              )}
           </div>
        </section>

        {/* Membership Card - UNIFIED ENTRANCE */}
        <section className="animate-reveal">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-sm font-[900] text-slate-400 tracking-tight italic">尊享会员中心</h3>
            <button onClick={onOpenMembership} className="text-[#10b981] text-xs font-black flex items-center gap-1">详细特权</button>
          </div>
          <div onClick={onOpenMembership} className="relative w-full h-32 rounded-[40px] overflow-hidden group cursor-pointer active:scale-[0.98] transition-all shadow-xl shadow-emerald-500/5 bg-slate-900">
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-[40px] -translate-y-10 translate-x-10"></div>
             
             <div className="absolute inset-0 p-8 flex items-center justify-between">
                <div className="flex flex-col gap-1 z-10">
                   <h4 className="text-xl font-black text-white italic tracking-tighter">MIAHUI VIP</h4>
                   <p className="text-[10px] text-white/60 font-medium tracking-wide">
                     月卡 / 季卡 / 年卡
                   </p>
                   <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full border border-white/10 backdrop-blur-md w-fit">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                      <span className="text-[8px] font-bold text-white/90">解锁全部心动特权</span>
                   </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 group-hover:rotate-12 transition-transform duration-500">
                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14H11V21L20 10H13Z" /></svg>
                </div>
             </div>
          </div>
        </section>

        {/* Assets Wallet Card */}
        <section className="animate-reveal">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-sm font-[900] text-slate-400 tracking-tight italic">我的资产钱包</h3>
            <button onClick={onOpenWallet} className="text-[#10b981] text-xs font-black flex items-center gap-1">充值明细</button>
          </div>
          <div onClick={onOpenWallet} className="relative w-full h-28 rounded-[40px] overflow-hidden group cursor-pointer active:scale-[0.98] transition-all shadow-lg border border-slate-100 bg-white">
             <div className="absolute inset-0 p-8 flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                   <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-[900] text-slate-900 tracking-tighter italic">{balance}</span>
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic">秒币余额</span>
                   </div>
                </div>
                <div className="bg-emerald-500 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">立即充值</div>
             </div>
          </div>
        </section>

        {/* Photo Gallery - Shrunk to 3 items */}
        <section className="animate-reveal">
           <div className="flex items-center justify-between mb-4 px-2">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest italic">我的照片墙 (最近上传)</h3>
           </div>
           <div className="grid grid-cols-3 gap-3">
              {latestPhotos.map((url, idx) => (
                <div key={idx} onClick={() => setFullscreenPhoto(url)} className="group relative aspect-[3/4] rounded-[24px] overflow-hidden shadow-sm bg-slate-100 cursor-pointer active:scale-95 transition-all">
                   <img src={url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Life photo" />
                </div>
              ))}
           </div>
        </section>

        {/* Gift Wall - RECEIVED GIFTS */}
        <section className="animate-reveal">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest italic">收到的礼物 ({receivedGifts.length})</h3>
          </div>
          <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm overflow-hidden">
             {uniqueReceived.length > 0 ? (
               <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                  {uniqueReceived.map(gid => {
                    const gift = MOCK_GIFTS.find(g => g.id === gid);
                    const count = receivedGifts.filter(g => g.giftId === gid).length;
                    return (
                      <div key={gid} className="flex flex-col items-center gap-1 flex-shrink-0">
                         <div className="w-14 h-14 bg-slate-50 rounded-[20px] flex items-center justify-center text-3xl shadow-inner">{gift?.icon}</div>
                         <div className="bg-slate-900 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full -mt-3 shadow-md">x{count}</div>
                         <span className="text-[8px] font-black text-slate-400 uppercase mt-1">{gift?.name}</span>
                      </div>
                    );
                  })}
               </div>
             ) : (
               <p className="text-center text-[10px] font-black text-slate-300 uppercase py-4">暂未收到礼物，努力提升魅力吧</p>
             )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
