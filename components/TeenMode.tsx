
import React from 'react';

interface TeenModeProps {
  onBack: () => void;
}

const TeenMode: React.FC<TeenModeProps> = ({ onBack }) => {
  const restrictions = [
    { title: '时长限制', desc: '每日累计使用时长不超过40分钟', icon: '⏰' },
    { title: '时段锁定', desc: '每日22时至次日6时无法使用App', icon: '🌙' },
    { title: '功能精简', desc: '无法进行充值、打赏等消费行为', icon: '🔒' },
    { title: '内容筛选', desc: '仅展示适合未成年人的优质内容', icon: '🛡️' },
  ];

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300">
      <header className="pt-14 px-6 pb-4 flex items-center">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 active:bg-slate-100 transition-colors mr-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-lg font-black text-slate-900">青少年模式</h1>
      </header>

      <div className="flex-1 flex flex-col items-center px-8 pt-10">
        <div className="w-24 h-24 bg-emerald-50 rounded-[40px] flex items-center justify-center text-4xl mb-8 shadow-inner shadow-emerald-500/5">👦</div>
        <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">未开启</h2>
        <p className="text-slate-400 text-sm font-medium text-center leading-relaxed mb-12">
          开启青少年模式，我们将为未成年人<br/>提供更加健康、安全的社交环境。
        </p>

        <div className="w-full space-y-6 mb-12">
          {restrictions.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-xl shrink-0">{item.icon}</div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full bg-emerald-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-500/20 active:scale-95 transition-all">
          开启青少年模式
        </button>
        <p className="mt-6 text-[10px] text-slate-300 font-medium italic">开启需设置四位独立独立密码</p>
      </div>
    </div>
  );
};

export default TeenMode;
