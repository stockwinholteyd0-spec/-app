
import React from 'react';
import { LightningIcon } from '../constants';

const Splash: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#fcfdfe] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[200%] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]"></div>
      
      <div className="relative mb-12 group">
        <div className="absolute -inset-12 bg-emerald-500/10 rounded-full blur-[60px] animate-pulse"></div>
        <div className="relative w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-[44px] flex items-center justify-center shadow-[0_30px_60px_-15px_rgba(16,185,129,0.5)] transform hover:scale-110 hover:rotate-6 transition-all duration-700">
          <div className="absolute inset-2 border-2 border-white/20 rounded-[36px]"></div>
          <LightningIcon className="w-16 h-16 text-yellow-300 filter drop-shadow-[0_0_15px_rgba(250,204,21,0.6)] animate-bounce [animation-duration:2s]" />
        </div>
      </div>
      
      <div className="text-center relative z-10">
        <h1 className="text-5xl font-[900] tracking-tighter mb-3 text-slate-900 italic">
          MIAHUI <span className="text-emerald-500 not-italic">秒回</span>
        </h1>
        <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-6 bg-slate-200"></div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] opacity-80">
              Instant Connection
            </p>
            <div className="h-[1px] w-6 bg-slate-200"></div>
        </div>
      </div>

      <div className="absolute bottom-20 w-full px-16 space-y-6">
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
          <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 w-0 animate-[loading_2.2s_cubic-bezier(0.65,0,0.35,1)_forwards]"></div>
        </div>
        <div className="flex flex-col items-center gap-1">
            <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]">
              Searching for moments...
            </p>
            <p className="text-[8px] text-emerald-500 font-black italic">MIAHUI SEC-REPLY AI ENGINE v3.0</p>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Splash;
