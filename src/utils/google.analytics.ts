// google.analytics.ts
export enum EventAction {
    REDIRECT_RESULT = 'redirect_result',
    FOLLOW_SCREEN = 'follow_screen',
    FOllOW_BACK = 'Follow_Payment_Back',
  }
  
  // 加载 GA4 gtag 脚本
  export function loadGtagScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).gtag) {
        resolve();
        return;
      }
  
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
      script.async = true;
      document.head.appendChild(script);
  
      script.onload = () => {
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
        (window as any).gtag = gtag;
  
        gtag('js', new Date());
        gtag('config', 'G-M4LBM86Y38', {
          app_version: (window as any).__APP_VERSION__,
        });
  
        console.log('✅ Google Analytics 加载成功');
        resolve();
      };
  
      script.onerror = () => {
        console.warn('❌ Google Analytics 加载失败');
        reject();
      };
    });
  }
  
  // 通用事件埋点
  export function trackEvent({
    category,
    action,
    label,
    value,
    dimensions = {},
  }: {
    category: string;
    action: string;
    label: string;
    value?: number;
    dimensions?: Record<string, any>;
  }) {
    try {
      if ((window as any).gtag) {
        const eventData = {
          event_category: category,
          event_label: label,
          value,
          ...dimensions,
        };
        (window as any).gtag('event', action, eventData);
      } else {
        console.warn('gtag is not loaded');
      }
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }
  
// 页面停留心跳 + 离开事件（纯 gtag）
export function trackPageView({
    country,
    ui_version,
    page_name,
    heartbeatIntervalMs = 15000,
  }: {
    country: string;
    ui_version: string;
    page_name: string;
    heartbeatIntervalMs?: number;
  }) {
    const startTime = Date.now();
  
    // 心跳事件（可选）
    const heartbeatInterval = setInterval(() => {
      const duration_ms = Date.now() - startTime;
      if ((window as any).gtag) {
        (window as any).gtag('event', 'page_heartbeat', {
          engagement_time_msec: duration_ms, // 内置指标
          country,
          ui_version,
          page_name,
        });
      }
      console.log('Heartbeat:', { country, ui_version, page_name, duration_ms });
    }, heartbeatIntervalMs);
  
    console.log('✅ Google Analytics 页面停留心跳 + 离开事件', heartbeatIntervalMs);
  
    // 页面离开事件，上报 engagement_time_msec
    window.addEventListener('beforeunload', () => {
      clearInterval(heartbeatInterval);
      const duration_ms = Date.now() - startTime;
  
      if ((window as any).gtag) {
        (window as any).gtag('event', 'page_view_end', {
          engagement_time_msec: duration_ms, // 内置指标
          country,
          ui_version,
          page_name,
        });
      }
  
      console.log('Page view end:', { country, ui_version, page_name, duration_ms });
    });
  }
  
  // 按钮点击埋点
  export function trackBtnAction({
    name,
    country,
    page,
    dimensions = {},
  }: {
    name: string;
    country: string;
    page: string;
    dimensions?: Record<string, any>;
  }) {
    trackEvent({
      category: `${country}_${name}`,
      action: name,
      label: page,
      dimensions: { country, ...dimensions },
    });
  }
  
  // 导航成功埋点
  export function trackNavigation(country: string, router: string, Desc: string) {
    trackEvent({
      category: `${country}_Navigation`,
      action: `${country}_${EventAction.REDIRECT_RESULT}`,
      label: router,
      dimensions: { description: Desc },
    });
  }
  
  // 返回商家按钮埋点
  export function trackBackMerchant(country: string, tag: string) {
    trackEvent({
      category: `${country}`,
      action: `${country}_${EventAction.FOllOW_BACK}`,
      label: tag,
    });
  }
  
  // 屏幕信息埋点
  function getScreenSize() {
    return {
      width: window.screen.width,
      height: window.screen.height,
    };
  }
  
  export function trackFllowScreen(country: string) {
    const screenSize = getScreenSize();
    console.log('screen dpi:' + window.devicePixelRatio, `${screenSize.width}x${screenSize.height}`);
    if ((window as any).gtag) {
      (window as any).gtag('event', `${country}_${EventAction.FOLLOW_SCREEN}`, {
        event_category: 'screen',
        event_label: `${screenSize.width}x${screenSize.height}`,
        value: window.devicePixelRatio,
      });
    }
  }