
import React, { useState } from 'react';
import { MembershipTier } from '../types';

interface SettingsProps {
  onBack: () => void;
  onOpenSecurity: () => void;
  onOpenBlacklist: () => void;
  onOpenCustomerService: () => void;
  onOpenMembership: () => void;
  onLogout: () => void;
  isVip: boolean;
  isRealName: boolean;
}

const Settings: React.FC<SettingsProps> = ({ 
  onBack, onOpenSecurity, onOpenBlacklist, onOpenCustomerService, onOpenMembership, onLogout, isVip, isRealName 
}) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('userSettings');
    return saved ? JSON.parse(saved) : {
      stealth: false,
      notifications: true,
      autoFastReply: false
    };
  });
  
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const toggleSetting = (key: keyof typeof settings) => {
    if (key === 'autoFastReply' && !isVip) {
      showToast('开通会员即可开启秒回');
      onOpenMembership();
      return;
    }
    const newValue = !settings[key];
    const newSettings = { ...settings, [key]: newValue };
    setSettings(newSettings);
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
    showToast(`设置已更新`);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] animate-in slide-in-from-right duration-300 relative">
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-slate-900/90 backdrop-blur-md text-white px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl">
            {toast}
          </div>
        </div>
      )}

      <header className="pt-14 px-6 pb-4 glass-nav sticky top-0 z-30 flex items-center border-b border-slate-100/50">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 active:bg-slate-100 transition-colors mr-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-lg font-black text-slate-900">设置中心</h1>
      </header>

      <div className="mt-6 px-6 space-y-8 overflow-y-auto pb-20 no-scrollbar">
        {/* General Settings */}
        <section>
          <div className="px-2 mb-4">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest italic">通用设置</h3>
          </div>
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
            {[ 
              { k: 'stealth', l: '隐身模式', i: '🕶️' }, 
              { k: 'notifications', l: '消息通知', i: '🔔' }, 
              { k: 'autoFastReply', l: '自动开启秒回', i: '⚡', gated: true } 
            ].map(item => (
              <div key={item.k} className="flex items-center justify-between p-5 border-b border-slate-50 last:border-none">
                 <div className="flex items-center gap-4">
                   <span className="text-xl">{item.i}</span>
                   <span className="text-sm font-bold text-slate-800">{item.l}</span>
                 </div>
                 <button onClick={() => toggleSetting(item.k as any)} className={`w-12 h-6 rounded-full transition-all relative ${settings[item.k as keyof typeof settings] ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                   <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all ${settings[item.k as keyof typeof settings] ? 'left-7' : 'left-1'}`}></div>
                 </button>
              </div>
            ))}
          </div>
        </section>

        {/* Account & Support */}
        <section>
          <div className="px-2 mb-4">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest italic">账户与支持</h3>
          </div>
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
            <div onClick={onOpenSecurity} className="flex items-center justify-between p-5 border-b border-slate-50 active:bg-slate-50 transition-colors cursor-pointer group">
               <div className="flex items-center gap-4">
                 <span className="text-xl">🛡️</span>
                 <span className="text-sm font-bold text-slate-800">账户安全</span>
               </div>
               <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-md">
                    {isRealName ? '已认证' : '未认证'}
                  </span>
                  <svg className="w-4 h-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M9 5l7 7-7 7" /></svg>
               </div>
            </div>

            <div onClick={onOpenBlacklist} className="flex items-center justify-between p-5 border-b border-slate-50 active:bg-slate-50 transition-colors cursor-pointer group">
               <div className="flex items-center gap-4">
                 <span className="text-xl">🚫</span>
                 <span className="text-sm font-bold text-slate-800">黑名单管理</span>
               </div>
               <svg className="w-4 h-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M9 5l7 7-7 7" /></svg>
            </div>

            <div onClick={onOpenCustomerService} className="flex items-center justify-between p-5 border-b border-slate-50 active:bg-slate-50 transition-colors cursor-pointer group">
               <div className="flex items-center gap-4">
                 <span className="text-xl">👩‍💼</span>
                 <span className="text-sm font-bold text-slate-800">在线客服</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">官方支持</span>
                  <svg className="w-4 h-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M9 5l7 7-7 7" /></svg>
               </div>
            </div>

            <div onClick={onLogout} className="flex items-center justify-between p-5 active:bg-red-50 transition-colors cursor-pointer group">
               <div className="flex items-center gap-4">
                 <span className="text-xl">🚪</span>
                 <span className="text-sm font-bold text-red-500">退出登录</span>
               </div>
               <svg className="w-4 h-4 text-slate-200 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M9 5l7 7-7 7" /></svg>
            </div>
          </div>
        </section>

        <p className="px-6 text-[10px] text-slate-400 font-medium text-center leading-relaxed opacity-60">
          MIAHUI SEC-REPLY Version 3.0.2<br/>
          Copyright © 2024 秒回科技. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Settings;
