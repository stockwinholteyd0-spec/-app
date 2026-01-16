
import React, { useState } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../constants';

interface BlacklistProps {
  onBack: () => void;
  blockedUserIds: string[];
  onUnblock: (id: string) => void;
}

const Blacklist: React.FC<BlacklistProps> = ({ onBack, blockedUserIds, onUnblock }) => {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const handleUnblock = (id: string, name: string) => {
    onUnblock(id);
    showToast(`已解除对 ${name} 的限制`);
  };

  const blockedUsers = blockedUserIds.map(id => {
      const user = MOCK_USERS.find(u => u.id === id);
      return user || { id, name: '未知用户', avatar: 'https://via.placeholder.com/150' } as Partial<User>;
  });

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] animate-in slide-in-from-right duration-300 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-slate-900/90 backdrop-blur-md text-white px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl">
            {toast}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="pt-14 px-6 pb-4 glass-nav sticky top-0 z-30 flex items-center border-b border-slate-100/50">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 active:bg-slate-100 transition-colors mr-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-lg font-black text-slate-900">黑名单管理</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pt-6 no-scrollbar">
        {blockedUsers.length > 0 ? (
          <div className="space-y-4">
            <div className="px-2 mb-2">
              <h3 className="text-xs font-black text-slate-400/80 uppercase tracking-[0.1em]">已拦截名单 ({blockedUsers.length})</h3>
            </div>
            <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/50 overflow-hidden">
              {blockedUsers.map((user, idx) => (
                <div 
                  key={user.id} 
                  className={`flex items-center justify-between p-5 ${idx !== blockedUsers.length - 1 ? 'border-b border-slate-50' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <img src={user.avatar} className="w-12 h-12 rounded-2xl object-cover border border-slate-100" />
                    <span className="text-sm font-bold text-slate-800">{user.name}</span>
                  </div>
                  <button 
                    onClick={() => handleUnblock(user.id!, user.name!)}
                    className="px-4 py-2 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-50 hover:text-emerald-500 transition-all border border-slate-100"
                  >
                    移除
                  </button>
                </div>
              ))}
            </div>
            <p className="px-4 text-[10px] text-slate-400 font-medium leading-relaxed">
              将用户加入黑名单后，对方将无法发起视频通话或发送消息给您。
            </p>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center pb-20 opacity-40">
            <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-4">
               <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" /></svg>
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">暂无被拦截的用户</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blacklist;
