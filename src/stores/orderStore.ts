import { defineStore } from 'pinia';
import { reactive } from 'vue';
import * as OrderAction from '@/api/order';
import { getExpireSeconds } from '@/utils/time';
import { navigateTo } from '@/utils/url';

// 支付状态常量
export const showStatusKey = {
  /** 等待支付 */
  waiting: 1,
  /** 支付成功 */
  success: 2,
  /** 支付失败 */ 
  fail: 3,
  /** 支付超时 */
  timeout: 6,
   /** 锁ip用户 */
  block: 7,
  /** 部分成功 */
  partOfSuccess: 9
} as const

// 订单响应类型定义
export interface OrderResponse {
  amount: string;
  countryCode: string;
  payWayLogo: string;
  payCode: string | null;
  payUrl: string | null;
  channelCode: string;
  requestUrl: string;
  accountNumber: string;
  accountName: string;
  subject: string;
  body: string;
  logo: string;
  payWays: Record<string, any>;
  createTime: string;
  expireTime: string;
  id?: string;
  status?: string;
}

// 订单初始信息
const INIT_ORDER_INFO: OrderResponse = {
  amount: "0",
  countryCode: "",
  payWayLogo: '',
  payCode: null,
  payUrl: null,
  channelCode: "",
  requestUrl: '',
  accountNumber: '',
  accountName: '',
  subject: '',
  body: '',
  logo: "",
  payWays: {},
  createTime: '',
  expireTime: '',
};

export const useOrderStore = defineStore('order', () => {
  // 订单信息
  const order = reactive<OrderResponse>({...INIT_ORDER_INFO})
  
  // 全局配置状态（从 globalStore 迁移）
  const appConfig = reactive({
    timeDownSeconds: 0,
    waitingLoading: false,
    currency: '₩', // 韩元符号
  });
  
  // 返回商家页面
  const backToMerchant = () => {
    if (order && order.requestUrl) {
      window.location.href = String(order.requestUrl)
    } else {
      window.location.href = '/'
    }
  }

  // 获取订单信息
  const fetchOrder = async (orderId: string) => {
    appConfig.waitingLoading = true;
    
    try {
      const res = await OrderAction.fetchOrder(orderId);
      Object.assign(order, INIT_ORDER_INFO, res);
      appConfig.timeDownSeconds = getExpireSeconds(res.expiredTime);
      console.log(appConfig.timeDownSeconds,res.expiredTime, res)
      return res;
    } catch (error) {
      navigateTo('/result/' + orderId)
      throw error;
    } finally {
      appConfig.waitingLoading = false;
    }
  };

  return {
    order,
    fetchOrder,
    backToMerchant,
    appConfig,
    INIT_ORDER_INFO
  };
});

// 热更新支持
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    // 当模块热更新时，重新初始化 store
    console.log('🔥 OrderStore hot reload');
  });
}
