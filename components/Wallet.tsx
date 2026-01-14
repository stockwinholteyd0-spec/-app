
import React, { useState } from 'react';
import { MOCK_RECHARGE_PACKAGES } from '../constants';
import { RechargePackage } from '../types';

interface WalletProps {
  balance: number;
  onBack: () => void;
  onRecharge: (coins: number) => void;
}

type PayMethod = 'ALIPAY' | 'WECHAT';

const Wallet: React.FC<WalletProps> = ({ balance, onBack, onRecharge }) => {
  const [selectedPkg, setSelectedPkg] = useState<RechargePackage | null>(null);
  const [payMethod, setPayMethod] = useState<PayMethod>('WECHAT');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isBridging, setIsBridging] = useState(false);

  const handlePay = () => {
    if (!selectedPkg) return;
    
    setIsProcessing(true);
    setIsBridging(true);

    // Simulate jumping to third party app
    setTimeout(() => {
      setIsBridging(false);
      // Simulate payment processing in the "background"
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
      {/* Bridging to Payment App Overlay */}
      {isBridging && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-white animate-in fade-in duration-300">
           <div className="w-20 h-20 mb-8 relative">
              <div className="absolute inset-0 bg-emerald-100 rounded-[32px] animate-ping opacity-20"></div>
              <div className={`w-full h-full rounded-[32px] flex items-center justify-center shadow-xl ${payMethod === 'WECHAT' ? 'bg-[#07C160]' : 'bg-[#00A0E9]'}`}>
                {payMethod === 'WECHAT' ? (
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8.522 13.92c-.378 0-.682-.33-.682-.736 0-.405.304-.736.682-.736.377 0 .681.33.681.736 0 .406-.304.736-.681.736zm6.956 0c-.378 0-.682-.33-.682-.736 0-.405.304-.736.682-.736.378 0 .682.33.682.736 0 .406-.304.736-.682.736zM12 2C6.477 2 2 5.768 2 10.42c0 2.658 1.45 5.018 3.73 6.64-.176.627-.813 2.144-.848 2.222-.053.116-.01.25.101.32.045.029.096.044.148.044.056 0 .111-.016.159-.048.06-.04 1.834-1.222 2.585-1.638.675.19 1.385.292 2.125.292 5.523 0 10-3.768 10-8.42C22 5.768 17.523 2 12 2z" /></svg>
                ) : (
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.42 2c-5.83 0-10.42 4.41-10.42 9.47 0 2.51 1.13 4.81 2.97 6.44-.14.61-.64 2.06-.67 2.14-.04.11-.01.24.08.31.04.03.08.04.12.04.04 0 .09-.01.12-.04.05-.04 1.45-1.16 2.04-1.56.54.18 1.1.28 1.68.28 5.83 0 10.42-4.41 10.42-9.47S18.25 2 12.42 2z" /></svg>
                )}
              </div>
           </div>
           <h3 className="text-lg font-black text-slate-900 mb-2">正在唤起{payMethod === 'WECHAT' ? '微信' : '支付宝'}支付</h3>
           <p className="text-xs text-slate-400 font-bold tracking-widest uppercase animate-pulse">Safely Connecting...</p>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="absolute inset-0 z-50 flex items-center justify-center px-10">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
          <div className="relative bg-white rounded-[40px] p-8 w-full text-center animate-in zoom-in duration-300 shadow-2xl">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">充值成功</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">您的秒币已实时到账，<br/>快去开启心动视频吧！</p>
          </div>
        </div>
      )}

      <header className="pt-14 px-6 pb-4 glass-nav flex items-center border-b border-slate-100/50 sticky top-0 z-30">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 active:bg-slate-100 transition-colors mr-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-lg font-black text-slate-900">我的钱包</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-32 no-scrollbar space-y-8">
        {/* Balance Card */}
        <div className="bg-emerald-500 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-emerald-500/20">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <p className="text-emerald-100 text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-80 italic">Account Balance</p>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-[900] tracking-tighter">{balance}</span>
            <span className="text-sm font-black text-emerald-100 mb-2 opacity-60">秒币</span>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-emerald-500 bg-emerald-100 flex items-center justify-center text-[10px] shadow-sm">💰</div>
              ))}
            </div>
            <span className="text-[9px] font-black text-emerald-100 uppercase tracking-[0.2em] opacity-80">Recharge History</span>
          </div>
        </div>

        {/* Recharge Packages */}
        <section>
          <div className="flex items-center justify-between mb-6 px-2">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.1em]">请选择充值套餐</h3>
            <span className="text-[10px] text-emerald-500 font-black tracking-widest uppercase">1元 = 10秒币</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {MOCK_RECHARGE_PACKAGES.map(pkg => (
              <button 
                key={pkg.id} 
                onClick={() => setSelectedPkg(pkg)}
                className={`relative group aspect-square rounded-[28px] flex flex-col items-center justify-center transition-all border ${
                  selectedPkg?.id === pkg.id 
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-105' 
                    : 'bg-white border-slate-100 text-slate-900 active:scale-95'
                }`}
              >
                {pkg.isHot && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-[7px] font-black px-2.5 py-1 rounded-full shadow-sm tracking-tighter border-2 border-white">HOT</div>
                )}
                <span className="text-xl font-[900] tracking-tight">{pkg.coins}</span>
                <span className={`text-[8px] font-bold uppercase tracking-widest mt-0.5 ${selectedPkg?.id === pkg.id ? 'text-emerald-100' : 'text-slate-400'}`}>秒币</span>
                <div className={`mt-3 px-3 py-1 rounded-full text-[10px] font-black ${
                  selectedPkg?.id === pkg.id ? 'bg-white text-emerald-500' : 'bg-slate-50 text-slate-800'
                }`}>
                  ¥{pkg.price}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Payment Methods Selection */}
        <section className="bg-white rounded-[32px] p-6 border border-slate-100/50 shadow-sm">
           <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 ml-1">选择支付方式</h3>
           <div className="space-y-3">
              <div 
                onClick={() => setPayMethod('WECHAT')}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${payMethod === 'WECHAT' ? 'border-emerald-500/30 bg-emerald-50/20' : 'border-transparent active:bg-slate-50'}`}
              >
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-[#07C160]/10 rounded-2xl flex items-center justify-center text-[#07C160]">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.522 13.92c-.378 0-.682-.33-.682-.736 0-.405.304-.736.682-.736.377 0 .681.33.681.736 0 .406-.304.736-.681.736zm6.956 0c-.378 0-.682-.33-.682-.736 0-.405.304-.736.682-.736.378 0 .682.33.682.736 0 .406-.304.736-.682.736zM12 2C6.477 2 2 5.768 2 10.42c0 2.658 1.45 5.018 3.73 6.64-.176.627-.813 2.144-.848 2.222-.053.116-.01.25.101.32.045.029.096.044.148.044.056 0 .111-.016.159-.048.06-.04 1.834-1.222 2.585-1.638.675.19 1.385.292 2.125.292 5.523 0 10-3.768 10-8.42C22 5.768 17.523 2 12 2z" /></svg>
                   </div>
                   <span className="text-sm font-bold text-slate-800">微信支付</span>
                 </div>
                 <div className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${payMethod === 'WECHAT' ? 'border-emerald-500 bg-emerald-500' : 'border-slate-200 bg-white'}`}>
                    {payMethod === 'WECHAT' && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path d="M5 13l4 4L19 7" /></svg>}
                 </div>
              </div>

              <div 
                onClick={() => setPayMethod('ALIPAY')}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${payMethod === 'ALIPAY' ? 'border-emerald-500/30 bg-emerald-50/20' : 'border-transparent active:bg-slate-50'}`}
              >
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-[#00A0E9]/10 rounded-2xl flex items-center justify-center text-[#00A0E9]">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.42 2c-5.83 0-10.42 4.41-10.42 9.47 0 2.51 1.13 4.81 2.97 6.44-.14.61-.64 2.06-.67 2.14-.04.11-.01.24.08.31.04.03.08.04.12.04.04 0 .09-.01.12-.04.05-.04 1.45-1.16 2.04-1.56.54.18 1.1.28 1.68.28 5.83 0 10.42-4.41 10.42-9.47S18.25 2 12.42 2z" /></svg>
                   </div>
                   <span className="text-sm font-bold text-slate-800">支付宝支付</span>
                 </div>
                 <div className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${payMethod === 'ALIPAY' ? 'border-emerald-500 bg-emerald-500' : 'border-slate-200 bg-white'}`}>
                    {payMethod === 'ALIPAY' && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path d="M5 13l4 4L19 7" /></svg>}
                 </div>
              </div>
           </div>
        </section>

        <p className="px-4 text-[10px] text-slate-400 font-medium leading-relaxed text-center opacity-60">
          温馨提示：充值即代表同意 <span className="text-emerald-500">《秒币服务协议》</span>。<br/>
          秒币仅限应用内购买虚拟礼物使用，不支持提现。
        </p>
      </div>

      {/* Sticky Pay Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white/80 backdrop-blur-xl border-t border-slate-50 z-40">
        <button 
          onClick={handlePay}
          disabled={!selectedPkg || isProcessing}
          className={`w-full text-white font-[900] py-4 rounded-2xl shadow-xl active:scale-95 transition-all disabled:bg-slate-100 disabled:text-slate-300 disabled:shadow-none flex items-center justify-center gap-3 ${
            selectedPkg ? (payMethod === 'WECHAT' ? 'bg-[#07C160] shadow-green-500/20' : 'bg-[#00A0E9] shadow-blue-500/20') : 'bg-slate-100'
          }`}
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <span>立即支付 ¥{selectedPkg ? selectedPkg.price : '0.00'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Wallet;
