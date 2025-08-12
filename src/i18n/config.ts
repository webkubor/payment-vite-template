
import {getCountryFromUrl, getParamFromUrlOrHash} from "@/utils/url"

// 新增巴基斯坦的乌尔都语言包
export const langList = [
  { label: "Bengali", code: "bn", value: "bn-BD", countryCode: "bd" },
  { label: "English", code: "en", value: "en-US", countryCode: "us" },
  { label: "Swahili", code: "sw", value: "sw-KE", countryCode: "ke" },
  { label: "Vietnam", code: "vi", value: "vi-VN", countryCode: "vn" },
  { label: "Portuguese", code: "pt", value: "pt-BR", countryCode: "br" },
  { label: "Indonesian", code: "id", value: "id-ID", countryCode: "id" },
  { label: "Spanish (Mexico)", code: "es", value: "es-MX", countryCode: "mx" },
  { label: "Hindi", code: "hi", value: "hi-IN", countryCode: "in" },
  { label: "Thai", code: "th", value: "th-TH", countryCode: "th" },
  { label: "Malay", code: "ms", value: "ms-MY", countryCode: "my" },
  { label: "Korean", code: "ko", value: "ko-KR", countryCode: "kr" },
];

/**
 * 获取语言选项
 * @param {string} defaultCode 默认语言代码，默认值为 'en'
 * @returns {Array} 匹配的语言选项
 */
export function getLangOptions() {
  const country = getCountryFromUrl();
  return langList.filter(
    (item) => item.countryCode === country || item.countryCode === 'us'
  );
}



/**
 * @description: 初始化语言，检测语言语种, 查看是否当前的收银台国家语料库是否支持
 * @returns {string} 初始化后的语言代码
 */
export function getLocalLang(): string {
  try {
    const langSet = getParamFromUrlOrHash('followBrowser');
    if (langSet) {
      return getBrowserLang();
    } else {
      let country = getCountryFromUrl();
      const matchedLang = langList.find(item => item.countryCode === country);
      if (matchedLang) {
        console.log('Using local language setting', matchedLang.value);
        return matchedLang.value;
      } else {
        console.log('No matching language found for country', country, 'using default en-US');
        return "en-US";
      }
    }
  } catch (error) {
    console.error('Error in getLocalLang:', error);
    return "en-US"; // 出错时返回默认语言
  }
}


export function getTargetLang(): string {
   // 使用工具函数从 URL 中获取 lang 参数
   const langParam = getParamFromUrlOrHash('lang');
    
   // 如果 URL 中有 lang 参数且它在支持的语言列表中，直接返回该值
   if (langParam && Object.keys(localesConfigs).includes(langParam)) {
     console.log('getLocalLang from URL', langParam);
     return langParam;
   }
   
   // 如果没有匹配到，返回默认语言
   return "en-US";
}

export function getBrowserLang(): string {
  // 如果URL中没有lang参数，使用浏览器语言
  const browserLang = navigator.language || "en"; // 默认值
     
  // 将浏览器语言转换为小写（处理浏览器返回的格式如 "en-US" 或 "en"）
  const lang = browserLang.toLowerCase();
 
  // 处理不同格式的浏览器语言，提取国家或地区代码
  const languageCode = lang.includes("-") ? lang.split("-")[0] : lang;
 
  const matchedLang = langList.find(item => item.code === languageCode);
  let country = getCountryFromUrl();
  let supportLanguageArr = [country, 'us'];
  if (matchedLang && supportLanguageArr.includes(matchedLang.countryCode)) {
    console.log('getLocalLang from browser', supportLanguageArr, matchedLang);
    return matchedLang.value; // 返回如 "en-US"
  } else {
    return "en-US"; // 如果没有匹配到，则返回默认语言
  }
 }