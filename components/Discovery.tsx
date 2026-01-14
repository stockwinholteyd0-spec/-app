
import React, { useState } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../constants';

interface DiscoveryProps {
  onSelectUser: (user: User) => void;
}

const Discovery: React.FC<DiscoveryProps> = ({ onSelectUser }) => {
  const [activeTab, setActiveTab] = useState('推荐');
  const tabs = ['推荐', '附近', '活跃', '新人'];

  const users = Array.from({ length: 12 }).map((_, i) => ({
    ...MOCK_USERS[i % MOCK_USERS.length],
    id: `disc-${i}`,
    avatar: `https://picsum.photos/seed/disc${i}/300/400`
  }));

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] pb-24 overflow-hidden animate-in fade-in duration-500">
      <header className="pt-14 px-6 pb-2">
        <div className="flex items-center justify-between mb-4">
           <h1 className="text-xl font-[900] text-slate-900 tracking-tighter">探索心动</h1>
           <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100">
             <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
           </button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 -mx-2 px-2 mb-2">
          {MOCK_USERS.map((u) => (
            <div key={u.id} className="flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer" onClick={() => onSelectUser(u)}>
              <div className="relative w-10 h-10 rounded-full p-0.5 border-[1.5px] border-emerald-500">
                <img src={u.avatar} className="w-full h-full rounded-full object-cover" />
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
              <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter">{u.name}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          {tabs.map((tag) => (
            <button 
              key={tag} 
              onClick={() => setActiveTab(tag)}
              className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase transition-all ${
                activeTab === tag ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-100'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 no-scrollbar">
        <div className="grid grid-cols-3 gap-2.5 pb-10">
          {users.map((user, i) => (
            <div 
              key={user.id} 
              onClick={() => onSelectUser(user)}
              className="group relative aspect-[3/4] rounded-[18px] overflow-hidden bg-white shadow-sm border border-slate-100 animate-reveal"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <img src={user.avatar} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
              <div className="absolute top-1.5 right-1.5">
                 <div className="bg-emerald-500/90 backdrop-blur-sm px-1 rounded-sm">
                    <span className="text-[6px] font-black text-white tracking-tighter">FAST</span>
                 </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white font-black text-[9px] leading-none mb-0.5 truncate">{user.name}</p>
                <div className="flex items-center gap-1 opacity-60">
                  <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                  <p className="text-white text-[7px] font-bold uppercase tracking-tighter">{user.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discovery;
