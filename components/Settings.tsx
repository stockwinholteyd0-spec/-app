
import React from 'react';

interface SettingsProps {
  onBack: () => void;
  onOpenSecurity: () => void;
  onOpenTeenMode: () => void;
  onOpenAboutUs: () => void;
  onLogout: () => void;
  notifSettings: {
    newMsg: boolean;
    sound: boolean;
    vibration: boolean;
  };
  setNotifSettings: (settings: { newMsg: boolean; sound: boolean; vibration: boolean; }) => void;
}

const Settings: React.FC<SettingsProps> = ({ 
  onBack, onOpenSecurity, onOpenTeenMode, onOpenAboutUs, onLogout, notifSettings, setNotifSettings 
}) => {
  
  const toggleNotif = (key: keyof typeof notifSettings) => {
    const next = { ...notifSettings, [key]: !notifSettings[key] };
    setNotifSettings(next);
  };

  const sections = [
    {
      title: '账户',
      items: [
        { label: '账户与安全', icon: '🛡️', onClick: onOpenSecurity, detail: '修改手机、密码、实名' },
      ]
    },
    {
      title: '消息通知',
      items: [
        { label: '新消息通知', type: 'toggle', active: notifSettings.newMsg, onToggle: () => toggleNotif('newMsg') },
        { label: '声音', type: 'toggle', active: notifSettings.sound, onToggle: () => toggleNotif('sound') },
        { label: '震动', type: 'toggle', active: notifSettings.vibration, onToggle: () => toggleNotif('vibration') },
      ]
    },
    {
      title: '模式与关于',
      items: [
        { label: '青少年模式', icon: '👦', onClick: onOpenTeenMode, detail: '未开启' },
        { label: '关于我们', icon: 'ℹ️', onClick: onOpenAboutUs, detail: 'v3.1.2' },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] animate-in slide-in-from-right duration-300">
      <header className="pt-14 px-6 pb-4 glass-nav sticky top-0 z-30 flex items-center border-b border-slate-100/50">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 active:bg-slate-100 transition-colors mr-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-lg font-black text-slate-900 tracking-tight">设置中心</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar space-y-8">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-3">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 italic">{section.title}</h3>
             <div className="bg-white rounded-[32px] shadow-sm border border-slate-100/50 overflow-hidden">
                {section.items.map((item, iIdx) => (
                  <div 
                    key={iIdx} 
                    onClick={item.onClick}
                    className={`flex items-center justify-between p-5 ${iIdx !== section.items.length - 1 ? 'border-b border-slate-50' : ''} active:bg-slate-50 transition-colors cursor-pointer`}
                  >
                    <div className="flex items-center gap-4">
                      {item.icon && <span className="text-xl">{item.icon}</span>}
                      <span className="text-sm font-bold text-slate-800">{item.label}</span>
                    </div>
                    
                    {item.type === 'toggle' ? (
                       <button 
                        onClick={(e) => { e.stopPropagation(); item.onToggle?.(); }}
                        className={`w-12 h-6 rounded-full transition-all relative ${item.active ? 'bg-emerald-500' : 'bg-slate-200'}`}
                       >
                         <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all ${item.active ? 'left-7' : 'left-1'}`}></div>
                       </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        {item.detail && <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">{item.detail}</span>}
                        <svg className="w-4 h-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M9 5l7 7-7 7"/></svg>
                      </div>
                    )}
                  </div>
                ))}
             </div>
          </div>
        ))}

        <div className="pt-4 pb-12">
           <button 
            onClick={onLogout}
            className="w-full bg-white text-red-500 font-black py-5 rounded-[32px] border border-red-50 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
           >
             退出当前账号
           </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
