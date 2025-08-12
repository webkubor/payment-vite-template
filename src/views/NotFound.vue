<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { PhArrowLeft } from '@phosphor-icons/vue'

const { t } = useI18n()
const router = useRouter()

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>{{ t('error.notFound') }}</p>
    <button class="back-button" @click="goBack">
      <PhArrowLeft :size="20" />
      <span>{{ t('common.back') }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  text-align: center;
  
  h1 {
    font-size: 6rem;
    margin-bottom: 1rem;
    color: $primary-color;
  }
  
  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: $text-color;
  }
  
  .back-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background-color: $primary-color;
    color: white;
    border: none;
    border-radius: $border-radius-sm;
    cursor: pointer;
    transition: background-color $transition-duration;
    
    &:hover {
      background-color: color.adjust($primary-color, $lightness: -10%);
    }
  }
}
</style>
