
import React from 'react';
import { LightningIcon, VipBadge, MOCK_GIFTS } from '../constants';
import { MembershipTier, Message } from '../types';

interface ProfileProps {
  onOpenSettings: () => void;
  onOpenWallet: () => void;
  onOpenMembership: () => void;
  onEditProfile: () => void;
  balance: number;
  isVip: boolean;
  vipTier: MembershipTier;
  myProfile: {
    name: string;
    avatar: string;
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
  onOpenSettings, onOpenWallet, onOpenMembership, onEditProfile, balance, isVip, vipTier, myProfile, allChats
}) => {
  const sentGifts = (Object.values(allChats) as Message[][]).flat().filter((m: Message) => m.isMe && m.giftId);
  const uniqueGifts = Array.from(new Set(sentGifts.map((g: Message) => g.giftId as string)));

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] pb-32 overflow-y-auto no-scrollbar relative animate-in fade-in duration-300">
      
      {/* Header Card */}
      <div className="relative h-72 shrink-0">
        <div className="absolute inset-0 bg-slate-900 overflow-hidden">
          <img src={myProfile.avatar} className="w-full h-full object-cover opacity-40 blur-2xl scale-125" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-slate-900/40 to-transparent"></div>
        
        {/* Top Actions */}
        <div className="absolute top-14 left-8 right-8 flex justify-between items-center z-30">
          <button 
            onClick={onEditProfile}
            className="glass-nav px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 active:scale-95 transition-transform"
          >
            编辑资料
          </button>
          <button 
            onClick={onOpenSettings}
            className="w-10 h-10 glass-nav rounded-2xl flex items-center justify-center text-slate-800 shadow-xl active:scale-90 transition-transform"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
        </div>
        
        <div className="absolute bottom-0 left-8 right-8 translate-y-12 z-10 flex flex-col items-center">
           <div className="relative">
             <img src={myProfile.avatar} className="w-28 h-28 rounded-[40px] border-4 border-white object-cover shadow-2xl relative z-10" />
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
      </div>

      <div className="mt-20 px-6 space-y-8">
        
        {/* Verification Strip */}
        <div className="flex justify-between bg-white p-5 rounded-[32px] shadow-sm border border-slate-100">
           {[ 
             { i: '👤', l: '实名认证', s: myProfile.isRealName, c: 'bg-blue-50 text-blue-500' },
             { i: '🤳', l: '真人认证', s: myProfile.isVerified, c: 'bg-emerald-50 text-emerald-500' },
             { i: '📱', l: '手机认证', s: myProfile.isPhoneBound, c: 'bg-amber-50 text-amber-500' },
             { i: '💎', l: '会员认证', s: isVip, c: 'bg-purple-50 text-purple-500' }
           ].map((v, idx) => (
             <div key={idx} className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner ${v.s ? v.c : 'bg-slate-50 text-slate-300'}`}>{v.i}</div>
                <span className="text-[8px] font-black text-slate-400 uppercase">{v.l}</span>
             </div>
           ))}
        </div>

        {/* --- MEMBERSHIP CENTER --- */}
        <section className="animate-reveal">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-sm font-[900] text-slate-400 tracking-tight italic">尊享会员中心</h3>
            <button onClick={onOpenMembership} className="text-[#10b981] text-xs font-black flex items-center gap-1">详细特权 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M9 5l7 7-7 7"/></svg></button>
          </div>
          <div onClick={onOpenMembership} className="relative w-full h-24 rounded-[36px] overflow-hidden group cursor-pointer active:scale-[0.98] transition-all shadow-xl shadow-emerald-500/5">
             <div className="absolute inset-0 bg-slate-900"><div className="absolute inset-0 bg-gradient-to-r from-[#10b981]/20 to-transparent"></div></div>
             <div className="absolute inset-0 p-6 flex items-center justify-between">
                <div>
                   <h4 className="text-base font-black text-white italic tracking-tighter">解锁全部心动特权</h4>
                   <p className="text-[8px] text-white/50 font-black uppercase mt-0.5">Premium Experience</p>
                </div>
                <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-2xl">
                   <svg className="w-4 h-4 text-slate-900" fill="currentColor" viewBox="0 0 24 24"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.5 3c1.557 0 3.046.727 4 2.015Q12.454 3.615 14 3.015c2.786 0 5.25 2.322 5.25 5.235 0 3.924-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001z" /></svg>
                </div>
             </div>
          </div>
        </section>

        {/* --- MY WALLET --- */}
        <section className="animate-reveal" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-sm font-[900] text-slate-400 tracking-tight italic">我的资产钱包</h3>
          </div>
          <div onClick={onOpenWallet} className="w-full h-24 bg-white rounded-[36px] border border-slate-100 flex items-center justify-between px-7 shadow-sm active:scale-[0.98] transition-all group">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl">💰</div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">秒币余额</p>
                   <p className="text-xl font-black text-slate-900 tracking-tighter">{balance} MIA</p>
                </div>
             </div>
             <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-emerald-500 uppercase bg-emerald-50 px-3 py-1.5 rounded-full">去充值</span>
                <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M9 5l7 7-7 7"/></svg>
             </div>
          </div>
        </section>

        {/* Personality Info */}
        <section>
          <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm space-y-4">
             <div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">个人简介</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed italic">“{myProfile.bio}”</p>
             </div>
             <div className="grid grid-cols-2 gap-2 pt-2">
                {[
                  { l: '年龄', v: `${myProfile.age}岁` },
                  { l: '所在城市', v: myProfile.city },
                  { l: '职业', v: myProfile.profession },
                  { l: '身高', v: myProfile.height },
                ].map(item => (
                  <div key={item.l} className="bg-slate-50 p-3 rounded-2xl">
                     <p className="text-[8px] font-black text-slate-400 uppercase mb-0.5">{item.l}</p>
                     <p className="text-xs font-bold text-slate-800">{item.v}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Gift Wall Preview */}
        <section className="pb-16">
          <div className="px-2 mb-4">
             <h3 className="text-sm font-[900] text-slate-400 tracking-tight italic">已赠礼物展示 ({uniqueGifts.length})</h3>
          </div>
          <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm overflow-hidden flex gap-4 overflow-x-auto no-scrollbar">
             {uniqueGifts.length > 0 ? (
               uniqueGifts.map(gid => {
                 const gift = MOCK_GIFTS.find(g => g.id === gid);
                 return (
                   <div key={gid} className="flex-shrink-0 flex flex-col items-center">
                     <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl">{gift?.icon}</div>
                     <span className="text-[8px] font-black text-slate-400 uppercase mt-2">{gift?.name}</span>
                   </div>
                 );
               })
             ) : (
               <p className="text-center w-full text-[10px] font-black text-slate-300 uppercase py-4 tracking-widest">还没有送出过礼物</p>
             )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
