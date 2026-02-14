
import React, { useState } from 'react';
import { UserProfile, EducationLevel, WorkExperience } from '../types';

interface Props {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

export const AssessmentForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '匿名精英',
    gender: '男',
    age: 28,
    location: '',
    education: EducationLevel.BACHELOR,
    university: '',
    major: '',
    isQualifiedUni: false,
    isStem: false,
    industry: '',
    workExp: WorkExperience.THREE_TO_FIVE,
    degreeLevelWorkYears: 0,
    mncWorkYears: 0,
    specificSectorWorkYears: 0,
    intlWorkYears: 0,
    hasFortune500Exp: false,
    lastYearIncomeHKD: 0,
    ownsBusiness: false,
    businessProfitHKD: 0,
    ownsListedCo: false,
    budget: '30-50萬',
    languages: '',
    isBilingual: false,
    englishLevel: '',
    isEnglishFluent: false,
    hasDependents: false,
    additionalInfo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  const SectionHeader = ({ title, icon }: { title: string, icon: string }) => (
    <div className="flex items-center space-x-3 mt-12 mb-6 pb-2 border-b border-slate-100">
      <span className="text-xl">{icon}</span>
      <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{title}</h3>
    </div>
  );

  // 統一輸入框樣式
  const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-slate-300 transition-all text-slate-700";

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="p-8 md:p-12 bg-white rounded-[3rem] shadow-2xl border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none text-9xl font-black">ASSESS</div>

        {/* 1. 個人與學歷 */}
        <SectionHeader title="基礎畫像與學歷背景" icon="🎓" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <label className="block text-sm font-bold text-slate-600 mb-2">暱稱/稱呼</label>
            <input type="text" className={inputClass} value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">性別</label>
            <select className={inputClass} value={profile.gender} onChange={e => setProfile({...profile, gender: e.target.value})}>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">目前年齡</label>
            <input type="number" className={inputClass} value={profile.age} onChange={e => setProfile({...profile, age: parseInt(e.target.value) || 0})} />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">所在地</label>
            <input type="text" placeholder="城市/國家" className={inputClass} value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">最高學歷</label>
            <select className={inputClass} value={profile.education} onChange={e => setProfile({...profile, education: e.target.value as EducationLevel})}>
              {Object.values(EducationLevel).map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">畢業院校</label>
            <input type="text" placeholder="完整校名" className={inputClass} value={profile.university} onChange={e => setProfile({...profile, university: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">就讀專業</label>
            <input type="text" placeholder="例如：計算機科學" className={inputClass} value={profile.major} onChange={e => setProfile({...profile, major: e.target.value})} />
          </div>
          <div className="flex items-center space-x-4">
             <label className="flex-1 flex items-center p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                <input type="checkbox" className="w-4 h-4 text-slate-400 rounded mr-2" checked={profile.isQualifiedUni} onChange={e => setProfile({...profile, isQualifiedUni: e.target.checked})} />
                <span className="text-xs font-bold text-slate-600">合資格大學學位</span>
             </label>
             <label className="flex-1 flex items-center p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                <input type="checkbox" className="w-4 h-4 text-slate-400 rounded mr-2" checked={profile.isStem} onChange={e => setProfile({...profile, isStem: e.target.checked})} />
                <span className="text-xs font-bold text-slate-600">STEM 學科背景</span>
             </label>
          </div>
        </div>

        {/* 2. 職業經驗 */}
        <SectionHeader title="專業經驗與名企背景" icon="💼" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">所屬行業</label>
            <input type="text" placeholder="例如：金融、科技、醫療" className={inputClass} value={profile.industry} onChange={e => setProfile({...profile, industry: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">累計工作經驗</label>
            <select className={inputClass} value={profile.workExp} onChange={e => setProfile({...profile, workExp: e.target.value as WorkExperience})}>
              {Object.values(WorkExperience).map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">學位程度年資</label>
            <input type="number" className={inputClass} value={profile.degreeLevelWorkYears} onChange={e => setProfile({...profile, degreeLevelWorkYears: parseInt(e.target.value) || 0})} />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">名企工作年資</label>
            <input type="number" className={inputClass} value={profile.mncWorkYears} onChange={e => setProfile({...profile, mncWorkYears: parseInt(e.target.value) || 0})} />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">特定領域年資</label>
            <input type="number" className={inputClass} value={profile.specificSectorWorkYears} onChange={e => setProfile({...profile, specificSectorWorkYears: parseInt(e.target.value) || 0})} />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">國際工作年資</label>
            <input type="number" className={inputClass} value={profile.intlWorkYears} onChange={e => setProfile({...profile, intlWorkYears: parseInt(e.target.value) || 0})} />
          </div>
        </div>

        {/* 3. 財務狀況 */}
        <SectionHeader title="財務狀況與業務實體" icon="💰" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group">
            <label className="block text-sm font-bold text-slate-600 mb-2">
              去年總收入 (HKD)
              <span className="ml-2 text-xs text-blue-500 font-medium">包含股權利潤分成</span>
            </label>
            <input type="number" placeholder="目標100萬+ 對標政策" className={inputClass} value={profile.lastYearIncomeHKD} onChange={e => setProfile({...profile, lastYearIncomeHKD: parseInt(e.target.value) || 0})} />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">辦理預算 (CNY/HKD)</label>
            <input type="text" placeholder="例如：30-50萬" className={inputClass} value={profile.budget} onChange={e => setProfile({...profile, budget: e.target.value})} />
          </div>
        </div>
        <div className="space-y-4 mt-6">
          <label className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
            <input type="checkbox" className="w-5 h-5 text-slate-400 rounded mr-3" checked={profile.ownsBusiness} onChange={e => setProfile({...profile, ownsBusiness: e.target.checked})} />
            <span className="text-sm font-bold text-slate-700">目前擁有業務實體（企業主）</span>
          </label>
          {profile.ownsBusiness && (
            <div className="pl-10 animate-fade-in">
               <label className="block text-xs font-bold text-blue-600 mb-1">業務實體全年盈利 (HKD)</label>
               <input type="number" placeholder="目標500萬+" className={inputClass.replace('bg-slate-50', 'bg-blue-50/50').replace('border-slate-200', 'border-blue-100')} value={profile.businessProfitHKD} onChange={e => setProfile({...profile, businessProfitHKD: parseInt(e.target.value) || 0})} />
            </div>
          )}
          <label className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
            <input type="checkbox" className="w-5 h-5 text-slate-400 rounded mr-3" checked={profile.ownsListedCo} onChange={e => setProfile({...profile, ownsListedCo: e.target.checked})} />
            <span className="text-sm font-bold text-slate-700">擁有一家上市公司</span>
          </label>
        </div>

        {/* 4. 語言能力 */}
        <SectionHeader title="語言與綜合背景" icon="🌐" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">擅長語言</label>
              <input type="text" placeholder="例如：粵語、法語" className={inputClass} value={profile.languages} onChange={e => setProfile({...profile, languages: e.target.value})} />
           </div>
           <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">英語水平/證書</label>
              <input type="text" placeholder="例如：IELTS 7.5" className={inputClass} value={profile.englishLevel} onChange={e => setProfile({...profile, englishLevel: e.target.value})} />
           </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
           <label className="flex items-center p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
              <input type="checkbox" className="w-4 h-4 text-slate-400 rounded mr-2" checked={profile.isBilingual} onChange={e => setProfile({...profile, isBilingual: e.target.checked})} />
              <span className="text-xs font-bold text-slate-700">精通兩門或以上語言</span>
           </label>
           <label className="flex items-center p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
              <input type="checkbox" className="w-4 h-4 text-slate-400 rounded mr-2" checked={profile.isEnglishFluent} onChange={e => setProfile({...profile, isEnglishFluent: e.target.checked})} />
              <span className="text-xs font-bold text-slate-700">良好的英文書寫/口語</span>
           </label>
           <label className="flex items-center p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
              <input type="checkbox" className="w-4 h-4 text-slate-400 rounded mr-2" checked={profile.hasDependents} onChange={e => setProfile({...profile, hasDependents: e.target.checked})} />
              <span className="text-xs font-bold text-slate-700">攜帶受養人(配偶/子女)</span>
           </label>
        </div>

        <div className="mt-8">
           <label className="block text-sm font-bold text-slate-600 mb-2">其他背景補充（獲獎、專利、特殊技能）</label>
           <textarea rows={3} className={`${inputClass} resize-none`} value={profile.additionalInfo} onChange={e => setProfile({...profile, additionalInfo: e.target.value})} />
        </div>

        <div className="mt-12">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-5 rounded-2xl font-black text-xl text-white transition-all shadow-xl shadow-blue-200/50 ${
              isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                正在深度分析與診斷...
              </span>
            ) : '獲取專家級診斷報告'}
          </button>
        </div>
      </form>
    </div>
  );
};
