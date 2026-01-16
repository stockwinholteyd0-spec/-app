
import React, { useState } from 'react';

interface TeenModeProps {
  onBack: () => void;
  isEnabled: boolean;
  toggleMode: (enabled: boolean) => void;
}

const TeenMode: React.FC<TeenModeProps> = ({ onBack, isEnabled, toggleMode }) => {
  const [step, setStep] = useState<'INFO' | 'INPUT_PIN'>('INFO');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const restrictions = [
    { title: '时长限制', desc: '每日累计使用时长不超过40分钟', icon: '⏰' },
    { title: '时段锁定', desc: '每日22时至次日6时无法使用App', icon: '🌙' },
    { title: '功能精简', desc: '无法进行充值、打赏等消费行为', icon: '🔒' },
    { title: '内容筛选', desc: '仅展示适合未成年人的优质内容', icon: '🛡️' },
  ];

  const handlePinInput = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      
      if (newPin.length === 4) {
        // Mock verification - in reality, you'd save this PIN first
        setTimeout(() => {
          if (isEnabled) {
            // Turning OFF
            toggleMode(false);
            setStep('INFO');
            setPin('');
          } else {
            // Turning ON
            toggleMode(true);
            setStep('INFO');
            setPin('');
          }
        }, 300);
      }
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setError('');
  };

  if (step === 'INPUT_PIN') {
    return (
      <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300 relative">
        <header className="pt-14 px-6 pb-4">
          <button onClick={() => { setStep('INFO'); setPin(''); }} className="text-slate-900 font-bold text-sm">取消</button>
        </header>
        
        <div className="flex-1 flex flex-col items-center pt-20 px-8">
           <h2 className="text-2xl font-black text-slate-900 mb-2">
             {isEnabled ? '输入密码关闭青少年模式' : '设置4位独立密码'}
           </h2>
           <p className="text-slate-400 text-sm font-medium mb-12">
             {isEnabled ? '输入此前设置的密码' : '请牢记您的密码，用于开启或关闭模式'}
           </p>

           <div className="flex gap-6 mb-16">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center text-2xl font-black transition-all ${
                  pin.length > i 
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-500' 
                    : 'border-slate-100 bg-slate-50'
                }`}>
                  {pin.length > i ? '•' : ''}
                </div>
              ))}
           </div>

           {/* Numeric Keypad */}
           <div className="w-full max-w-[280px] grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button 
                  key={num} 
                  onClick={() => handlePinInput(num.toString())}
                  className="h-16 rounded-[24px] bg-slate-50 text-2xl font-bold text-slate-900 active:bg-slate-200 active:scale-95 transition-all"
                >
                  {num}
                </button>
              ))}
              <div className="h-16"></div>
              <button 
                onClick={() => handlePinInput('0')}
                className="h-16 rounded-[24px] bg-slate-50 text-2xl font-bold text-slate-900 active:bg-slate-200 active:scale-95 transition-all"
              >
                0
              </button>
              <button 
                onClick={handleDelete}
                className="h-16 rounded-[24px] flex items-center justify-center text-slate-400 active:bg-slate-200 active:scale-95 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /><path d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300">
      <header className="pt-14 px-6 pb-4 flex items-center">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 active:bg-slate-100 transition-colors mr-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-lg font-black text-slate-900">青少年模式</h1>
      </header>

      <div className="flex-1 flex flex-col items-center px-8 pt-8 overflow-y-auto no-scrollbar">
        <div className={`w-24 h-24 rounded-[40px] flex items-center justify-center text-4xl mb-6 shadow-inner transition-colors duration-500 ${isEnabled ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-slate-50 text-slate-400 shadow-slate-200/50'}`}>
          {isEnabled ? '🛡️' : '👦'}
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
          {isEnabled ? '青少年模式已开启' : '未开启'}
        </h2>
        <p className="text-slate-400 text-xs font-medium text-center leading-relaxed mb-10">
          {isEnabled 
            ? '当前已进入严格保护模式，如需关闭请点击下方按钮验证密码。'
            : '开启青少年模式，我们将为未成年人提供更加健康、安全的社交环境。'
          }
        </p>

        <div className="w-full space-y-4 mb-10">
          {restrictions.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-slate-50 p-4 rounded-[24px]">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-sm">{item.icon}</div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setStep('INPUT_PIN')}
          className={`w-full text-white font-black py-4 rounded-2xl shadow-xl active:scale-95 transition-all mb-8 ${
            isEnabled 
              ? 'bg-slate-900 shadow-slate-900/10' 
              : 'bg-emerald-500 shadow-emerald-500/20'
          }`}
        >
          {isEnabled ? '关闭青少年模式' : '开启青少年模式'}
        </button>
      </div>
    </div>
  );
};

export default TeenMode;
