import fly from '@/utils/fly'

/**
 * @description: 获取收银台订单参数
 * @param {*} params
 * @return {*}
 */
export function fetchOrder(payOrderId: string) {
  return fly.get('/pay/info/' + payOrderId)
}

/**
 * @description: 获取状态
 * @param {*} payOrderId
 * @return {*}
 */
export function fetchState(payOrderId: string) {
  return fly.get('/state/' + payOrderId)
}



/**
 * @description: 提交支付
 * @param {string} payOrderId
 * @param {string} payWay
 * @return {*}
 */
export function fetchPayInfo(payOrderId: string, payWay: string, params?: any) {
    let requestUrl = '/pay/info/' + payOrderId + '/' + payWay;
    if (params) {
      const queryParams = new URLSearchParams(params).toString();
      requestUrl += '?' + queryParams;
    }
    return fly.post(requestUrl);
}