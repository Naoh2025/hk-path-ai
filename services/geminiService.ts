import { UserProfile, AssessmentResult, StrategyRoadmap } from "../types";

// 使用你在 vite.config.ts 定義的環境變數
const API_KEY = process.env.DEEPSEEK_API_KEY;
const API_URL = "https://api.deepseek.com/chat/completions";

/**
 * 封裝 DeepSeek API 呼叫工具
 */
async function callDeepSeek(prompt: string) {
  if (!API_KEY) {
    throw new Error("DeepSeek API Key is missing. Please check your .env.local file.");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "deepseek-chat", // 或是 "deepseek-reasoner" 如果你需要更強的邏輯
      messages: [
        { role: "system", content: "You are a professional assistant that always outputs valid JSON." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" } // 強制 DeepSeek 輸出 JSON
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`DeepSeek API Error: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

export const getFreeAssessment = async (profile: UserProfile): Promise<AssessmentResult> => {
  const prompt = `你是一位極度專業且毒舌的香港身份規劃顧問。你的風格是「清醒、真實、直擊要害」。
  請基於以下【全維度資料】進行診斷，並嚴格遵守 JSON 格式回傳。
  
  資料內容：
  - 稱呼: ${profile.name} | 性別: ${profile.gender} | 年齡: ${profile.age}
  - 學歷: ${profile.education} | 院校: ${profile.university} | 專業: ${profile.major}
  - 準則對標: 合資格大學學位(${profile.isQualifiedUni ? '是' : '否'}), STEM學科(${profile.isStem ? '是' : '否'})
  - 行業: ${profile.industry} | 總體經驗: ${profile.workExp}
  - 去年收入: ${profile.lastYearIncomeHKD} HKD
  - 語言: ${profile.languages}

  診斷要求：
  1. 嚴格對標最新的自2024年11月1日起所適用的香港「優秀人才入境計劃」甄選機制（即12項符合6項）根據其選擇的「綜合計分制」或「成就計分制」進行評核與「高才通」最新標準。
  2. 綜合評估術語選擇：【極具優勢】、【背景良好】、【具備潛力】、【需大幅優化】、【有風險】、【風險極高】。
  3. 針對「去年收入」點出高才 A 類在證明文件(稅單/審計報告)上的真實難點。
  4. 分析中必須包含對其「職業可持續性(續簽難易度)」的客觀預判。
  5. 風格保持冷靜、清醒，針對明顯不合適的申請人直接「勸退」。
  6. 全文請使用【簡體中文】書寫，術語需符合內地閱讀習慣（例如：使用“學歷認證”、“社保”等詞彙）。
  7. 評估「進修轉身」可能性：
   - 即使目前職涯背景一般或收入不足，若客戶擁有學位、良好的語言基礎（如 IELTS 6.5以上）且有辦理預算（30萬 HKD 以上），可以建議其通過「香港碩士留學（進修）」獲得身份的潛力。
   - 在分析中，「留學路徑」視為一種主動提升背景的策略，而非僅僅看目前的優才/高才分數。
  回饋格式 JSON 範例：
  {
    "score": "背景良好",
    "suitability": { "study": 80, "ttps": 60, "qmas": 45 },
    "analysis": "具體分析文字...",
    "recommendedPath": "最推薦的路徑",
    "nextSteps": ["建議1", "建議2", "建議3"]
  }`;

  return await callDeepSeek(prompt);
};

export const generateStrategyRoadmap = async (profile: UserProfile, assessment: AssessmentResult): Promise<StrategyRoadmap> => {
  const prompt = `你現在是【策略設計系統】的 AI 核心，正在生成 7 年身份規劃報告。
  用戶背景摘要：
  - 推薦路徑: ${assessment.recommendedPath}
  - 財務能力: ${profile.lastYearIncomeHKD} HKD 收入
  - 職業背景: ${profile.industry}
  任務：生成一份極其具體的 7 年策略圖，包含續簽、稅務、強積金、子女教育銜接建议。
  1. 特別說明如何利用其現有優勢增加與香港的連繫。
  2. 全文請使用【簡體中文】，並將香港術語（如：MPF強積金、受養人）在括號中註明內地對應概念。
  3. 內容務必專業、清晰，適合直接展示給內地高端客戶。
  4. 全文使用【簡體中文】。
  回饋格式 JSON 範例：
  {
    "summary": "總體概述內容...",
    "milestones": [
      { "title": "階段標題", "timeframe": "第1年", "description": "具體描述", "status": "active" }
    ],
    "risks": ["風險點1", "風險點2"],
    "tips": ["專業建議1", "專業建議2"]
  
  }`;

  return await callDeepSeek(prompt);
};
