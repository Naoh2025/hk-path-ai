
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { AssessmentResult, StrategyRoadmap } from '../types';

interface Props {
  result: AssessmentResult;
  roadmap?: StrategyRoadmap;
  onUpgrade: () => void;
}

export const ResultDashboard: React.FC<Props> = ({ result, roadmap, onUpgrade }) => {
  const chartData = [
    { subject: '留學路徑匹配', A: result.suitability.study, fullMark: 100 },
    { subject: '高才通匹配', A: result.suitability.ttps, fullMark: 100 },
    { subject: '優才計劃匹配', A: result.suitability.qmas, fullMark: 100 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Radar Chart */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-md border border-slate-100 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4 text-slate-800">AI 診斷結果</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar
                  name="Suitability"
                  dataKey="A"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm text-slate-500">背景綜合評估</span>
            <div className="text-2xl font-black text-blue-600 mt-1 uppercase tracking-widest">{result.score}</div>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-md border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-slate-800">AI 專家深度診斷</h3>
            <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-tighter">Diagnostic Report</span>
          </div>
          <p className="text-slate-600 leading-relaxed mb-6 whitespace-pre-wrap italic">"{result.analysis}"</p>
          
          <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-900 mb-2">建議關注路徑：{result.recommendedPath}</h4>
            <ul className="list-disc list-inside text-blue-800 space-y-1 text-sm">
              {result.nextSteps.map((step, i) => <li key={i}>{step}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* System 3 Roadmap Section */}
      {roadmap ? (
        <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden border border-slate-800">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-3 rounded-2xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight">您的：7 年策略設計報告</h3>
                <p className="text-slate-400 text-sm flex items-center mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  AI 匹配 + 審核已完成
                </p>
              </div>
            </div>
            <div className="flex items-center bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700">
              <span className="text-xs font-bold text-slate-400 mr-3">報告狀態</span>
              <span className="text-xs font-black text-blue-400 uppercase">Expert Verified</span>
            </div>
          </div>

          <div className="mb-10 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
             <div className="text-blue-400 font-bold mb-2 text-sm uppercase">核心策略邏輯</div>
             <p className="text-slate-200 leading-relaxed italic">"{roadmap.summary}"</p>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {roadmap.milestones.map((m, i) => (
              <div key={i} className="group relative bg-slate-800/50 p-6 rounded-3xl border border-slate-700 hover:border-blue-500/50 transition-all">
                <div className="absolute -top-3 left-6 bg-blue-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">{m.timeframe}</div>
                <div className="text-lg font-bold mb-3 mt-2 group-hover:text-blue-400 transition-colors">{m.title}</div>
                <div className="text-slate-400 text-sm leading-relaxed">{m.description}</div>
              </div>
              
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-orange-400 mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <h4 className="font-black uppercase tracking-wider text-sm">顧問特別強調的風險點</h4>
              </div>
              <ul className="space-y-3">
                {roadmap.risks.map((r, i) => (
                  <li key={i} className="flex items-start text-slate-400 text-sm">
                    <span className="text-orange-500 mr-2">!</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-green-400 mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                <h4 className="font-black uppercase tracking-wider text-sm">顧問建議 (增加與港連繫)</h4>
              </div>
              <ul className="space-y-3">
                {roadmap.tips.map((t, i) => (
                  <li key={i} className="flex items-start text-slate-400 text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Watermark/Background Decoration */}
          <div className="absolute bottom-0 right-0 p-8 opacity-5 select-none pointer-events-none text-8xl font-black">7 YEARS</div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 p-12 rounded-[3rem] text-white text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h3 className="text-3xl md:text-4xl font-black leading-tight">解鎖系統 3：<br/>由資深顧問審閱的 7 年策略設計</h3>
            <p className="text-blue-100 text-lg opacity-90 leading-relaxed">
              AI 已為您完成相關政策匹配。現在將為您識別風險路徑、調整表述，並輸出最終的長線策略圖。
            </p>
            <div className="grid grid-cols-2 gap-4 py-4 text-left">
               <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                  <div className="text-xs font-bold text-blue-300 uppercase">AI 負責</div>
                  <div className="text-sm font-bold">政策匹配 & 路徑草擬</div>
               </div>
               <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                  <div className="text-xs font-bold text-blue-300 uppercase">專家負責</div>
                  <div className="text-sm font-bold">風險識別 & 方案細化</div>
               </div>
            </div>
            <button 
              onClick={onUpgrade}
              className="bg-white text-blue-900 px-12 py-5 rounded-2xl font-black text-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
            >
              獲取專屬策略報告
            </button>
            <p className="text-xs text-blue-300 font-medium">一次性策略設計費用：¥999 (原價 ¥1999)</p>
          </div>
        </div>
      )}
    </div>
  );
};
