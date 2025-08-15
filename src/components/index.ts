import { App } from 'vue'
import KSelect from './KSelect.vue'

// 组件列表
const components = {
  KSelect
}

// 安装方法
const install = (app: App): void => {
  // 注册全局组件
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
  })
}

export default {
  install
}

// 单独导出组件，方便按需引入
export {
  KSelect
}
