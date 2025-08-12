<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { PhCaretRight, PhTranslate } from '@phosphor-icons/vue'

// 使用 i18n 组合式 API
const { t, locale } = useI18n()

// 切换语言方法
const toggleLanguage = () => {
  locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
}
</script>

<template>
  <div class="home">
    <h1>{{ t('home.title') }}</h1>
    <h2>WebKubor Vue3 模板</h2>
    
    <div class="features">
      <div class="feature-card">
        <h3>技术栈</h3>
        <ul>
          <li>Vue 3.5.18</li>
          <li>Vite 7.1.2</li>
          <li>TypeScript 5.8.3</li>
          <li>Vue Router 4.5.1</li>
          <li>SCSS</li>
          <li>pnpm</li>
        </ul>
      </div>
      
      <div class="feature-card">
        <h3>功能特点</h3>
        <ul>
          <li>国际化 (vue-i18n)</li>
          <li>日期处理 (dayjs)</li>
          <li>图标系统 (Phosphor Icons)</li>
          <li>消息系统</li>
          <li>路由配置</li>
          <li>404 页面</li>
        </ul>
      </div>
      
      <div class="feature-card">
        <h3>开发体验</h3>
        <ul>
          <li>路径别名 (@)</li>
          <li>SCSS 变量全局引入</li>
          <li>完善的类型声明</li>
          <li>模块热替换</li>
          <li>跨域代理配置</li>
        </ul>
      </div>
    </div>
    
    <div class="demo-section">
      <h3>功能演示</h3>
      <div class="icon-demo">
        <PhCaretRight :size="32" weight="bold" />
        <span>{{ t('home.iconDemo') }}</span>
      </div>
      
      <div class="language-switcher" @click="toggleLanguage">
        <PhTranslate :size="24" weight="bold" />
        <span>{{ locale === 'zh-CN' ? 'English' : '中文' }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";

.home {
  padding: 2rem;
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;
  
  h1 {
    color: $primary-color;
    margin-bottom: 0.5rem;
  }
  
  h2 {
    color: color.adjust($primary-color, $lightness: -20%);
    margin-bottom: 2rem;
    font-weight: 500;
  }
  
  h3 {
    color: $primary-color;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }
  
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
    
    .feature-card {
      background-color: rgba(66, 184, 131, 0.05);
      border-radius: $border-radius-md;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      transition: transform $transition-duration, box-shadow $transition-duration;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }
      
      ul {
        text-align: left;
        padding-left: 1.2rem;
        
        li {
          margin-bottom: 0.5rem;
          position: relative;
          
          &::before {
            content: '•';
            color: $primary-color;
            font-weight: bold;
            position: absolute;
            left: -1rem;
          }
        }
      }
    }
  }
  
  .demo-section {
    background-color: rgba(66, 184, 131, 0.05);
    border-radius: $border-radius-md;
    padding: 2rem;
    margin-top: 2rem;
    
    .icon-demo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      
      span {
        font-size: 1.2rem;
      }
    }
    
    .language-switcher {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: $border-radius-sm;
      background-color: rgba(66, 184, 131, 0.1);
      cursor: pointer;
      transition: all $transition-duration ease;
      
      &:hover {
        background-color: rgba(66, 184, 131, 0.2);
      }
      
      span {
        font-size: 0.9rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .home {
    .features {
      grid-template-columns: 1fr;
    }
  }
}
</style>
