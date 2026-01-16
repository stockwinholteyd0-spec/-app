
import React, { useState } from 'react';
import { MOCK_MEMBERSHIP_PACKAGES } from '../constants';
import { MembershipPackage, MembershipTier } from '../types';

interface MembershipProps {
  onBack: () => void;
  onBecomeVip: (tier: MembershipTier) => void;
  isVip: boolean;
  currentTier: MembershipTier;
  miaCoins: number;
  setMiaCoins: React.Dispatch<React.SetStateAction<number>>;
}

const Membership: React.FC<MembershipProps> = ({ onBack, onBecomeVip, isVip, currentTier, miaCoins, setMiaCoins }) => {
  const [selectedPkg, setSelectedPkg] = useState<MembershipPackage | null>(MOCK_MEMBERSHIP_PACKAGES[1]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubscribe = () => {
    if (!selectedPkg) return;
    
    // Member price in coins (assuming 1 CNY = 10 Coins)
    const coinPrice = selectedPkg.price * 10;

    if (miaCoins < coinPrice) {
      alert(`秒币不足，当前需要 ${coinPrice} 秒币，余额 ${miaCoins}`);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setMiaCoins(prev => prev - coinPrice);
      onBecomeVip(selectedPkg.tier);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onBack();
      }, 2500);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#121212] text-white animate-in slide-in-from-right duration-300 relative overflow-hidden">
      {showSuccess && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center px-10 bg-black/60 backdrop-blur-md">
          <div className="bg-[#1e1e1e] border border-white/10 rounded-[40px] p-8 w-full text-center animate-in zoom-in duration-300">
            <h3 className="text-xl font-[900] text-white mb-2 italic">开通成功</h3>
            <p className="text-sm text-white/40 font-medium">账户已扣除 {selectedPkg!.price * 10} 秒币</p>
          </div>
        </div>
      )}

      <header className="pt-14 px-6 pb-4 flex items-center border-b border-white/5 sticky top-0 z-30 bg-[#121212]/80 backdrop-blur-xl">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 active:bg-white/5 mr-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg></button>
        <h1 className="text-lg font-black italic tracking-tighter">会员特权中心</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-40 no-scrollbar space-y-8">
        <div className="bg-[#1a1a1a] rounded-[32px] p-6 border border-white/5 flex items-center justify-between">
           <div><p className="text-[10px] text-white/30 uppercase font-black">账户余额</p><p className="text-2xl font-black italic tracking-tighter">{miaCoins} 秒币</p></div>
           <button onClick={onBack} className="bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5">充值</button>
        </div>

        <section>
          <div className="px-2 mb-4">
             <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">选择会员套餐</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {MOCK_MEMBERSHIP_PACKAGES.map(pkg => (
              <button key={pkg.id} onClick={() => setSelectedPkg(pkg)} className={`aspect-[1/1.3] rounded-[28px] flex flex-col items-center justify-center border transition-all ${selectedPkg?.id === pkg.id ? 'bg-emerald-500 border-emerald-400 text-white scale-105' : 'bg-white/5 border-white/10 text-white/60'}`}>
                <span className="text-[9px] font-bold mb-2 uppercase tracking-widest opacity-60">{pkg.duration}</span>
                <span className="text-2xl font-[900] italic">{pkg.price * 10}</span>
                <span className="text-[7px] font-black opacity-40 uppercase tracking-[0.2em] mt-1">秒币兑换</span>
              </button>
            ))}
          </div>
        </section>

        {selectedPkg && (
          <section className="animate-in slide-in-from-bottom duration-500">
             <div className="px-2 mb-4">
               <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">当前套餐特权</h3>
             </div>
             <div className="bg-[#1a1a1a] rounded-[32px] p-6 border border-white/5">
                <div className="grid grid-cols-2 gap-4">
                   {selectedPkg.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                         </div>
                         <span className="text-xs font-bold text-white/80">{benefit}</span>
                      </div>
                   ))}
                </div>
             </div>
          </section>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-gradient-to-t from-black z-40">
        <button onClick={handleSubscribe} disabled={isProcessing} className="w-full bg-emerald-500 text-black font-[900] py-4 rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 italic">
          {isProcessing ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mx-auto"></div> : `立即支付 ${selectedPkg ? selectedPkg.price * 10 : 0} 秒币`}
        </button>
      </div>
    </div>
  );
};

export default Membership;
