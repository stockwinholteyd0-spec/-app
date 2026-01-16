
import React, { useState, useEffect } from 'react';
import { LightningIcon } from '../constants';

interface LoginProps {
  onLogin: () => void;
}

type LoginView = 'MAIN' | 'PHONE_INPUT';

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [currentView, setCurrentView] = useState<LoginView>('MAIN');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  
  // Agreement State
  const [isAgreed, setIsAgreed] = useState(false);
  const [shakeAgreement, setShakeAgreement] = useState(false);

  // Phone Login State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const checkAgreement = (action: () => void) => {
    if (!isAgreed) {
      setShakeAgreement(true);
      showToast('请先阅读并勾选用户协议');
      setTimeout(() => setShakeAgreement(false), 500);
      return;
    }
    action();
  };

  // Simulate WeChat Login
  const handleWeChatLogin = () => {
    setIsLoading(true);
    showToast('正在跳转微信...');
    
    // Attempt to open WeChat
    setTimeout(() => {
       window.location.href = "weixin://";
    }, 500);

    // Simulate successful callback/login after "returning" from WeChat
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 3000);
  };

  const handleSendCode = () => {
    if (!phoneNumber || phoneNumber.length < 11) {
      showToast('请输入正确的手机号');
      return;
    }
    setCountdown(60);
    showToast('验证码已发送: 8829');
    // Simulate receiving code
    setTimeout(() => setVerifyCode('8829'), 1000);
  };

  const handlePhoneLogin = () => {
    if (!phoneNumber || !verifyCode) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  // Render Phone Login View
  if (currentView === 'PHONE_INPUT') {
    return (
      <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300 relative">
        {toast && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="bg-slate-900/90 backdrop-blur-md text-white px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl">
              {toast}
            </div>
          </div>
        )}

        <header className="pt-14 px-6 pb-4 flex items-center">
          <button onClick={() => setCurrentView('MAIN')} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 active:bg-slate-100 transition-colors mr-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
          </button>
        </header>

        <div className="px-10 pt-4">
          <h1 className="text-2xl font-[900] text-slate-900 mb-2">手机号登录</h1>
          <p className="text-xs text-slate-400 font-medium mb-10">未注册手机号验证通过后将自动注册</p>

          <div className="space-y-6">
             <div className="space-y-1">
               <div className="flex items-center border-b border-slate-100 py-4">
                 <span className="text-sm font-black text-slate-900 mr-4">+86</span>
                 <input 
                    type="tel" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="请输入手机号码"
                    className="flex-1 bg-transparent text-lg font-bold text-slate-900 outline-none placeholder:text-slate-300 font-mono"
                    maxLength={11}
                 />
                 {phoneNumber && (
                   <button onClick={() => setPhoneNumber('')} className="text-slate-300 p-1">
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
                   </button>
                 )}
               </div>
             </div>

             <div className="space-y-1">
               <div className="flex items-center border-b border-slate-100 py-4">
                 <input 
                    type="number" 
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    placeholder="输入验证码"
                    className="flex-1 bg-transparent text-lg font-bold text-slate-900 outline-none placeholder:text-slate-300 font-mono"
                    maxLength={6}
                 />
                 <button 
                   onClick={handleSendCode}
                   disabled={countdown > 0 || !phoneNumber}
                   className={`text-xs font-black px-4 py-2 rounded-xl transition-all ${
                     countdown > 0 
                       ? 'text-slate-300 bg-slate-50' 
                       : phoneNumber 
                         ? 'text-emerald-500 bg-emerald-50 active:scale-95' 
                         : 'text-slate-300'
                   }`}
                 >
                   {countdown > 0 ? `${countdown}s 后重发` : '获取验证码'}
                 </button>
               </div>
             </div>
          </div>

          <button 
            disabled={isLoading || !phoneNumber || !verifyCode}
            onClick={handlePhoneLogin}
            className="w-full mt-12 bg-slate-900 text-white font-black py-4 rounded-2xl shadow-lg shadow-slate-900/10 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100"
          >
             {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : '登录 / 注册'}
          </button>
        </div>
      </div>
    );
  }

  // Render Main Login View
  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-500 relative">
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-slate-900/90 backdrop-blur-md text-white px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl">
            {toast}
          </div>
        </div>
      )}

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
            onClick={() => checkAgreement(handleWeChatLogin)}
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
            onClick={() => checkAgreement(() => setCurrentView('PHONE_INPUT'))}
            className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl shadow-lg shadow-slate-900/10 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
             <span>手机号登录</span>
          </button>
        </div>
      </div>

      <div className="px-10 pb-12">
        <div 
          className={`flex items-start justify-center gap-2 cursor-pointer transition-transform ${shakeAgreement ? 'translate-x-1' : ''}`}
          onClick={() => setIsAgreed(!isAgreed)}
        >
          <div className={`w-4 h-4 rounded-full border mt-0.5 flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${isAgreed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 bg-white'}`}>
             <svg className={`w-2.5 h-2.5 text-white transition-transform duration-200 ${isAgreed ? 'scale-100' : 'scale-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
          </div>
          <p className="text-[10px] text-slate-400 font-medium leading-relaxed pt-0.5">
            登录即代表同意 <span className="text-emerald-500 font-bold" onClick={(e) => { e.stopPropagation(); /* Link */ }}>《用户协议》</span> 和 <span className="text-emerald-500 font-bold" onClick={(e) => { e.stopPropagation(); /* Link */ }}>《隐私政策》</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
