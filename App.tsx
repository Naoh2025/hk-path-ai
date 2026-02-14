
import React, { useState } from 'react';
import { UserProfile, AssessmentResult, StrategyRoadmap } from './types';
import { getFreeAssessment, generateStrategyRoadmap } from './services/geminiService';
import { AssessmentForm } from './components/AssessmentForm';
import { ResultDashboard } from './components/ResultDashboard';
import { AcquisitionSection } from './components/AcquisitionSection';
import { PaymentGate } from './components/PaymentGate';
import { ConsultingApplicationModal } from './components/ConsultingApplicationModal';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [roadmap, setRoadmap] = useState<StrategyRoadmap | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRoadmapLoading, setIsRoadmapLoading] = useState(false);
  const [roadmapStage, setRoadmapStage] = useState<'ai' | 'expert' | 'done'>('ai');
  const [showPayment, setShowPayment] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const handleAssessment = async (p: UserProfile) => {
    setIsLoading(true);
    setProfile(p);
    try {
      const res = await getFreeAssessment(p);
      setAssessment(res);
      setTimeout(() => {
        document.getElementById('results-header')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error(error);
      alert("分析出錯，請稍後再試。");
    } finally {
      setIsLoading(false);
    }
  };

  const startPayment = () => {
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    setShowPayment(false);
    if (!profile || !assessment) return;
    
    setIsRoadmapLoading(true);
    setRoadmapStage('ai');
    try {
      const res = await generateStrategyRoadmap(profile, assessment);
      setTimeout(() => {
        setRoadmapStage('expert');
        setTimeout(() => {
          setRoadmap(res);
          setRoadmapStage('done');
          setIsRoadmapLoading(false);
        }, 3500);
      }, 3000); 
    } catch (error) {
      console.error(error);
      alert("生成策略圖出錯。");
      setIsRoadmapLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Navigation */}
      <nav className="glass-morphism sticky top-0 z-50 px-6 py-4 mb-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl">HK</div>
            <span className="font-bold text-xl tracking-tight text-slate-800">Path AI</span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors">首頁</a>
            <a href="#" className="hover:text-blue-600 transition-colors">三大系統</a>
            <a href="#" className="hover:text-blue-600 transition-colors">理性分析</a>
          </div>
          <button 
            onClick={() => setShowApplyModal(true)}
            className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all"
          >
            預約顧問
          </button>
        </div>
      </nav>

      {showPayment && (
        <PaymentGate 
          price="¥999" 
          onSuccess={handlePaymentSuccess} 
          onCancel={() => setShowPayment(false)} 
        />
      )}

      <ConsultingApplicationModal 
        isOpen={showApplyModal} 
        onClose={() => setShowApplyModal(false)} 
        hasRoadmap={!!roadmap}
      />

      <main className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <section className="text-center mb-24 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            香港留學 × 身份路徑 <br />
            <span className="gradient-text">AI 驅動策略顧問</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            拒絕空泛行銷<br />
            四大系統 · 專業分析判斷<br />
            為您規劃 7 年香港身份發展建議藍圖
          </p>
          <div className="pt-8 flex flex-col md:flex-row justify-center gap-4">
            <button 
              onClick={() => document.getElementById('assessment-anchor')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
            >
              開始免費可行性初判
            </button>
            <button 
              onClick={() => setShowApplyModal(true)}
              className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold shadow-sm hover:bg-slate-50 transition-all"
            >
              了解陪跑申請流程
            </button>
          </div>
        </section>

        {/* System 1: Acquisition Section */}
        <AcquisitionSection />

        {/* Interactive Part */}
        <div id="assessment-anchor" className="pt-20">
          {!assessment ? (
            <div className="space-y-12">
               <div className="text-center max-w-2xl mx-auto">
                 <h2 className="text-3xl font-bold text-slate-900 mb-4">免費評估系統（AI）</h2>
                 <p className="text-slate-500 leading-relaxed">
                   這不是簡單的填表。我們背後的 AI 模型會對標最新政策邏輯，為您提供客觀的評估分析。
                 </p>
               </div>
               <AssessmentForm onSubmit={handleAssessment} isLoading={isLoading} />
            </div>
          ) : (
            <div className="space-y-8 scroll-mt-20">
              <div id="results-header" className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">您的專屬診斷報告</h2>
                <button 
                  onClick={() => {setAssessment(null); setRoadmap(null);}} 
                  className="text-blue-600 text-sm font-bold flex items-center hover:underline"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 8.959 8.959 0 01-9 9m9-9H3" /></svg>
                  重新測評
                </button>
              </div>
              <ResultDashboard 
                result={assessment} 
                roadmap={roadmap || undefined}
                onUpgrade={startPayment}
              />
              
              {/* System 3 Loading State Overlay */}
              {isRoadmapLoading && (
                 <div className="fixed inset-0 bg-slate-900 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-[100]">
                    <div className="bg-white p-10 rounded-[2.5rem] text-center space-y-6 max-w-md shadow-2xl border border-white/20">
                       <div className="relative">
                          <div className={`w-20 h-20 border-4 ${roadmapStage === 'ai' ? 'border-blue-600' : 'border-green-600'} border-t-transparent rounded-full animate-spin mx-auto transition-colors duration-500`}></div>
                          {roadmapStage === 'expert' && (
                            <div className="absolute inset-0 flex items-center justify-center animate-pulse text-green-600 font-black text-xs uppercase">Expert</div>
                          )}
                       </div>
                       
                       <div className="space-y-2">
                          <h4 className="text-2xl font-black text-slate-800">
                             {roadmapStage === 'ai' ? '策略設計系統：正在匹配政策...' : '資深顧問識別風險點...'}
                          </h4>
                          <p className="text-slate-500 font-medium">
                             {roadmapStage === 'ai' 
                               ? 'AI 正從 15,000+ 條政策細則中尋找最優路徑' 
                               : '專家正在審閱您的 7 年規劃，優化關鍵細節'}
                          </p>
                       </div>

                       <div className="flex justify-center space-x-2">
                          <div className={`h-1.5 w-16 rounded-full ${roadmapStage === 'ai' ? 'bg-blue-600 animate-pulse' : 'bg-blue-200'} transition-all`}></div>
                          <div className={`h-1.5 w-16 rounded-full ${roadmapStage === 'expert' ? 'bg-green-600 animate-pulse' : 'bg-slate-200'} transition-all`}></div>
                       </div>
                    </div>
                 </div>
              )}
            </div>
          )}
        </div>

        {/* System 4 Consulting CTA */}
        <section className="mt-32 text-center">
          <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 text-8xl font-black opacity-[0.03] select-none">SYSTEM 4</div>
            <h2 className="text-3xl font-bold mb-4 relative z-10">陪跑顧問系統 (真人專家一對一 + AI)</h2>
            <p className="text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed relative z-10">
              策略圖只是開始。在接下來的 7 年中，我們的資深顧問專家將帶領 AI 助手為您提供陪伴式服務，在每一次簽證續簽、生活抵港、永久居民申請的關鍵節點，為您提供專業的建議與規劃支持。
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 relative z-10">
               <div className="flex items-center space-x-4">
                  <div className="text-left">
                    <div className="text-sm text-slate-400 font-bold uppercase tracking-widest">服務狀態</div>
                    <div className="text-3xl font-black text-slate-900">全程陪伴</div>
                  </div>
               </div>
               <div className="h-10 w-[1px] bg-slate-200 hidden md:block"></div>
               <div className="flex items-center space-x-4">
                  <div className="text-left">
                    <div className="text-sm text-slate-400 font-bold uppercase tracking-widest">年服務席位</div>
                    <div className="text-3xl font-black text-slate-900">僅限 50 名</div>
                  </div>
               </div>
               <div className="h-10 w-[1px] bg-slate-200 hidden md:block"></div>
               <button 
                onClick={() => setShowApplyModal(true)}
                className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95 group"
               >
                 立即申請預約陪跑
                 <svg className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
               </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-32 border-t border-slate-200 py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-lg">HK</div>
              <span className="font-bold text-lg tracking-tight text-slate-800">Path AI</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs">
              我們致力於通過技術與專業，幫助精英人才找到穩健的香港發展路徑。
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">核心系統</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-600">理性決策支持</a></li>
              <li><a href="#" className="hover:text-blue-600">免費評估系統</a></li>
              <li><a href="#" className="hover:text-blue-600">策略設計系統</a></li>
              <li><a href="#" className="hover:text-blue-600">陪跑顧問系統</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">聯繫我們</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>微信：HK_Path_Expert</li>
              <li>小紅書：香港身份清醒指南</li>
              <li>郵箱：daoandsophia@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs">
          <div>© 2026 HK Path AI. 所有權利保留。</div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#">免責聲明</a>
            <a href="#">隱私政策</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
