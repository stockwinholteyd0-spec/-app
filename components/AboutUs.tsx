
import React from 'react';

interface AboutUsProps {
  onBack: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-[#f8fafc] animate-in slide-in-from-right duration-300">
      <header className="pt-14 px-6 pb-4 glass-nav flex items-center border-b border-slate-100/50">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 active:bg-slate-100 transition-colors mr-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-lg font-black text-slate-900">关于我们</h1>
      </header>

      <div className="flex-1 flex flex-col items-center pt-16 px-10">
        <div className="w-24 h-24 bg-emerald-500 rounded-[36px] flex items-center justify-center shadow-2xl shadow-emerald-500/20 mb-6">
           <svg className="w-12 h-12 text-yellow-300" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14H11V21L20 10H13Z" /></svg>
        </div>
        <h2 className="text-2xl font-[900] tracking-tighter text-slate-900 italic mb-1">MIAHUI 秒回</h2>
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-16">Version 3.1.2 (Build 8829)</p>

        <div className="w-full bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
           {[
             { label: '检查新版本', detail: '已是最新版本' },
             { label: '用户协议' },
             { label: '隐私政策' },
             { label: '证照信息' },
           ].map((item, idx) => (
             <div key={idx} className={`flex items-center justify-between p-5 ${idx !== 3 ? 'border-b border-slate-50' : ''} active:bg-slate-50 transition-colors cursor-pointer group`}>
                <span className="text-sm font-bold text-slate-800">{item.label}</span>
                <div className="flex items-center gap-2">
                  {item.detail && <span className="text-[10px] font-bold text-slate-300 uppercase">{item.detail}</span>}
                  <svg className="w-4 h-4 text-slate-200 group-active:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M9 5l7 7-7 7" /></svg>
                </div>
             </div>
           ))}
        </div>

        <div className="mt-auto pb-12 text-center">
           <p className="text-[9px] text-slate-300 font-black uppercase tracking-widest leading-loose">
             © 2023-2025 MIAHUI SOCIAL TECH<br/>
             让心动更有速度
           </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
