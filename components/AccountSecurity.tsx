
import React, { useState } from 'react';

interface AccountSecurityProps {
  onBack: () => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

type SecurityView = 'LIST' | 'CHANGE_PASSWORD' | 'BIND_PHONE' | 'BIND_WECHAT' | 'REAL_NAME_AUTH' | 'ACCOUNT_DELETION';

const AccountSecurity: React.FC<AccountSecurityProps> = ({ onBack, onLogout, onDeleteAccount }) => {
  const [currentView, setCurrentView] = useState<SecurityView>('LIST');
  const [toast, setToast] = useState<string | null>(null);
  const [phone, setPhone] = useState('138****8888');
  const [wechatBound, setWechatBound] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const handleAction = (type: SecurityView) => {
    setCurrentView(type);
  };

  const submitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('密码修改成功');
      setCurrentView('LIST');
    }, 1500);
  };

  const submitPhone = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPhone('159****' + Math.floor(Math.random() * 9000 + 1000));
      showToast('手机号绑定成功');
      setCurrentView('LIST');
    }, 1500);
  };

  const submitWechatBinding = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setWechatBound(true);
      showToast('微信绑定成功');
      setCurrentView('LIST');
    }, 2000);
  };

  const submitRealNameAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsVerified(true);
      showToast('实名认证审核中，预计24小时内完成');
      setCurrentView('LIST');
    }, 2000);
  };

  const handleAccountDeletion = () => {
    setIsLoading(true);
    showToast('正在擦除所有个人数据...');
    setTimeout(() => {
      setIsLoading(false);
      alert('您的账号注销成功。所有注册信息、缓存内容及聊天记录已从设备中彻底删除。');
      onDeleteAccount();
    }, 3000);
  };

  if (currentView === 'CHANGE_PASSWORD') {
    return (
      <div className="flex flex-col h-full bg-[#f8fafc] animate-in slide-in-from-right duration-300">
        <header className="pt-14 px-6 pb-4 glass-nav flex items-center border-b border-slate-100/50">
          <button onClick={() => setCurrentView('LIST')} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 active:bg-slate-100 mr-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-lg font-black text-slate-900">修改登录密码</h1>
        </header>
        <form onSubmit={submitPassword} className="p-8 space-y-6">
          <div className="space-y-4">
            <input type="password" required placeholder="当前密码" className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/10 transition-all outline-none" />
            <input type="password" required placeholder="新密码" className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/10 transition-all outline-none" />
            <input type="password" required placeholder="确认新密码" className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/10 transition-all outline-none" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-emerald-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all disabled:opacity-50">
            {isLoading ? '正在提交...' : '确认修改'}
          </button>
        </form>
      </div>
    );
  }

  if (currentView === 'BIND_PHONE') {
    return (
      <div className="flex flex-col h-full bg-[#f8fafc] animate-in slide-in-from-right duration-300">
        <header className="pt-14 px-6 pb-4 glass-nav flex items-center border-b border-slate-100/50">
          <button onClick={() => setCurrentView('LIST')} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 active:bg-slate-100 mr-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-lg font-black text-slate-900">更换手机号</h1>
        </header>
        <form onSubmit={submitPhone} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <input type="tel" required placeholder="输入新手机号" className="flex-1 bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/10 transition-all outline-none" />
              <button type="button" className="px-4 bg-emerald-50 text-emerald-500 text-[10px] font-black rounded-2xl border border-emerald-100 uppercase tracking-widest">获取验证码</button>
            </div>
            <input type="text" required placeholder="验证码" className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/10 transition-all outline-none" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-emerald-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all disabled:opacity-50">
            {isLoading ? '正在绑定...' : '立即绑定'}
          </button>
        </form>
      </div>
    );
  }

  if (currentView === 'BIND_WECHAT') {
    return (
      <div className="flex flex-col h-full bg-white animate-in slide-in-from-bottom duration-500">
        <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
          <div className="w-20 h-20 bg-[#07C160] rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-green-500/20">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.522 13.92c-.378 0-.682-.33-.682-.736 0-.405.304-.736.682-.736.377 0 .681.33.681.736 0 .406-.304.736-.681.736zm6.956 0c-.378 0-.682-.33-.682-.736 0-.405.304-.736.682-.736.378 0 .682.33.682.736 0 .406-.304.736-.682.736zM12 2C6.477 2 2 5.768 2 10.42c0 2.658 1.45 5.018 3.73 6.64-.176.627-.813 2.144-.848 2.222-.053.116-.01.25.101.32.045.029.096.044.148.044.056 0 .111-.016.159-.048.06-.04 1.834-1.222 2.585-1.638.675.19 1.385.292 2.125.292 5.523 0 10-3.768 10-8.42C22 5.768 17.523 2 12 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2">微信授权绑定</h2>
          <p className="text-sm text-slate-400 font-medium mb-10 leading-relaxed">
            “秒回”申请获取您的微信公开信息（昵称、头像、性别等），以便为您提供更好的社交服务。
          </p>
          <div className="w-full space-y-4">
            <button 
              onClick={submitWechatBinding}
              disabled={isLoading}
              className="w-full bg-[#07C160] text-white font-black py-4 rounded-2xl shadow-lg shadow-green-500/10 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : '允许授权'}
            </button>
            <button 
              onClick={() => setCurrentView('LIST')}
              className="w-full bg-slate-100 text-slate-500 font-black py-4 rounded-2xl active:scale-95 transition-all"
            >
              暂不绑定
            </button>
          </div>
        </div>
        <p className="text-center pb-12 text-[10px] text-slate-300 font-medium">授权即代表您同意《微信隐私保护指引》</p>
      </div>
    );
  }

  if (currentView === 'REAL_NAME_AUTH') {
    return (
      <div className="flex flex-col h-full bg-[#f8fafc] animate-in slide-in-from-right duration-300">
        <header className="pt-14 px-6 pb-4 glass-nav flex items-center border-b border-slate-100/50">
          <button onClick={() => setCurrentView('LIST')} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 active:bg-slate-100 mr-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-lg font-black text-slate-900">实名认证</h1>
        </header>
        <div className="p-8 space-y-8">
           <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100">
              <p className="text-emerald-700 text-xs font-bold leading-relaxed">
                根据国家相关规定，为了保障您的账号安全和平台社交环境，请提供真实身份信息进行核验。
              </p>
           </div>
           <form onSubmit={submitRealNameAuth} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">真实姓名</label>
                  <input type="text" required placeholder="请输入您的真实姓名" className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/10 transition-all outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">身份证号</label>
                  <input type="text" required placeholder="请输入18位身份证号码" className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/10 transition-all outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 group cursor-pointer active:scale-95 transition-all">
                   <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                   <span className="text-[8px] font-black uppercase tracking-widest">人脸识别</span>
                </div>
                <div className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 group cursor-pointer active:scale-95 transition-all">
                   <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                   <span className="text-[8px] font-black uppercase tracking-widest">上传证件</span>
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-emerald-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : '提交审核'}
              </button>
           </form>
        </div>
      </div>
    );
  }

  if (currentView === 'ACCOUNT_DELETION') {
    return (
      <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300">
        <header className="pt-14 px-6 pb-4 flex items-center">
          <button onClick={() => setCurrentView('LIST')} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 active:bg-slate-100 mr-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-lg font-black text-slate-900">注销账号</h1>
        </header>
        <div className="px-8 pt-6 pb-12 flex flex-col h-full">
           <div className="flex-1">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-6">
                 <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">确认注销您的账号？</h2>
              <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
                注销后，您的以下信息将被永久删除且无法恢复：
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  { icon: '👤', text: '个人基本资料及认证信息' },
                  { icon: '💬', text: '所有聊天记录、心动记录' },
                  { icon: '💎', text: '会员权益、余额及虚拟礼品' },
                  { icon: '🚫', text: '绑定的手机、微信等社交关系' }
                ].map(item => (
                  <li key={item.text} className="flex items-center gap-3 text-xs font-bold text-slate-700">
                    <span className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
           </div>
           <div className="space-y-4">
              <button 
                onClick={handleAccountDeletion}
                disabled={isLoading}
                className="w-full bg-red-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-red-500/10 active:scale-95 transition-all flex items-center justify-center"
              >
                {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : '我已了解，确认注销'}
              </button>
              <button onClick={() => setCurrentView('LIST')} className="w-full bg-slate-100 text-slate-500 font-black py-4 rounded-2xl active:scale-95 transition-all">
                先留着吧
              </button>
           </div>
        </div>
      </div>
    );
  }

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
        <h1 className="text-lg font-black text-slate-900">账号与安全</h1>
      </header>

      <div className="mt-6 px-6 space-y-6 overflow-y-auto pb-20 no-scrollbar">
        <section>
          <div className="px-2 mb-4">
             <h3 className="text-xs font-black text-slate-400/80 uppercase tracking-[0.1em]">基本信息</h3>
          </div>
          
          <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/50 overflow-hidden">
            <div onClick={() => handleAction('BIND_PHONE')} className="flex items-center justify-between p-5 border-b border-slate-50 active:bg-slate-50 transition-colors cursor-pointer group">
              <span className="text-sm font-bold text-slate-800">手机号</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">{phone}</span>
                <svg className="w-4 h-4 text-slate-200 group-active:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>

            <div onClick={() => handleAction('CHANGE_PASSWORD')} className="flex items-center justify-between p-5 border-b border-slate-50 active:bg-slate-50 transition-colors cursor-pointer group">
              <span className="text-sm font-bold text-slate-800">登录密码</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">已设置</span>
                <svg className="w-4 h-4 text-slate-200 group-active:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>

            <div onClick={() => wechatBound ? showToast('您已绑定微信') : handleAction('BIND_WECHAT')} className="flex items-center justify-between p-5 border-b border-slate-50 active:bg-slate-50 transition-colors cursor-pointer group">
              <span className="text-sm font-bold text-slate-800">微信</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${wechatBound ? 'text-emerald-500' : 'text-slate-300'}`}>
                  {wechatBound ? '已绑定' : '未绑定'}
                </span>
                <svg className="w-4 h-4 text-slate-200 group-active:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>

            <div onClick={() => handleAction('REAL_NAME_AUTH')} className="flex items-center justify-between p-5 active:bg-slate-50 transition-colors cursor-pointer group">
              <span className="text-sm font-bold text-slate-800">实名认证</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${isVerified ? 'text-emerald-500' : 'text-slate-300'}`}>
                  {isVerified ? '已认证' : '去认证'}
                </span>
                <svg className="w-4 h-4 text-slate-200 group-active:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="px-2 mb-4">
             <h3 className="text-xs font-black text-slate-400/80 uppercase tracking-[0.1em]">账号操作</h3>
          </div>
          
          <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/50 overflow-hidden">
            <div 
              onClick={() => handleAction('ACCOUNT_DELETION')}
              className="flex items-center justify-between p-5 active:bg-red-50 transition-colors cursor-pointer group"
            >
              <span className="text-sm font-bold text-red-500">注销账号</span>
              <svg className="w-4 h-4 text-slate-200 group-active:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M9 5l7 7-7 7" /></svg>
            </div>
          </div>
          <p className="mt-4 px-4 text-[10px] text-slate-400 font-medium leading-relaxed">
            为了您的账户安全，建议定期更换密码。如有任何疑问，请联系“秒回”官方客服。
          </p>
        </section>
      </div>
    </div>
  );
};

export default AccountSecurity;
