<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { PhCaretDown } from '@phosphor-icons/vue';

// 定义选项类型
interface SelectOption {
  value?: string | number;
  label?: string;
  text?: string;
  [key: string]: any;
}

// 定义组件属性
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array as () => (SelectOption | string | number)[],
    default: () => []
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
});

// 定义事件
const emit = defineEmits(['update:modelValue', 'change']);

// 下拉菜单状态
const isOpen = ref(false);
const selectRef = ref<HTMLElement | null>(null);
const selectedOption = ref<SelectOption | string | number | null>(null);

// 计算选中的选项文本
const selectedText = computed(() => {
  if (!selectedOption.value) return props.placeholder;
  if (typeof selectedOption.value === 'string' || typeof selectedOption.value === 'number') {
    return selectedOption.value;
  }
  return selectedOption.value.label || selectedOption.value.text || selectedOption.value.value || '';
});

// 初始化选中项
const initSelectedOption = () => {
  if (props.modelValue) {
    const option = props.options.find((opt: SelectOption | string | number) => {
      if (typeof opt === 'string' || typeof opt === 'number') {
        return opt === props.modelValue;
      }
      return opt.value === props.modelValue;
    });
    selectedOption.value = option || null;
  } else {
    selectedOption.value = null;
  }
};

// 监听值变化
watch(() => props.modelValue, () => {
  initSelectedOption();
}, { immediate: true });

// 监听选项变化
watch(() => props.options, () => {
  initSelectedOption();
}, { deep: true });

// 选择选项
const selectOption = (option: SelectOption | string | number) => {
  let value: string | number;
  
  if (typeof option === 'string' || typeof option === 'number') {
    value = option;
  } else {
    value = option.value !== undefined ? option.value : option as unknown as string;
  }
  
  selectedOption.value = option;
  emit('update:modelValue', value);
  emit('change', value);
  closeDropdown();
};

// 切换下拉菜单
const toggleDropdown = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
};

// 关闭下拉菜单
const closeDropdown = () => {
  isOpen.value = false;
};

// 点击外部关闭下拉菜单
const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    closeDropdown();
  }
};

// 获取选项显示文本
const getOptionText = (option: SelectOption | string | number): string => {
  if (typeof option === 'string' || typeof option === 'number') {
    return String(option);
  }
  return option.label || option.text || String(option.value) || '';
};

// 判断选项是否被选中
const isOptionSelected = (option: SelectOption | string | number): boolean => {
  if (!props.modelValue) return false;
  
  if (typeof option === 'string' || typeof option === 'number') {
    return option === props.modelValue;
  }
  
  return option.value === props.modelValue;
};

// 挂载和卸载事件监听
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="k-select" ref="selectRef">
    <!-- 标签 -->
    <label v-if="label" class="k-select-label">
      {{ label }}
      <span v-if="required" class="k-select-required">*</span>
    </label>
    
    <!-- 选择器 -->
    <div 
      class="k-select-input" 
      :class="{ 
        'k-select-open': isOpen, 
        'k-select-disabled': disabled 
      }"
      @click="toggleDropdown"
    >
      <div class="k-select-value">{{ selectedText }}</div>
      <PhCaretDown :class="['k-select-arrow', { 'k-select-arrow-open': isOpen }]" />
    </div>
    
    <!-- 下拉选项 -->
    <div v-if="isOpen" class="k-select-dropdown">
      <div 
        v-for="(option, index) in options" 
        :key="index"
        class="k-select-option"
        :class="{ 'k-select-option-selected': isOptionSelected(option) }"
        @click="selectOption(option)"
      >
        {{ getOptionText(option) }}
      </div>
      <div v-if="options.length === 0" class="k-select-empty">
        无选项
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.k-select {
  position: relative;
  width: 100%;
  margin-bottom: 0.5rem;
  
  // 标签样式
  &-label {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
    color: $text-secondary;
    font-weight: 500;
  }
  
  &-required {
    color: $error-color;
    margin-left: 0.25rem;
  }
  
  // 输入框样式
  &-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 2.75rem;
    padding: 0 0.75rem;
    background: #fff;
    border: 1px solid rgba(222, 226, 230, 0.7);
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    box-sizing: border-box;
    
    &:hover {
      border-color: $primary-light;
    }
    
    &.k-select-open {
      border-color: $primary-color;
      box-shadow: 0 0 0 3px rgba(0, 52, 120, 0.1);
    }
    
    &.k-select-disabled {
      background-color: rgba(233, 236, 239, 0.4);
      cursor: not-allowed;
      opacity: 0.7;
    }
    
    @media (max-width: 576px) {
      height: 2.5rem;
      padding: 0 0.625rem;
    }
  }
  
  // 值显示
  &-value {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: $text-color;
    font-size: 0.9375rem;
    
    @media (max-width: 576px) {
      font-size: 0.875rem;
    }
  }
  
  // 箭头
  &-arrow {
    width: 1.25rem;
    height: 1.25rem;
    margin-left: 0.5rem;
    color: $text-secondary;
    transition: transform 0.2s ease;
    
    &-open {
      transform: rotate(180deg);
    }
  }
  
  // 下拉菜单
  &-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 12.5rem;
    margin-top: 0.25rem;
    background: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    z-index: 100;
    border: 1px solid rgba(222, 226, 230, 0.7);
    animation: k-dropdown-in 0.2s ease;
  }
  
  // 选项
  &-option {
    padding: 0.625rem 0.75rem;
    cursor: pointer;
    transition: all 0.15s ease;
    font-size: 0.9375rem;
    
    &:hover {
      background-color: rgba(0, 52, 120, 0.05);
    }
    
    &-selected {
      background-color: rgba(0, 52, 120, 0.1);
      color: $primary-color;
      font-weight: 500;
    }
    
    @media (max-width: 576px) {
      padding: 0.5rem 0.625rem;
      font-size: 0.875rem;
    }
  }
  
  // 空状态
  &-empty {
    padding: 0.75rem;
    text-align: center;
    color: $text-secondary;
    font-size: 0.875rem;
  }
}

// 动画
@keyframes k-dropdown-in {
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
