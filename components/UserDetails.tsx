
import React from 'react';
import { User } from '../types';
import { LightningIcon } from '../constants';

interface UserDetailsProps {
  user: User;
  onBack: () => void;
  onStartCall: () => void;
  onOpenChat: (user: User) => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, onBack, onStartCall, onOpenChat }) => {
  const quickGreetings = ["Hi~ 👋", "交个朋友？", "视频聊聊？", "刚才在看你 ✨"];

  return (
    <div className="flex flex-col h-full bg-white relative animate-in fade-in slide-in-from-right duration-500">
      {/* Visual Hero - Height Reduced to 45% */}
      <div className="relative h-[45%] w-full overflow-hidden">
        <img src={user.avatar} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20"></div>
        
        {/* Navigation */}
        <div className="absolute top-14 left-8 right-8 flex justify-between z-30">
          <button onClick={onBack} className="w-10 h-10 glass-nav rounded-2xl flex items-center justify-center text-slate-900 shadow-xl active:scale-90 transition-transform">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button className="w-10 h-10 glass-nav rounded-2xl flex items-center justify-center text-slate-900 shadow-xl active:scale-90 transition-transform">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
          </button>
        </div>

        {/* Hero Info - More Compact */}
        <div className="absolute bottom-10 left-8 right-8 z-20">
           <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter">{user.name}, <span className="font-light text-slate-400">{user.age}</span></h1>
              <div className="px-2 py-0.5 bg-emerald-500 text-white rounded-lg flex items-center gap-1.5 shadow-md">
                 <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                 <span className="text-[7px] font-black uppercase tracking-widest">LIVE</span>
              </div>
           </div>
           <div className="flex gap-2">
              <div className="px-3 py-1 bg-white/60 backdrop-blur-md rounded-full flex items-center gap-1.5 text-slate-800 border border-white/50">
                 <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                 <span className="text-[9px] font-bold tracking-wider uppercase">{user.city}</span>
              </div>
           </div>
        </div>
      </div>

      {/* Profile Details Area */}
      <div className="flex-1 bg-white rounded-t-[48px] -mt-8 relative z-10 px-8 pt-10 pb-44 overflow-y-auto no-scrollbar shadow-[0_-15px_40px_rgba(0,0,0,0.05)] border-t border-slate-50">
        
        {/* Core Stats */}
        <div className="grid grid-cols-3 gap-1 mb-8 bg-slate-50 p-2 rounded-[28px] border border-slate-100">
           <div className="text-center py-3 bg-white rounded-[24px] shadow-sm">
              <p className="text-emerald-500 font-black text-lg leading-none mb-0.5">{user.responseRate}</p>
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">秒回率</p>
           </div>
           <div className="text-center py-3 flex flex-col justify-center">
              <p className="text-slate-800 font-black text-lg leading-none mb-0.5">9.8</p>
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">心动值</p>
           </div>
           <div className="text-center py-3 flex flex-col justify-center">
              <p className="text-slate-800 font-black text-lg leading-none mb-0.5">1m</p>
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">响应</p>
           </div>
        </div>

        {/* Detailed Info Grid */}
        <section className="mb-8">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest italic mb-4 ml-1">详细资料</h3>
          <div className="grid grid-cols-2 gap-3">
             {[
               { l: '性别', i: '⚧️', v: user.gender || '女' },
               { l: '学历', i: '🎓', v: user.education || '本科' },
               { l: '身高', i: '📏', v: user.height || '168cm' },
               { l: '体重', i: '⚖️', v: user.weight || '48kg' },
               { l: '年收入', i: '💰', v: user.income || '保密' },
               { l: '职业', i: '💼', v: user.profession || '自由职业' },
             ].map((item, idx) => (
               <div key={idx} className="bg-slate-50 rounded-2xl p-3 flex items-center gap-3 border border-slate-100/50">
                  <span className="text-base">{item.i}</span>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[7px] font-black text-slate-400 uppercase leading-none mb-1">{item.l}</p>
                    <p className="text-[11px] font-bold text-slate-800 truncate">{item.v}</p>
                  </div>
               </div>
             ))}
          </div>
        </section>

        {/* Personality Signature */}
        <section className="mb-8">
           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest italic mb-4 ml-1">个性宣言</h3>
           <div className="bg-emerald-50/50 p-6 rounded-[32px] border border-emerald-100/50 relative overflow-hidden group">
             <span className="absolute -top-4 -left-2 text-6xl text-emerald-100 font-serif opacity-50 group-hover:scale-110 transition-transform">“</span>
             <p className="relative z-10 text-xs text-slate-600 font-medium leading-relaxed italic">
               {user.bio || "不喜欢客套，只喜欢在这里和你‘秒回’视频。"}
             </p>
             <span className="absolute -bottom-10 -right-2 text-6xl text-emerald-100 font-serif opacity-50 rotate-180">“</span>
           </div>
        </section>

        <section className="mb-8">
           <h3 className="text-xs font-black text-slate-400 mb-4 uppercase tracking-wider italic ml-1">我的标签</h3>
           <div className="flex flex-wrap gap-2">
              {user.tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-bold border border-slate-100">#{tag}</span>
              ))}
           </div>
        </section>

        <section className="pb-10">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider italic ml-1">个人相册</h3>
             <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">12 Photos</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
             {[1,2,3].map(i => (
               <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm">
                 <img src={`${user.avatar}?sig=${i+20}`} className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
        </section>
      </div>

      {/* Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-2xl border-t border-slate-100/50 z-40">
        {/* Quick Greetings Chips */}
        <div className="px-8 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b border-slate-50">
           {quickGreetings.map(text => (
             <button 
              key={text}
              onClick={() => onOpenChat(user)}
              className="flex-shrink-0 px-4 py-1.5 bg-slate-50 rounded-full text-[10px] font-black text-slate-600 uppercase tracking-wider border border-slate-100 hover:bg-emerald-50 hover:text-emerald-500 hover:border-emerald-100 transition-all active:scale-95"
             >
               {text}
             </button>
           ))}
        </div>

        {/* Main Controls */}
        <div className="px-8 pt-3 pb-10 flex gap-3">
          <button 
            onClick={() => onOpenChat(user)}
            className="w-14 h-14 bg-slate-50 text-slate-900 rounded-[20px] flex items-center justify-center active:scale-90 transition-transform border border-slate-100 shadow-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          </button>
          <button 
            onClick={onStartCall}
            className="flex-1 bg-emerald-500 text-white rounded-[20px] font-black text-base shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-emerald-600"
          >
            <LightningIcon className="w-4 h-4 text-yellow-300" />
            视频秒回
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
