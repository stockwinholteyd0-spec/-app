
import React from 'react';
import { LightningIcon } from '../constants';

interface MatchingProps {
  onCancel: () => void;
}

const Matching: React.FC<MatchingProps> = ({ onCancel }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]"></div>

      <div className="absolute top-14 right-10 z-30">
        <button onClick={onCancel} className="w-12 h-12 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-[24px] flex items-center justify-center transition-all shadow-sm">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-16">
          {/* Radar Circles */}
          {[1, 2, 3, 4].map(i => (
            <div 
              key={i}
              className="absolute inset-0 border-2 border-emerald-500/10 rounded-full animate-[ripple_4s_infinite]"
              style={{ animationDelay: `${i * 0.8}s` }}
            ></div>
          ))}
          
          <div className="relative w-44 h-44 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-[64px] flex items-center justify-center shadow-2xl shadow-emerald-500/30 animate-[pulse_2s_infinite]">
            <div className="absolute inset-[-10px] border-2 border-emerald-100 rounded-[72px] animate-pulse"></div>
            <LightningIcon className="w-16 h-16 text-yellow-300 filter drop-shadow-[0_0_12px_rgba(250,204,21,0.5)]" />
          </div>
        </div>

        <div className="text-center px-14">
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">正在连接世界...</h2>
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-emerald-50 rounded-2xl border border-emerald-100 mb-8">
             <div className="flex gap-1">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
             </div>
             <span className="text-emerald-600 text-[10px] font-black tracking-widest uppercase">Matching Instant Reply</span>
          </div>
          <p className="text-slate-400 text-xs font-bold leading-relaxed max-w-[240px]">
            我们将为您匹配最近活跃且<br/>
            响应率高于 <span className="text-emerald-500">98%</span> 的心动对象
          </p>
        </div>
      </div>

      <style>{`
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Matching;
