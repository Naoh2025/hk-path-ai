import React, { useState } from 'react';

interface Props {
  price: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const PaymentGate: React.FC<Props> = ({ price, onSuccess, onCancel }) => {
  const [step, setStep] = useState<'order' | 'processing' | 'error'>('order');

  const handleStartPay = () => {
    // 1. 顯示「正在前往」畫面
    setStep('processing');
    
    try {
      // 2. 延遲 800ms 讓用戶看到加載動畫，然後跳轉
      setTimeout(() => {
        // 請將下方網址替換成你的真實 Stripe 連結
        window.location.href = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "https://buy.stripe.com/8x2eV68jX0VNeNobeM2ZO00";
      }, 800);
    } catch (error) {
      console.error("支付啟動失敗:", error);
      setStep('error');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[110] p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-scale-up border border-slate-100">
        
        {/* Step 1: Order Summary */}
        {step === 'order' && (
          <div className="p-8 md:p-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">确认订单</h3>
                <p className="text-slate-400 text-xs mt-1 font-bold uppercase tracking-widest">Order Summary</p>
              </div>
              <button onClick={onCancel} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-500 text-sm font-medium">项目</span>
                <span className="font-bold text-slate-800 text-sm">7年身份策略设计报告</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-500 text-sm font-medium">服务类型</span>
                <span className="font-bold text-blue-600 text-sm">AI专家审核</span>
              </div>
              <div className="h-[1px] bg-slate-200 w-full my-4"></div>
              <div className="flex justify-between items-end">
                <span className="text-slate-500 text-sm font-medium mb-1">应付总额</span>
                <div className="text-right">
                  <span className="text-slate-300 line-through text-xs mr-2">¥1999</span>
                  <span className="text-3xl font-black text-slate-900">{price}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={handleStartPay}
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-slate-200 flex items-center justify-center gap-3"
              >
                <span>立即支付</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </button>
              <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-tighter">
                支持 支付宝 Alipay / 微信支付 WeChat Pay
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Processing / Redirecting */}
        {step === 'processing' && (
          <div className="p-16 text-center space-y-6">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-slate-800">正在前往加密支付網關</h4>
              <p className="text-slate-400 text-sm animate-pulse">正在為您建立安全的支付環境...</p>
            </div>
          </div>
        )}

        {/* Step 3: Error State */}
        {step === 'error' && (
          <div className="p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h4 className="text-xl font-bold text-slate-800">啟動支付失敗</h4>
            <button 
              onClick={() => setStep('order')}
              className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold"
            >
              重試
            </button>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes scale-up {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-up { animation: scale-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};
