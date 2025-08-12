<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { PhCaretRight, PhTranslate, PhCalendar, PhBell } from '@phosphor-icons/vue'
import { message } from '../plugins/message'
import dayjs from '../plugins/dayjs'

// 使用 i18n 组合式 API
const { t, locale } = useI18n()

// 当前时间相关变量
const currentTime = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
const relativeTime = ref(dayjs().fromNow())

// 每秒更新时间
setInterval(() => {
  currentTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
  relativeTime.value = dayjs().fromNow()
}, 1000)

// 切换语言方法
const toggleLanguage = () => {
  locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  message.success(t('common.languageChanged'))
}

// 消息提示测试
const showSuccessMessage = () => {
  message.success(t('demo.successMessage'))
}

const showInfoMessage = () => {
  message.info(t('demo.infoMessage'))
}

const showWarningMessage = () => {
  message.warning(t('demo.warningMessage'))
}

const showErrorMessage = () => {
  message.error(t('demo.errorMessage'))
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
      <h3>{{ t('home.demoTitle') }}</h3>
      
      <!-- 图标演示 -->
      <div class="demo-card">
        <h4>{{ t('demo.iconTitle') }}</h4>
        <div class="icon-demo">
          <PhCaretRight :size="32" weight="bold" />
          <PhTranslate :size="32" weight="bold" />
          <PhCalendar :size="32" weight="bold" />
          <PhBell :size="32" weight="bold" />
        </div>
      </div>
      
      <!-- 时间显示演示 -->
      <div class="demo-card">
        <h4>{{ t('demo.timeTitle') }}</h4>
        <div class="time-demo">
          <div class="time-item">
            <PhCalendar :size="20" weight="bold" />
            <span>{{ currentTime }}</span>
          </div>
          <div class="time-item">
            <span>{{ t('demo.relativeTime') }}: {{ relativeTime }}</span>
          </div>
        </div>
      </div>
      
      <!-- 消息提示演示 -->
      <div class="demo-card">
        <h4>{{ t('demo.messageTitle') }}</h4>
        <div class="message-demo">
          <button class="message-btn success" @click="showSuccessMessage">
            {{ t('demo.success') }}
          </button>
          <button class="message-btn info" @click="showInfoMessage">
            {{ t('demo.info') }}
          </button>
          <button class="message-btn warning" @click="showWarningMessage">
            {{ t('demo.warning') }}
          </button>
          <button class="message-btn error" @click="showErrorMessage">
            {{ t('demo.error') }}
          </button>
        </div>
      </div>
      
      <!-- 语言切换演示 -->
      <div class="demo-card">
        <h4>{{ t('demo.i18nTitle') }}</h4>
        <div class="language-switcher" @click="toggleLanguage">
          <PhTranslate :size="24" weight="bold" />
          <span>{{ locale === 'zh-CN' ? 'English' : '韩语' }}</span>
        </div>
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
  
  h4 {
    color: color.adjust($primary-color, $lightness: -10%);
    margin-bottom: 0.8rem;
    font-size: 1.1rem;
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
            content: '\2022';
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
    
    .demo-card {
      border-radius: $border-radius-sm;
      padding: 1.2rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    .icon-demo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      margin-bottom: 0.5rem;
      
      span {
        font-size: 1.2rem;
      }
    }
    
    .time-demo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.8rem;
      
      .time-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;
      }
    }
    
    .message-demo {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.8rem;
      
      .message-btn {
        padding: 0.5rem 1rem;
        border-radius: $border-radius-sm;
        border: none;
        cursor: pointer;
        transition: all $transition-duration ease;
        font-weight: 500;
        color: white;
        
        &.success {
          background-color: #4CAF50;
          &:hover { background-color: color.adjust(#4CAF50, $lightness: -10%); }
        }
        
        &.info {
          background-color: #2196F3;
          &:hover { background-color: color.adjust(#2196F3, $lightness: -10%); }
        }
        
        &.warning {
          background-color: #FF9800;
          &:hover { background-color: color.adjust(#FF9800, $lightness: -10%); }
        }
        
        &.error {
          background-color: #F44336;
          &:hover { background-color: color.adjust(#F44336, $lightness: -10%); }
        }
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
    padding: 1.5rem 1rem;
    
    h1 {
      font-size: 1.8rem;
    }
    
    h2 {
      font-size: 1.4rem;
    }
    
    h3 {
      font-size: 1.2rem;
    }
    
    .features {
      grid-template-columns: 1fr;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .demo-section {
      padding: 1.5rem;
    }
    
    .message-demo {
      flex-direction: column;
      align-items: stretch;
    }
  }
}

@media (max-width: 480px) {
  .home {
    padding: 1rem 0.5rem;
    
    h1 {
      font-size: 1.6rem;
      margin-bottom: 0.3rem;
    }
    
    h2 {
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
    }
    
    .features {
      gap: 0.8rem;
      margin-bottom: 1.5rem;
      
      .feature-card {
        padding: 1rem;
      }
    }
    
    .demo-section {
      padding: 1rem;
      
      .demo-card {
        padding: 1rem;
      }
      
      .icon-demo {
        gap: 1rem;
      }
    }
  }
}
</style>
