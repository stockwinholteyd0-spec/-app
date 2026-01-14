
import React, { useState } from 'react';
import { MOCK_MEMBERSHIP_PACKAGES } from '../constants';
import { MembershipPackage, MembershipTier } from '../types';

interface MembershipProps {
  onBack: () => void;
  onBecomeVip: (tier: MembershipTier) => void;
  isVip: boolean;
  currentTier: MembershipTier;
}

const Membership: React.FC<MembershipProps> = ({ onBack, onBecomeVip, isVip, currentTier }) => {
  const [selectedPkg, setSelectedPkg] = useState<MembershipPackage | null>(MOCK_MEMBERSHIP_PACKAGES[1]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubscribe = () => {
    if (!selectedPkg) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onBecomeVip(selectedPkg.tier);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onBack();
      }, 2500);
    }, 2000);
  };

  const allPrivileges = [
    { id: 'match', icon: '🚀', title: '极速匹配', desc: '享受更高优先级的匹配速度' },
    { id: 'badge', icon: '✨', title: '会员勋章', desc: '专属标识，彰显身份' },
    { id: 'hd', icon: '📸', title: '视频画质', desc: '享受更高清晰度的视频体验' },
    { id: 'gift', icon: '🎁', title: '礼物优惠', desc: '虚拟礼物最高享8折优惠' },
    { id: 'stealth', icon: '🕶️', title: '隐身特权', desc: '随心开启无痕浏览模式' },
    { id: 'unlimited', icon: '⚡', title: '无限次匹配', desc: '每日不限次数的视频连接' },
    { id: 'elite', icon: '💎', title: '专属礼物', desc: '解锁Elite等级独家奢华礼物' },
    { id: 'service', icon: '👩‍💼', title: '专属服务', desc: '24小时一对一至尊客服' },
  ];

  const getTierColor = (tier: MembershipTier) => {
    switch (tier) {
      case MembershipTier.ELITE: return 'text-purple-400';
      case MembershipTier.PRO: return 'text-emerald-400';
      default: return 'text-amber-400';
    }
  };

  const getTierGradient = (tier: MembershipTier) => {
    switch (tier) {
      case MembershipTier.ELITE: return 'from-purple-500/20 to-indigo-600/10 border-purple-500 shadow-purple-500/10';
      case MembershipTier.PRO: return 'from-emerald-400/20 to-emerald-600/10 border-emerald-500 shadow-emerald-500/10';
      default: return 'from-amber-400/20 to-amber-600/10 border-amber-500 shadow-amber-500/10';
    }
  };

  const getBannerGradient = (tier: MembershipTier) => {
    switch (tier) {
      case MembershipTier.ELITE: return 'from-[#312e81] to-[#1e1b4b]';
      case MembershipTier.PRO: return 'from-[#064e3b] to-[#022c22]';
      default: return 'from-[#2a2a2a] to-[#1a1a1a]';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#121212] text-white animate-in slide-in-from-right duration-300 relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[500px] rounded-full blur-[100px] -z-10 opacity-30 transition-all duration-500 ${
        selectedPkg?.tier === MembershipTier.ELITE ? 'bg-purple-500' : 
        selectedPkg?.tier === MembershipTier.PRO ? 'bg-emerald-500' : 'bg-amber-500'
      }`}></div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center px-10">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
          <div className="relative bg-[#1e1e1e] border border-white/10 rounded-[40px] p-8 w-full text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-xl font-[900] text-white mb-2 tracking-tighter italic">开通成功</h3>
            <p className="text-sm text-white/40 font-medium">尊贵的会员，已为您激活全部权益！</p>
          </div>
        </div>
      )}

      <header className="pt-14 px-6 pb-4 flex items-center border-b border-white/5 sticky top-0 z-30 bg-[#121212]/80 backdrop-blur-xl">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 active:bg-white/5 transition-colors mr-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-lg font-black italic tracking-tighter">会员特权中心</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-40 no-scrollbar space-y-10">
        {/* VIP Card Display - Changes based on selection */}
        <div className={`rounded-[40px] p-8 border border-white/10 relative overflow-hidden shadow-2xl transition-all duration-500 ${getBannerGradient(selectedPkg?.tier || MembershipTier.BASIC)}`}>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          <div className="flex justify-between items-start mb-10">
             <div>
               <h2 className={`text-2xl font-[900] italic tracking-tighter mb-1 transition-colors duration-500 ${getTierColor(selectedPkg?.tier || MembershipTier.BASIC)}`}>
                 秒回 {selectedPkg?.tier === MembershipTier.ELITE ? 'ELITE' : selectedPkg?.tier === MembershipTier.PRO ? 'PRO' : 'VIP'}
               </h2>
               <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Miahui Elite Membership</p>
             </div>
             <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg transition-all duration-500 ${
               selectedPkg?.tier === MembershipTier.ELITE ? 'from-purple-500 to-indigo-600' : 
               selectedPkg?.tier === MembershipTier.PRO ? 'from-emerald-400 to-emerald-600' : 'from-amber-400 to-amber-600'
             }`}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.5 3c1.557 0 3.046.727 4 2.015Q12.454 3.615 14 3.015c2.786 0 5.25 2.322 5.25 5.235 0 3.924-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001z" /></svg>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <img src="https://picsum.photos/seed/myself/100/100" className="w-12 h-12 rounded-full border-2 border-white/20" />
             <div>
               <p className="text-sm font-black tracking-tight">{isVip ? '当前权益生效中' : '解锁心动特权'}</p>
               <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mt-0.5">
                 {selectedPkg?.duration} · {selectedPkg?.benefits.length}项专属权益
               </p>
             </div>
          </div>
        </div>

        {/* Packages Selector */}
        <section>
          <div className="flex items-center justify-between mb-6 px-2">
            <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] italic">尊享套餐</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {MOCK_MEMBERSHIP_PACKAGES.map(pkg => {
              const isActive = selectedPkg?.id === pkg.id;
              return (
                <button 
                  key={pkg.id} 
                  onClick={() => setSelectedPkg(pkg)}
                  className={`relative group aspect-[1/1.3] rounded-[28px] flex flex-col items-center justify-center transition-all border ${
                    isActive 
                      ? `bg-gradient-to-b text-white scale-105 ${getTierGradient(pkg.tier)}` 
                      : 'bg-white/5 border-white/10 text-white/60 active:scale-95'
                  }`}
                >
                  {pkg.isBestValue && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[7px] font-[900] px-2.5 py-1 rounded-full shadow-sm tracking-tighter border-2 border-[#121212]">超值</div>
                  )}
                  <span className={`text-[9px] font-bold mb-2 ${isActive ? 'text-white' : 'text-white/30'}`}>{pkg.duration}</span>
                  <div className="flex items-baseline gap-0.5">
                     <span className="text-[10px] font-black">¥</span>
                     <span className="text-2xl font-[900] italic tracking-tighter">{pkg.price}</span>
                  </div>
                  <span className="text-[8px] line-through text-white/10 mt-1">¥{pkg.originalPrice}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Benefits Comparison List */}
        <section>
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] italic">特权对比</h3>
          </div>
          <div className="space-y-6">
             {selectedPkg?.benefits.map((benefit, idx) => (
               <div key={idx} className="flex items-center gap-4 animate-in slide-in-from-left duration-300" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                    selectedPkg.tier === MembershipTier.ELITE ? 'bg-purple-500/10 text-purple-400' :
                    selectedPkg.tier === MembershipTier.PRO ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white mb-0.5">{benefit}</h4>
                    <p className="text-[9px] text-white/30 font-medium">包含在 {selectedPkg.name} 中</p>
                  </div>
               </div>
             ))}
             
             {/* Show Locked Benefits for Basic/Pro */}
             {selectedPkg?.tier !== MembershipTier.ELITE && (
                <div className="pt-4 border-t border-white/5 space-y-6 opacity-30 grayscale">
                   <p className="text-[9px] font-black text-white/20 text-center uppercase tracking-widest">升级至年度会员解锁更多</p>
                   {allPrivileges.filter(p => !selectedPkg?.benefits.some(b => b.includes(p.title))).map((p, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-xl shrink-0">🔒</div>
                        <div>
                          <h4 className="text-xs font-black text-white mb-0.5">{p.title}</h4>
                          <p className="text-[9px] text-white/30 font-medium">{p.desc}</p>
                        </div>
                      </div>
                   ))}
                </div>
             )}
          </div>
        </section>

        <p className="text-center text-[10px] text-white/20 font-medium pb-10">
          开通即同意 <span className="text-amber-500/60">《会员服务协议》</span> 与 <span className="text-amber-500/60">《自动续费协议》</span>
        </p>
      </div>

      {/* Sticky Action Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-gradient-to-t from-black via-black/90 to-transparent z-40">
        <button 
          onClick={handleSubscribe}
          disabled={isProcessing}
          className={`w-full text-black font-[900] py-4 rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 italic tracking-tighter ${
            selectedPkg?.tier === MembershipTier.ELITE ? 'bg-gradient-to-r from-purple-400 to-indigo-500' : 
            selectedPkg?.tier === MembershipTier.PRO ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-amber-400 to-amber-600'
          }`}
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
          ) : (
            <>
              <span>立即开通 {selectedPkg?.name}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Membership;
