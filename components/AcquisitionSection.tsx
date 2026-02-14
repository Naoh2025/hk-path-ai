
import React from 'react';

export const AcquisitionSection: React.FC = () => {
  const contentPillars = [
    {
      title: "誰不適合走香港路線",
      desc: "大膽勸退背景不匹配的申請人，建立「清醒」的專家形象。",
      tag: "清醒信任",
      icon: "🚫"
    },
    {
      title: "拆解真實誤判",
      desc: "深度分析市面上常見的「包過」陷阱與政策誤讀。",
      tag: "避坑指南",
      icon: "🔍"
    },
    {
      title: "勸退案例分享",
      desc: "分享真實的匿名勸退故事，讓客戶看見顧問的專業操守。",
      tag: "真實專業",
      icon: "📝"
    }
  ];

  return (
    <section className="mb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 space-y-4 md:space-y-0">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center">
            <span className="w-2 h-8 bg-blue-600 rounded-full mr-4"></span>
            理性決策支持系統：我們不試圖說服你。
          </h2>
          <p className="text-slate-500 leading-relaxed">
            只提供清楚的資訊與客觀的分析，幫你判斷這條路是否真的適合自己。<br />
            選擇繼續的人更篤定，選擇停下的人，也能及早避開不必要的彎路。
          </p>
        </div>
        <div className="flex space-x-3">
          {['小紅書', '知乎', '微信'].map(platform => (
            <span key={platform} className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-bold border border-slate-200">
              {platform}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contentPillars.map((pillar, i) => (
          <div key={i} className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="text-4xl mb-4">{pillar.icon}</div>
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-md mb-3">
              {pillar.tag}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{pillar.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {pillar.desc}
            </p>
            <div className="mt-6 flex items-center text-blue-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              查看案例內容 <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-blue-900 rounded-3xl p-1 flex flex-col md:flex-row items-center overflow-hidden">
        
        
      </div>
    </section>
  );
};
