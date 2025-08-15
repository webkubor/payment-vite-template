<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { computed, onMounted, onBeforeUnmount, reactive } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import * as OrderAction from '@/api/order'
import { getExpireSeconds, getFormattedLocalTime } from '@/utils/time'
import { toCurrency } from '@/utils/format'
import { writeClipboard } from '@/utils/copy'
import { PhCheckCircle, PhXCircle, PhWarningCircle, PhArrowLeft } from '@phosphor-icons/vue'
import ProcessingAnimation from '@/components/ProcessingAnimation.vue'

// 使用 i18n 组合式 API
const { t } = useI18n()

// 使用路由参数
const route = useRoute()
const router = useRouter()

// 使用 Pinia store
const orderStore = useOrderStore()

// 订单状态结果
const result = reactive({
  orderState: 1, // showStatusKey.waiting
  requestUrl: '',
  expireTime: '',
  mchOrderNo: '', // 商户订单号
  orderAmount: '', // 订单金额
  successTime: 0 // 支付成功时间
})

function localTime(time: number) {
    const timeZone = 'Asia/Seoul';
    return getFormattedLocalTime(timeZone, time * 1000);
}


// 轮询间隔常量
const POLLING_INTERVAL = 4000 // 毫秒

// 订单状态轮询定时器
let orderTimer: number | null = null

// 检查订单状态
function checkOrder() {
  orderStore.appConfig.waitingLoading = true
  
  OrderAction.fetchState(String(route.params.id))
    .then((res: any) => {
      // 使用类型断言处理响应数据
      Object.assign(result, res)
      orderStore.order.requestUrl = res.requestUrl
      // 使用安全的属性访问
      const expireTimeValue = res && ( res.expireTime)
      orderStore.appConfig.timeDownSeconds = getExpireSeconds(expireTimeValue)
      // 使用数字常量直接比较
      if (result.orderState === 1) { // showStatusKey.waiting === 1
        orderTimer = window.setTimeout(checkOrder, POLLING_INTERVAL)
      }
    })
    .catch((error) => {
      result.orderState = 3 // showStatusKey.fail === 3
      console.error("Error fetching order state:", error)
    })
    .finally(() => {
      orderStore.appConfig.waitingLoading = false
    })
}

// 页面加载时获取订单信息
onMounted(() => {
    checkOrder()
})

// 组件卸载前清除定时器
onBeforeUnmount(() => {
  if (orderTimer !== null) {
    clearTimeout(orderTimer)
    orderTimer = null
  }
})

// 复制订单号
const copyOrderId = async () => {
  await writeClipboard(route.params.id as string, t('result.orderNumberCopied'))
}


// 返回商家
const goBackToMerchant = () => {
  orderStore.backToMerchant()
}

// 返回支付页面
const goBackToPayment = () => {
  router.push(`/pay/${route.params.id}`)
}

// 定义状态映射
const currentStatus = computed(() => {
  // 根据订单状态返回对应的状态字符串
  switch (result.orderState) {
    case 1: return 'waiting'; // 处理中状态
    case 2: return 'success';
    case 9: return 'success';
    case 6: return 'timeout';
    case 3: return 'fail';
    default: return 'waiting'; // 默认为处理中
  }
})

// 状态图标和文本
const statusConfig = computed(() => {
  switch (currentStatus.value) {
    case 'success':
      return {
        icon: PhCheckCircle,
        title: t('result.paymentSuccess'),
        description: t('result.paymentSuccessDesc'),
        color: 'var(--success-color)',
        buttonText: t('result.backToHome')
      }
    case 'timeout':
      return {
        icon: PhWarningCircle,
        title: t('result.paymentTimeout'),
        description: t('result.paymentTimeoutDesc'),
        color: 'var(--warning-color)',
        buttonText: t('result.tryAgain')
      }
    case 'fail':
      return {
        icon: PhXCircle,
        title: t('result.paymentFailed'),
        description: t('result.paymentFailedDesc'),
        color: 'var(--error-color)',
        buttonText: t('result.tryAgain')
      }
    case 'waiting':
      return {
        icon: PhWarningCircle,
        title: t('result.paymentProcessing'),
        description: t('result.paymentProcessingDesc'),
        color: 'var(--primary-color)',
        buttonText: t('result.backToHome')
      }
    default:
      return {
        icon: PhWarningCircle,
        title: t('result.paymentProcessing'),
        description: t('result.paymentProcessingDesc'),
        color: 'var(--primary-color)',
        buttonText: t('result.backToHome')
      }
  }
})
</script>

<template>
  <div class="result-page">
    <div class="result-container">
      <div class="result-header" :class="`status-${currentStatus}`">
        <!-- 处理中状态使用动画组件 -->
        <ProcessingAnimation 
          v-if="currentStatus === 'waiting'"
          :title="statusConfig.title"
          :description="statusConfig.description"
          :color="statusConfig.color"
          size="large"
        />
        <!-- 其他状态使用原有图标 -->
        <template v-else>
          <component :is="statusConfig.icon" :size="64" :color="statusConfig.color" />
          <h1 class="result-title">{{ statusConfig.title }}</h1>
          <p class="result-description">{{ statusConfig.description }}</p>
        </template>
      </div>

      <div class="result-details">
        <div class="detail-row">
          <span class="label">{{ $t('result.orderNumber') }}</span>
          <span class="value copy-value" @click="copyOrderId">
            {{ result.mchOrderNo }}
            <PhCheckCircle :size="16" class="copy-icon" />
          </span>
        </div>
        
        <div class="detail-row">
          <span class="label">{{ $t('result.amount') }}</span>
          <div class="value">
            <b class="currency">
                {{ orderStore.appConfig.currency }}
            </b>
            {{ toCurrency(result.orderAmount) }}
          </div>
        </div>
        
        <div class="detail-row" v-if="result.successTime">
          <span class="label">{{ $t('result.paymentTime') }}</span>
          <span class="value">{{ localTime(result.successTime) }}</span>
        </div>
      </div>

      <div class="result-actions">
        <!-- 处理中状态显示两个按钮 -->
        <template v-if="currentStatus === 'waiting'">
          <button class="primary-button" @click="goBackToPayment">
            <PhArrowLeft :size="18" />
            {{ $t('result.backToPayment') }}
          </button>
          <button class="secondary-button" v-if="result.requestUrl" @click="goBackToMerchant">
            {{ $t('result.backToHome') }}
          </button>
        </template>
        <!-- 其他状态显示单个按钮 -->
        <template v-else>
          <button class="primary-button" v-if="result.requestUrl" @click="goBackToMerchant">
            <PhArrowLeft :size="18" />
            {{ statusConfig.buttonText }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.result-page {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  padding: 2rem 1rem;
  
  @media (max-width: 576px) {
    max-width: 100%;
    padding: 1.5rem 0.5rem;
  }
}

.result-container {
  background-color: $neutral-100;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.result-header {
  padding: 2rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  &.status-success {
    background-color: rgba($success-color, 0.1);
  }
  
  &.status-timeout {
    background-color: rgba($warning-color, 0.1);
  }
  
  &.status-fail {
    background-color: rgba($error-color, 0.1);
  }
  
  &.status-waiting {
    background-color: rgba($primary-color, 0.1);
  }
}

.result-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0.5rem 0;
  color: $text-color;
}

.result-description {
  color: $text-secondary;
  margin: 0;
}

.result-details {
  padding: 1rem 1rem 0;
  border-bottom: 1px solid $neutral-300;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid $neutral-300;
  }
}

.label {
  color: $text-secondary;
  font-size: 0.9rem;
}

.value {
  font-weight: 500;
  color: $text-color;
  
  &.copy-value {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
      color: $primary-color;
    }
    
    .copy-icon {
      opacity: 0.6;
      
      &:hover {
        opacity: 1;
      }
    }
  }
}

.result-actions {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
}

.primary-button {
  background-color: $primary-color;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  min-width: 200px;
  justify-content: center;
  
  &:hover {
    background-color: $primary-dark;
  }
  
  &:active {
    transform: translateY(1px);
  }
}

.secondary-button {
  background-color: transparent;
  color: $text-secondary;
  border: 1px solid $neutral-300;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 200px;
  
  &:hover {
    background-color: $neutral-200;
    color: $text-color;
    border-color: $neutral-400;
  }
  
  &:active {
    transform: translateY(1px);
  }
}
</style>
