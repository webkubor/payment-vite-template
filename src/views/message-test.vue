<template>
  <div class="message-test-container">
    <h1>全局消息系统测试</h1>
    
    <div class="test-buttons">
      <button class="btn success" @click="showSuccessMessage">成功消息</button>
      <button class="btn warning" @click="showWarningMessage">警告消息</button>
      <button class="btn error" @click="showErrorMessage">错误消息</button>
      <button class="btn info" @click="showInfoMessage">信息消息</button>
    </div>

    <div class="test-section">
      <h2>使用方式说明</h2>
      <div class="code-block">
        <pre>
// 方式1：组件内使用
const { proxy } = getCurrentInstance();
proxy.$message('这是一条消息', 'success');
proxy.$messageSuccess('这是一条成功消息');
proxy.$messageWarning('这是一条警告消息');
proxy.$messageError('这是一条错误消息');
proxy.$messageInfo('这是一条信息消息');

// 方式2：导入使用
import { message, messageSuccess } from '@/plugins/message';
message('这是一条消息', 'success');
messageSuccess('这是一条成功消息');

// 方式3：window对象使用（非组件环境）
window.$message('这是一条消息', 'success');
window.$messageSuccess('这是一条成功消息');
        </pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue';
import { message } from '@/plugins/message';

// 获取组件实例，用于访问全局属性
const instance = getCurrentInstance();

// 测试方法
function showSuccessMessage() {
  // 方式1：使用全局属性
  if (instance && instance.proxy) {
    instance.proxy.$message.success('成功消息测试 - 通过全局属性');
  }
  
  // 方式2：使用导入的方法
  setTimeout(() => {
    message.success('成功消息测试 - 通过导入方法');
  }, 1000);
  
  // 方式3：使用window对象
  setTimeout(() => {
    window.$message.success('成功消息测试 - 通过window对象');
  }, 2000);
}

function showWarningMessage() {
  // 方式1：使用全局属性
  if (instance && instance.proxy) {
    instance.proxy.$message.warning('警告消息测试 - 通过全局属性');
  }
  
  // 方式2：使用导入的方法
  setTimeout(() => {
    message.warning('警告消息测试 - 通过导入方法');
  }, 1000);
}

function showErrorMessage() {
  // 方式1：使用全局属性
  if (instance && instance.proxy) {
    instance.proxy.$message.error('错误消息测试 - 通过全局属性');
  }
  
  // 方式2：使用导入的方法
  setTimeout(() => {
    message.error('错误消息测试 - 通过导入方法');
  }, 1000);
}

function showInfoMessage() {
  // 方式1：使用全局属性
  if (instance && instance.proxy) {
    instance.proxy.$message.info('信息消息测试 - 通过全局属性');
  }
  
  // 方式2：使用导入的方法
  setTimeout(() => {
    message.info('信息消息测试 - 通过导入方法');
  }, 1000);
}
</script>

<style lang="scss" scoped>
.message-test-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  
  h1 {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .test-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 40px;
    
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      
      &.success {
        background-color: #4CAF50;
        color: white;
      }
      
      &.warning {
        background-color: #FF933B;
        color: white;
      }
      
      &.error {
        background-color: #e91e63;
        color: white;
      }
      
      &.info {
        background-color: #2196f3;
        color: white;
      }
    }
  }
  
  .test-section {
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 20px;
    
    h2 {
      margin-top: 0;
      margin-bottom: 15px;
    }
    
    .code-block {
      background-color: #282c34;
      border-radius: 8px;
      padding: 15px;
      overflow-x: auto;
      
      pre {
        margin: 0;
        color: #abb2bf;
        font-family: 'Courier New', monospace;
        font-size: 14px;
      }
    }
  }
}
</style>
