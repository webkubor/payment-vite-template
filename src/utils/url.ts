
export const isAndroid = /android/i.test(navigator.userAgent);
export const isIOS = /iphone|ipod|ipad/i.test(navigator.userAgent);

type BrowserType = 
  | 'Safari'
  | 'Chrome' 
  | 'WeChat'
  | 'IE'
  | 'Opera'
  | 'Edge'
  | 'Firefox'
  | 'Unknown';

export function myBrowser(): BrowserType {
  const userAgent = navigator.userAgent;
  const isSafari = /^(?=.*safari)(?!.*chrome|.*crios|.*android)/i.test(userAgent);
  if (isSafari) return "Safari";
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("MicroMessenger")) return "WeChat";
  if (userAgent.includes("Trident") || userAgent.includes("MSIE")) return "IE";
  if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
  if (userAgent.includes("Edg")) return "Edge";
  if (userAgent.includes("Firefox")) return "Firefox";
  return "Unknown";
}

interface Route {
  redirectedFrom?: {
    fullPath: string;
  };
  meta?: {
    from: string;
  };
}



export function getPreviousPageUrl(route: Route): string {
  const routerFrom = route?.redirectedFrom?.fullPath || route?.meta?.from || null;
  return routerFrom || document.referrer || "";
}

export function openUrl(url: string, type: string = "_blank"): void {
  if (myBrowser() === "Safari") {
    window.location.href = url;
    return;
  }
  createAndClickLink(url, type);
}

export function createAndClickLink(url: string, target: string = "_self"): void {
  const link = document.createElement("a");
  link.href = url;
  link.target = target;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


export function navigateTo(relativePath: string, text = '检测当前环境是测试,当前的页面即将跳转,是否继续'): void {
  const { origin } = window.location;
  const newUrl = `${origin}#${relativePath}`;
  if (import.meta.env.PROD) {
    window.location.href = newUrl;
  } else {
    if (window.confirm(text)) {
      window.location.href = newUrl;
    }
  }
}


export function getCountryFromUrl(defaultCountry = 'bd'): string {
  try {
    // 获取当前页面 URL
    const url = new URL(window.location.href);

    // 正则表达式匹配路径中的国家代码（两位字母）
    const regex = /\/([a-zA-Z]{2})\//;
    const match = regex.exec(url.pathname + url.hash);
    // 如果匹配成功，返回小写国家代码，否则返回默认值
    return match ? match[1].toLowerCase() : defaultCountry;
  } catch (error) {
    console.error('Error parsing URL:', error);
    return defaultCountry; // 返回默认国家代码
  }
}



/**
 * 📌 检测 URL 是否携带指定参数
 * @param {string} url - URL 地址
 * @param {string} param - 要检测的参数名
 * @returns {string|null} - 如果携带该参数，返回参数值；否则返回 null
 */
export const getQueryParam = (url, param) => {
  const urlObj = new URL(url); // 创建 URL 对象
  const params = new URLSearchParams(urlObj.search); // 获取查询参数

  // 检查参数是否存在并返回其值
  return params.has(param) ? params.get(param) : null;
};

/**
 * 从 URL 中获取参数，同时支持从 URL 的查询字符串和 hash 部分获取
 * @param {string} param - 要获取的参数名
 * @returns {string|null} - 如果找到参数，返回参数值；否则返回 null
 */
export const getParamFromUrlOrHash = (param: string): string | null => {
  try {
    const url = new URL(window.location.href);
    
    // 首先检查 URL 的查询字符串部分
    const urlParams = new URLSearchParams(url.search);
    if (urlParams.has(param)) {
      return urlParams.get(param);
    }
    
    // 如果查询字符串中没有，检查 hash 部分
    if (url.hash) {
      // 处理 hash 中的参数，可能使用 ? 或 & 分隔
      const hashParts = url.hash.split('?');
      
      // 如果 hash 中有参数
      if (hashParts.length > 1) {
        for (let i = 1; i < hashParts.length; i++) {
          // 检查是否直接以 param= 开头
          const paramPrefix = `${param}=`;
          if (hashParts[i].startsWith(paramPrefix)) {
            const endIndex = hashParts[i].indexOf('&');
            return endIndex !== -1 ? 
              hashParts[i].substring(paramPrefix.length, endIndex) : 
              hashParts[i].substring(paramPrefix.length);
          }
          
          // 检查是否包含 &param=
          const paramInfix = `&${param}=`;
          const paramIndex = hashParts[i].indexOf(paramInfix);
          if (paramIndex !== -1) {
            const startIndex = paramIndex + paramInfix.length;
            const endIndex = hashParts[i].indexOf('&', startIndex);
            return endIndex !== -1 ? 
              hashParts[i].substring(startIndex, endIndex) : 
              hashParts[i].substring(startIndex);
          }
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error in getParamFromUrlOrHash:', error);
    return null;
  }
};


export function jugeUrl(url: string): boolean {
  const urlRegex = /^https?:\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*)?$/;
  return urlRegex.test(url);
}

export function getHostname(): string {
  const currentUrl = window.location.href;
  return new URL(currentUrl).hostname;
}

export function getTopLevelDomain(url: string): string | null {
  try {
    const hostname = new URL(url).hostname;
    const domainParts = hostname.split('.').reverse();
    return domainParts.slice(0, 2).reverse().join('.');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Failed to extract top-level domain from URL "${url}": ${error.message}`);
    } else {
      console.error(`Failed to extract top-level domain from URL "${url}"`);
    }
    return null;
  }
}

export function getBaseApiUrl(): string {
  let baseURL = '';
  if (import.meta.env.PROD) {
    const currentDomain = getHostname();
    const protocol = window.location.protocol;
    baseURL = `${protocol}//${currentDomain}/api`;
  } else {
    baseURL = `${import.meta.env.VITE_BASE_URL}/api`;
  }
  baseURL.endsWith('/') && baseURL.slice(0, -1);
  console.log(baseURL, 'getBaseApiUrl')
  return baseURL;
}

export function setFavicon(emojiUnicode: string): void {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('无法获取canvas的2D上下文。');
    return;
  }
  ctx.font = '64px serif';
  ctx.fillText(emojiUnicode, 0, 64);

  const faviconLink = (document.querySelector("link[rel*='icon']") || 
    document.createElement('link')) as HTMLLinkElement;
  faviconLink.rel = 'shortcut icon';
  faviconLink.href = canvas.toDataURL();
  document.getElementsByTagName('head')[0].appendChild(faviconLink);
}

export function extractMainDomain(): string {
  let mainDomain = '';
  try {
    const parsedUrl = new URL(window.location.href);
    const parts = parsedUrl.hostname.split('.');
    const len = parts.length;
    if (len >= 2) {
      if (parts[len - 2] === 'www') {
        mainDomain = parts[len - 3];
      } else {
        mainDomain = parts[len - 2];
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Invalid URL:', error.message);
    } else {
      console.error('Invalid URL');
    }
  }

  if (!mainDomain) {
    mainDomain = 'larkpay';
  }
  return mainDomain;
}

export function isBase64(str: string): boolean {
  try {
    return btoa(atob(str)) === str;
  } catch (error) {
    return false;
  }
}
