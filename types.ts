
export enum EducationLevel {
  BACHELOR = "本科",
  MASTER = "碩士",
  PHD = "博士",
  OTHER = "其他"
}

export enum WorkExperience {
  ZERO_TO_TWO = "0-2年",
  THREE_TO_FIVE = "3-5年",
  FIVE_TO_TEN = "5-10年",
  TEN_PLUS = "10年以上"
}

export interface UserProfile {
  // 基本與學歷
  name: string;
  gender: string;      // 新增性別
  age: number;
  location: string;
  education: EducationLevel;
  university: string; // 畢業院校
  major: string;      // 專業
  isQualifiedUni: boolean; // 是否為合資格大學
  isStem: boolean;        // 是否為 STEM 學科

  // 職業背景 (融合 WorkExperience 枚舉與精確年資)
  industry: string;
  workExp: WorkExperience; 
  degreeLevelWorkYears: number; // 學位程度經驗年資
  mncWorkYears: number;         // 名企/跨國公司經驗年資
  specificSectorWorkYears: number; // 特定領域(創科/金融等)年資
  intlWorkYears: number;        // 國際工作經驗年資
  hasFortune500Exp: boolean;    // 是否有500強背景 (快速勾選)

  // 財務與企業 (融合高才A類邏輯)
  lastYearIncomeHKD: number;    // 去年總收入 (含股權/利潤)
  ownsBusiness: boolean;        // 是否擁有企業
  businessProfitHKD: number;    // 企業年盈利
  ownsListedCo: boolean;        // 是否擁有上市公司
  budget: string;               // 辦理預算

  // 語言與受養人
  languages: string;            // 擅長語言描述
  isBilingual: boolean;         // 是否精通兩種語言
  englishLevel: string;         // 英語水平描述 (如 IELTS 分數)
  isEnglishFluent: boolean;     // 是否具備良好英文能力
  hasDependents: boolean;       // 是否攜帶受養人

  // 其他
  additionalInfo: string;       // 其他背景補充
}

export interface AssessmentResult {
  score: string; // 改為字符串，存儲模糊評估術語
  suitability: {
    study: number;
    ttps: number;
    qmas: number;
  };
  analysis: string;
  recommendedPath: string;
  nextSteps: string[];
}

export interface Milestone {
  title: string;
  timeframe: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
}

export interface StrategyRoadmap {
  summary: string;
  milestones: Milestone[];
  risks: string[];
  tips: string[];
}
