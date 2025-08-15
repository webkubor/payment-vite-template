// 全局类型声明
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    __APP_VERSION__?: string;
  }
}

export {};
