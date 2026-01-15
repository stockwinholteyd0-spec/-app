
import React, { useState } from 'react';
import { User, MembershipTier } from '../types';
import { LightningIcon, MOCK_USERS, VipBadge } from '../constants';

interface HomeProps {
  onStartMatch: () => void;
  onSelectUser: (user: User) => void;
  onSearch: (query: string) => void;
  isVip: boolean;
  vipTier: MembershipTier;
  freeCredits: number;
}

const Home: React.FC<HomeProps> = ({ onStartMatch, onSelectUser, onSearch, isVip, vipTier, freeCredits }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Announcement Modal */}
      {showAnnouncement && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/40 backdrop-blur-md" onClick={() => setShowAnnouncement(false)}>
           <div className="bg-white rounded-[40px] p-8 w-full max-w-xs animate-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6"><span className="text-3xl">🔔</span></div>
              <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tighter italic text-center">系统公告</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">秒回V3.1.2版本已发布，新增高清视频画质与秒币充值特惠，快去个人中心查看吧！</p>
              <button onClick={() => setShowAnnouncement(false)} className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl active:scale-95 transition-all">确认</button>
           </div>
        </div>
      )}

      {/* Search Overlay */}
      {showSearch && (
        <div className="absolute top-14 left-0 right-0 z-[100] px-8 py-4 bg-white/95 backdrop-blur-xl border-b border-slate-100 animate-in slide-in-from-top duration-300">
           <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input 
                autoFocus
                type="text" 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="搜索用户昵称或ID..."
                className="flex-1 bg-slate-50 rounded-xl px-4 py-2.5 text-xs font-bold outline-none border border-slate-100 focus:border-emerald-400 transition-all"
              />
              <button type="submit" className="bg-emerald-500 text-white px-4 rounded-xl text-[10px] font-black uppercase tracking-widest">搜索</button>
              <button type="button" onClick={() => setShowSearch(false)} className="text-slate-300"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2.5" /></svg></button>
           </form>
        </div>
      )}

      <header className="pt-14 px-8 pb-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-slate-900 leading-none">MIAHUI</h1>
            <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-[0.2em] mt-1">秒回 · 即刻心动</p>
          </div>
          {isVip && <VipBadge tier={vipTier} className="mt-[-10px]" />}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowSearch(true)} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-800 active:scale-90 transition-transform">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <div className="relative">
            <button onClick={() => setShowAnnouncement(true)} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-800 active:scale-90 transition-transform">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-50 rounded-full blur-[80px] opacity-60"></div>
        <div className="relative mb-10">
          <button onClick={onStartMatch} className="relative z-10 w-48 h-48 bg-emerald-500 rounded-[64px] flex flex-col items-center justify-center group active:scale-95 transition-all duration-300 btn-glow overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600"></div>
            <div className="relative z-20 flex flex-col items-center">
              <div className="bg-white/20 p-4 rounded-[28px] mb-3 backdrop-blur-sm shadow-xl group-hover:scale-110 transition-transform duration-500"><LightningIcon className="w-12 h-12 text-yellow-300" /></div>
              <span className="text-lg font-black text-white tracking-[0.1em]">开启匹配</span>
              <span className="text-[9px] font-bold text-white/80 uppercase mt-1 tracking-widest">Connect Now</span>
            </div>
          </button>
        </div>
        <div className="text-center">
          {!isVip ? (
            <div className="inline-flex flex-col items-center gap-1">
               <h2 className="text-slate-800 font-bold text-base">剩余免费匹配次数：<span className="text-emerald-500">{freeCredits}</span></h2>
            </div>
          ) : (
            <div className="inline-flex flex-col items-center gap-1">
               <h2 className="text-slate-800 font-bold text-base">遇见你的“秒回”伙伴</h2>
            </div>
          )}
        </div>
      </div>

      <section className="pb-32">
        <div className="px-8 flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">心动推荐</h3>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-8 snap-x">
          {MOCK_USERS.map(user => (
            <div key={user.id} onClick={() => onSelectUser(user)} className="flex-shrink-0 w-36 snap-start active:scale-95 transition-all duration-300 group">
              <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-md border border-slate-50 bg-slate-100">
                <img src={user.avatar} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4"><p className="text-white font-black text-sm leading-none mb-0.5">{user.name}</p></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
