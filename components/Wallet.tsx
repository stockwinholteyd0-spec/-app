
import React, { useState } from 'react';
import { MOCK_RECHARGE_PACKAGES } from '../constants';
import { RechargePackage } from '../types';

interface WalletProps {
  balance: number;
  onBack: () => void;
  onRecharge: (coins: number) => void;
  onOpenMembership: () => void;
}

type PayMethod = 'ALIPAY' | 'WECHAT';

const Wallet: React.FC<WalletProps> = ({ balance, onBack, onRecharge, onOpenMembership }) => {
  const [selectedPkg, setSelectedPkg] = useState<RechargePackage | null>(null);
  const [payMethod, setPayMethod] = useState<PayMethod>('WECHAT');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isBridging, setIsBridging] = useState(false);

  const handlePay = () => {
    if (!selectedPkg) return;
    setIsProcessing(true);
    setIsBridging(true);
    setTimeout(() => {
      setIsBridging(false);
      setTimeout(() => {
        setIsProcessing(false);
        onRecharge(selectedPkg.coins);
        setShowSuccess(true);
        setSelectedPkg(null);
        setTimeout(() => setShowSuccess(false), 2500);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] animate-in slide-in-from-right duration-300 relative">
      {isBridging && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-white animate-in fade-in duration-300">
           <div className="w-20 h-20 mb-8 relative">
              <div className={`w-full h-full rounded-[32px] flex items-center justify-center shadow-xl ${payMethod === 'WECHAT' ? 'bg-[#07C160]' : 'bg-[#00A0E9]'}`}>
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.42 2c-5.83 0-10.42 4.41-10.42 9.47 0 2.51 1.13 4.81 2.97 6.44-.14.61-.64 2.06-.67 2.14-.04.11-.01.24.08.31.04.03.08.04.12.04.04 0 .09-.01.12-.04.05-.04 1.45-1.16 2.04-1.56.54.18 1.1.28 1.68.28 5.83 0 10.42-4.41 10.42-9.47S18.25 2 12.42 2z" /></svg>
              </div>
           </div>
           <h3 className="text-lg font-black text-slate-900 mb-2">正在唤起支付</h3>
        </div>
      )}

      {showSuccess && (
        <div className="absolute inset-0 z-50 flex items-center justify-center px-10">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
          <div className="relative bg-white rounded-[40px] p-8 w-full text-center animate-in zoom-in duration-300 shadow-2xl">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20"><svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg></div>
            <h3 className="text-xl font-black text-slate-900 mb-2">充值成功</h3>
          </div>
        </div>
      )}

      <header className="pt-14 px-6 pb-4 glass-nav flex items-center border-b border-slate-100/50 sticky top-0 z-30">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 active:bg-slate-100 mr-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg></button>
        <h1 className="text-lg font-black text-slate-900">我的钱包</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-32 no-scrollbar space-y-8">
        <div className="bg-emerald-500 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
          <p className="text-emerald-100 text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-80 italic">Account Balance</p>
          <div className="flex items-end gap-2"><span className="text-5xl font-[900] tracking-tighter">{balance}</span><span className="text-sm font-black text-emerald-100 mb-2 opacity-60">秒币</span></div>
          <button onClick={onOpenMembership} className="mt-8 w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-2xl text-xs font-black uppercase tracking-widest border border-white/10 transition-all">开通会员权益</button>
        </div>

        <section>
          <div className="flex items-center justify-between mb-6 px-2"><h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.1em]">请选择充值套餐</h3><span className="text-[10px] text-emerald-500 font-black tracking-widest uppercase">1元 = 10秒币</span></div>
          <div className="grid grid-cols-3 gap-3">
            {MOCK_RECHARGE_PACKAGES.map(pkg => (
              <button key={pkg.id} onClick={() => setSelectedPkg(pkg)} className={`relative group aspect-square rounded-[28px] flex flex-col items-center justify-center transition-all border ${selectedPkg?.id === pkg.id ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-900'}`}>
                <span className="text-xl font-[900] tracking-tight">{pkg.coins}</span>
                <div className={`mt-3 px-3 py-1 rounded-full text-[10px] font-black ${selectedPkg?.id === pkg.id ? 'bg-white text-emerald-500' : 'bg-slate-50 text-slate-800'}`}>¥{pkg.price}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-[32px] p-6 border border-slate-100/50 shadow-sm">
           <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 ml-1">选择支付方式</h3>
           <div className="space-y-3">
              <div onClick={() => setPayMethod('WECHAT')} className={`flex items-center justify-between p-3 rounded-2xl border ${payMethod === 'WECHAT' ? 'border-emerald-500/30 bg-emerald-50/20' : 'border-transparent'}`}><span className="text-sm font-bold text-slate-800">微信支付</span><div className={`w-6 h-6 rounded-full border-2 ${payMethod === 'WECHAT' ? 'border-emerald-500 bg-emerald-500' : 'border-slate-200'}`}></div></div>
              <div onClick={() => setPayMethod('ALIPAY')} className={`flex items-center justify-between p-3 rounded-2xl border ${payMethod === 'ALIPAY' ? 'border-emerald-500/30 bg-emerald-50/20' : 'border-transparent'}`}><span className="text-sm font-bold text-slate-800">支付宝支付</span><div className={`w-6 h-6 rounded-full border-2 ${payMethod === 'ALIPAY' ? 'border-emerald-500 bg-emerald-500' : 'border-slate-200'}`}></div></div>
           </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t border-slate-50 z-40">
        <button onClick={handlePay} disabled={!selectedPkg || isProcessing} className={`w-full text-white font-[900] py-4 rounded-2xl shadow-xl active:scale-95 transition-all ${selectedPkg ? (payMethod === 'WECHAT' ? 'bg-[#07C160]' : 'bg-[#00A0E9]') : 'bg-slate-100 text-slate-300'}`}>
          {isProcessing ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div> : `立即支付 ¥${selectedPkg ? selectedPkg.price : '0.00'}`}
        </button>
      </div>
    </div>
  );
};

export default Wallet;
