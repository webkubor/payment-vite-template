<script setup lang="ts">
import { ref } from 'vue'
import { PhCaretRight } from '@phosphor-icons/vue'

const title = ref('Vue3 模板首页')
</script>

<template>
  <div class="home">
    <h1>{{ title }}</h1>
    <div class="icon-demo">
      <PhCaretRight :size="32" weight="bold" />
      <span>Phosphor 图标示例</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  padding: 2rem;
  text-align: center;
  
  h1 {
    color: #42b883;
    margin-bottom: 2rem;
  }
  
  .icon-demo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    
    span {
      font-size: 1.2rem;
    }
  }
}
</style>
