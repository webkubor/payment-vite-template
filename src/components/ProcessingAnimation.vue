<template>
  <div class="processing-animation" :data-size="size">
    <div class="processing-icon">
      <div class="spinner">
        <div class="spinner-circle"></div>
        <div class="spinner-circle"></div>
        <div class="spinner-circle"></div>
      </div>
    </div>
    <div class="processing-text">
      <h3 class="processing-title">{{ title }}</h3>
      <p class="processing-description">{{ description }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title?: string;
  description?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: '处理中...',
  description: '请稍候，正在处理您的请求',
  size: 'medium',
  color: 'var(--primary-color)'
});
</script>

<style lang="scss" scoped>

.processing-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
}

.processing-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  display: flex;
  gap: 0.3rem;
  justify-content: center;
  align-items: center;
  
  .spinner-circle {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background-color: $primary-color; /* 使用固定颜色确保动画显示 */
    animation: processing-bounce 1.4s ease-in-out infinite both;
    
    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
    
    &:nth-child(3) {
      animation-delay: 0s;
    }
  }
}

// 不同尺寸
.processing-animation[data-size="small"] {
  padding: 1rem;
  gap: 0.5rem;
  
  .spinner .spinner-circle {
    width: 0.5rem;
    height: 0.5rem;
  }
  
  .processing-title {
    font-size: 1rem;
  }
  
  .processing-description {
    font-size: 0.8rem;
  }
}

.processing-animation[data-size="large"] {
  padding: 3rem;
  gap: 1.5rem;
  
  .spinner .spinner-circle {
    width: 1.2rem;
    height: 1.2rem;
  }
  
  .processing-title {
    font-size: 1.8rem;
  }
  
  .processing-description {
    font-size: 1.1rem;
  }
}

.processing-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.processing-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: $text-color;
  margin: 0;
}

.processing-description {
  font-size: 1rem;
  color: $text-secondary;
  margin: 0;
  line-height: 1.5;
}

// 弹跳动画
@keyframes processing-bounce {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

// 脉冲动画（备选）
@keyframes processing-pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

// 旋转动画（备选）
@keyframes processing-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// 渐变动画（备选）
.spinner-gradient {
  .spinner-circle {
    background: linear-gradient(45deg, v-bind('props.color'), rgba(255, 255, 255, 0.3));
    animation: processing-pulse 1.5s ease-in-out infinite;
  }
}
</style>
