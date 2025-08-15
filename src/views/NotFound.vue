<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { PhClockCountdown } from '@phosphor-icons/vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const { t } = useI18n()
const appVersion = ref(import.meta.env.VITE_APP_VERSION || '1.0.0')

// 倒计时设置
const countdown = ref(30)
let timer: number | null = null

onMounted(() => {
  startCountdown()
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})

const startCountdown = () => {
  timer = window.setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      if (timer) {
        clearInterval(timer)
      }
      // 倒计时结束后重新加载页面
      window.location.reload()
    }
  }, 1000)
}

</script>

<template>
  <div class="error-wrap">
    <div class="card">
      <div class="icon">
        <PhClockCountdown :size="48" />
      </div>
      <div class="title">{{ t('error.paymentLinkError') }}</div>
      <div class="desc">{{ t('error.waitForRetry', [countdown]) }}</div>
      <div class="version">v{{ appVersion }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-wrap {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}

.card {
  width: 100%;
  background: $bg-white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 2rem 1.5rem;
  display: grid;
  justify-items: center;
  text-align: center;
}

.icon { color: $primary-color; margin-bottom: 0.5rem; }
.title { font-size: 1.25rem; font-weight: 700; color: $text-color; margin-bottom: 0.25rem; }
.desc { font-size: 0.875rem; color: $text-secondary; margin-bottom: 1.5rem; }
.version { font-size: 0.75rem; color: #999; margin-top: 1rem; }

.primary {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
  justify-content: center;
  padding: 0.5rem 1.5rem;
  background: $primary-color;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  font-weight: 600;
}
</style>
