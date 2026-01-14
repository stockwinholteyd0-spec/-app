
import React, { useState } from 'react';
import { LightningIcon } from '../constants';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulatedLogin = (method: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-500">
      <div className="flex-1 flex flex-col items-center justify-center px-10">
        <div className="relative mb-12">
          <div className="absolute -inset-10 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="w-24 h-24 bg-emerald-500 rounded-[36px] flex items-center justify-center shadow-2xl shadow-emerald-500/30 transform -rotate-3 transition-transform">
            <LightningIcon className="w-12 h-12 text-yellow-300 filter drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
          </div>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-3xl font-[900] tracking-tighter text-slate-900 mb-2 italic">MIAHUI 秒回</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] opacity-80 leading-relaxed">
            让每一次心动得到即时回应
          </p>
        </div>

        <div className="w-full space-y-4">
          <button 
            disabled={isLoading}
            onClick={() => handleSimulatedLogin('WeChat')}
            className="w-full bg-[#07C160] text-white font-black py-4 rounded-2xl shadow-lg shadow-green-500/10 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.522 13.92c-.378 0-.682-.33-.682-.736 0-.405.304-.736.682-.736.377 0 .681.33.681.736 0 .406-.304.736-.681.736zm6.956 0c-.378 0-.682-.33-.682-.736 0-.405.304-.736.682-.736.378 0 .682.33.682.736 0 .406-.304.736-.682.736zM12 2C6.477 2 2 5.768 2 10.42c0 2.658 1.45 5.018 3.73 6.64-.176.627-.813 2.144-.848 2.222-.053.116-.01.25.101.32.045.029.096.044.148.044.056 0 .111-.016.159-.048.06-.04 1.834-1.222 2.585-1.638.675.19 1.385.292 2.125.292 5.523 0 10-3.768 10-8.42C22 5.768 17.523 2 12 2z" /></svg>
                <span>微信一键登录</span>
              </>
            )}
          </button>

          <button 
            disabled={isLoading}
            onClick={() => handleSimulatedLogin('Phone')}
            className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl shadow-lg shadow-slate-900/10 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
             <span>手机号登录</span>
          </button>

          <div className="flex items-center gap-4 py-4">
             <div className="flex-1 h-px bg-slate-100"></div>
             <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">其他方式</span>
             <div className="flex-1 h-px bg-slate-100"></div>
          </div>

          <div className="flex justify-center gap-6">
            <button onClick={() => handleSimulatedLogin('Guest')} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 active:scale-90 transition-transform border border-slate-100">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </button>
            <button onClick={() => handleSimulatedLogin('Apple')} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 active:scale-90 transition-transform border border-slate-100">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05 1.72-3.2 1.72-1.15 0-1.48-.72-2.85-.72-1.37 0-1.78.72-2.85.72-1.07 0-2.14-.77-3.21-1.72-2.31-2.14-3.56-6.11-3.56-8.91 0-2.84 1.48-4.46 3.12-4.46.91 0 1.63.48 2.25.48.62 0 1.15-.48 2.25-.48 1.63 0 3.12 1.62 3.12 4.46 0 1.21-.24 2.53-.72 3.89-.48 1.36-1.14 2.55-2.12 3.56l.37.48zM12.03 5.48c-.06-1.55.93-2.92 2.38-3.48-1.45-.56-3.05.02-3.87 1.44-.82 1.42-.51 3.2.78 4.25-.13.06-.26.09-.39.09-1.29 0-2.45-.92-2.8-2.3z" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="px-10 pb-12">
        <p className="text-center text-[10px] text-slate-400 font-medium leading-relaxed">
          登录即代表同意 <span className="text-emerald-500">《用户协议》</span> 和 <span className="text-emerald-500">《隐私政策》</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
