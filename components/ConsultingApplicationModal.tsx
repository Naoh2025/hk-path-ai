import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  hasRoadmap: boolean;
}

export const ConsultingApplicationModal: React.FC<Props> = ({ isOpen, onClose, hasRoadmap }) => {
  const [view, setView] = useState<'steps' | 'qrcode'>('steps');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const steps = [
    {
      id: '01',
      title: '基礎評估',
      desc: '通過系統 2 (AI 診斷) 確保背景符合政策底線要求。',
      status: 'completed'
    },
    {
      id: '02',
      title: '策略定調',
      desc: '完成系統 3 (7 年策略設計)，雙方就發展路線達成戰略共識。',
      status: hasRoadmap ? 'completed' : 'current'
    },
    {
      id: '03',
      title: '專家面談',
      desc: '預約顧問進行 30 分鐘一對一通話，審核材料真實性並確認服務期望。',
      status: hasRoadmap ? 'current' : 'pending'
    },
    {
      id: '04',
      title: '正式入駐',
      desc: '確認合作意向，簽署合約並進入年度 50 位精英陪跑名單。',
      status: 'pending'
    }
  ];

  const handleCopyWeChat = () => {
    // 兼容性較強的複製方法
    const textToCopy = "HK_Path_Expert";
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClose = () => {
    setView('steps');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* 背景裝飾 */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <span className="text-8xl font-black">HK</span>
        </div>

        <div className="p-8 md:p-12">
          <div className="flex justify-between items-start mb-10">
            <div className="space-y-1">
              <h3 className="text-3xl font-black text-slate-900">
                {view === 'steps' ? '申請預約陪跑' : '掃碼預約面談'}
              </h3>
              <p className="text-slate-500 font-medium">
                {view === 'steps' ? '系統 4：陪伴式策略落地服務申請路徑' : '請長按下方二維碼，添加專家顧問微信'}
              </p>
            </div>
            <button onClick={handleClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {view === 'steps' ? (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-50 p-6 rounded-3xl mb-10 border border-slate-100">
                <div className="flex items-center space-x-3 text-blue-600 mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-black uppercase tracking-widest">雙向選擇機制</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  為了確保每一位陪跑客戶都能獲得最高質量的交付，我們每年僅開放 <span className="text-slate-900 font-bold">50 個服務席位</span>。
                  我們不接受背景不匹配、價值觀不一致或僅追求「包過」保證的申請人。
                </p>
              </div>

              <div className="space-y-6 relative">
                <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-slate-100"></div>
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-6 relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                      step.status === 'completed' ? 'bg-blue-600 border-blue-600 text-white' :
                      step.status === 'current' ? 'bg-white border-blue-600 text-blue-600 shadow-lg shadow-blue-100' :
                      'bg-white border-slate-200 text-slate-400'
                    }`}>
                      {step.status === 'completed' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : step.id}
                    </div>
                    <div className="flex-1 pb-4">
                      <h4 className={`font-bold ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{step.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex flex-col md:flex-row gap-4">
                <button 
                  onClick={() => {
                    if (hasRoadmap) {
                      setView('qrcode');
                    } else {
                      handleClose();
                      document.getElementById('assessment-anchor')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-slate-200"
                >
                  {hasRoadmap ? '立即預約面談' : '先去完成 AI 評估'}
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
              
              {/* 真實二維碼展示區域 - 強化識別設計 */}
              <div className="relative p-4 bg-slate-50 rounded-[3rem] shadow-inner border border-slate-100 mb-8">
                <div className="w-64 h-64 relative bg-white rounded-[2rem] p-4 shadow-sm flex items-center justify-center overflow-hidden">
                  {/* 核心圖片：確保為 img 標籤且在頂層 */}
                  <img 
                    src="/wechat-qr.png" 
                    alt="Expert Consultation QR Code" 
                    className="w-full h-full object-contain relative z-10"
                    style={{ WebkitTouchCallout: 'default' }} // 確保 iOS 下長按菜單彈出
                  />
                  
                  {/* 動態掃描線 - 放在圖片下方或設為 pointer-events-none 以免擋住長按 */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-scan-slow pointer-events-none z-20"></div>
                </div>
                
                {/* 裝飾性框架 */}
                <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-blue-400 rounded-tl-lg pointer-events-none"></div>
                <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-blue-400 rounded-tr-lg pointer-events-none"></div>
                <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-blue-400 rounded-bl-lg pointer-events-none"></div>
                <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-blue-400 rounded-br-lg pointer-events-none"></div>
              </div>
              
              <div className="text-center space-y-6 mb-8">
                <div className="group cursor-pointer" onClick={handleCopyWeChat}>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">WeChat ID (點擊複製)</p>
                  <p className={`text-2xl font-black transition-all px-6 py-2 rounded-2xl border ${copied ? 'text-green-600 bg-green-50 border-green-200 scale-95' : 'text-slate-900 bg-slate-100 border-slate-200 hover:bg-slate-200 active:scale-95'}`}>
                    {copied ? '已成功複製！' : 'HK_Path_Expert'}
                    {!copied && <span className="ml-2 text-blue-500 opacity-40 group-hover:opacity-100 transition-opacity text-xl">📋</span>}
                  </p>
                </div>

                <div className="bg-blue-600/5 px-8 py-5 rounded-[2rem] border border-blue-100 max-w-sm mx-auto relative">
                  <p className="text-blue-800 text-sm font-black leading-relaxed">
                    請務必在申請時備註：<br/>
                    <span className="text-blue-600 text-lg">「陪跑策略預約 + 您的暱稱」</span>
                  </p>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed max-w-xs mx-auto italic">
                  專家顧問將在 24 小時內通過申請，<br/>
                  並安排 30 分鐘的一對一深度通話。
                </p>
              </div>

              <div className="w-full flex space-x-4">
                <button 
                  onClick={() => setView('steps')}
                  className="flex-1 py-4 text-slate-500 font-bold text-sm hover:text-slate-900 transition-colors"
                >
                  ← 返回流程
                </button>
                <button 
                  onClick={handleClose}
                  className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200"
                >
                  我知道了
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scan-slow {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .animate-scan-slow {
          animation: scan-slow 3.5s infinite linear;
        }
        .animate-in {
          animation: animate-in 0.3s ease-out;
        }
        @keyframes animate-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
