<template>
    <div class="kr-page">
        <div class="kr-container">
            <!-- 语言切换 -->
            <div class="language-switcher">
                <div class="language-selector">
                    <PhGlobe weight="bold" size="18" class="globe-icon" />
                    <div class="language-buttons">
                        <button :class="{ active: currentLang === 'ko-KR' }"
                            @click="switchLanguage('ko-KR')">한국어</button>
                        <button :class="{ active: currentLang === 'en-US' }"
                            @click="switchLanguage('en-US')">English</button>
                    </div>
                </div>
            </div>

            <!-- 付款时限 -->
            <div class="payment-timer">
                <div class="timer-label">{{ $t('payment.timeLimit') }}</div>
                <div class="timer-countdown">
                    <span class="timer-hours">{{ hours }}</span>:
                    <span class="timer-minutes">{{ minutes }}</span>:
                    <span class="timer-seconds">{{ seconds }}</span>
                </div>
            </div>

            <!-- 付款金额 -->
            <div class="payment-amount">
                <div class="amount-container">
                    <div class="amount">
                        <span class="currency">
                            {{ orderStore.appConfig.currency }}
                        </span>
                        {{ toCurrency(order.amount) }}
                        </div>
                        <PhCopy class="copy-icon" weight="bold" size="25"  @click="copyText(order.amount)"/>
                </div>
                <div class="amount-warning">
                    <PhWarningCircle size="14" />
                    <span>{{ $t('payment.doNotChangeAmount') }}</span>
                </div>
            </div>

            <!-- 账号信息 -->
            <div class="account-number">
                <div class="number">{{ formatAccountNumber(order.payData) }}</div>
                <div class="copy-button" @click="copyText(order.payData)">
                    {{ $t('common.copy') }}
                </div>
            </div>

            <!-- 温馨提示 -->
            <div class="warning-tips">
                <PhWarningCircle size="30" class="warning-icon" />
                <div class="warning-text">
                    {{ $t('payment.accountUpdateWarning') }}
                </div>
            </div>

            <!-- 银行信息 -->
            <div class="bank-info">
                <div class="info-label">{{ $t('payment.bankName') }}</div>
                <div class="info-value">
                    <span>{{ order.typeBank || '-'}}</span>
                    <PhCopy size="16" class="copy-icon" @click="copyText(order.typeBank)" />
                </div>
            </div>

            <!-- 账户名称 -->
            <div class="account-info">
                <div class="info-label">{{ $t('payment.accountName') }}</div>
                <div class="info-value">
                    <span>{{ order.accountName || '-' }}</span>
                    <PhCopy size="16" class="copy-icon" @click="copyText(order.accountName)" />
                </div>
            </div>

            <!-- 操作按钮 -->
            <div class="action-buttons">
                <button class="status-button" @click="checkPaymentStatus">
                    {{ $t('payment.checkStatus') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { PhCopy, PhWarningCircle, PhGlobe } from '@phosphor-icons/vue';
import { writeClipboard } from '@/utils/copy';
import { setLanguage } from '@/utils/language';
import { toCurrency } from '@/utils/format';
import { useOrderStore } from '@/stores/orderStore';

// 初始化路由和国际化
const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const currentLang = ref(locale.value);

// 初始化订单和全局配置
const orderStore = useOrderStore();
const { order, appConfig } = orderStore;

// 计时器相关
const hours = computed(() => {
    const h = Math.floor(appConfig.timeDownSeconds / 3600);
    return h < 10 ? `0${h}` : `${h}`;
});

const minutes = computed(() => {
    const m = Math.floor((appConfig.timeDownSeconds % 3600) / 60);
    return m < 10 ? `0${m}` : `${m}`;
});

const seconds = computed(() => {
    const s = appConfig.timeDownSeconds % 60;
    return s < 10 ? `0${s}` : `${s}`;
});



// 格式化账号
const formatAccountNumber = (accountNumber: string) => {
    if (!accountNumber) return '';
    
    // 移除所有非数字字符
    const cleanNumber = accountNumber.replace(/\D/g, '');
    
    // 如果没有数字，返回原始值
    if (!cleanNumber) return accountNumber;
    
    // 例如：1234567890 -> 1234-5678-90
    return cleanNumber.replace(/(\d{4})(?=\d)/g, '$1-');
};

// 复制文本
const copyText = (text: string | number) => {
    writeClipboard(String(text), t('common.copySuccess'));
};

// 切换语言
const switchLanguage = (lang: 'ko-KR' | 'en-US') => {
    setLanguage(lang, currentLang);
};

// 检查支付状态
const checkPaymentStatus = () => {
    router.push({
        path: `/result/${route.params.id}`,
        query: { payWay: route.query.payWay as string }
    });
};


// 倒计时定时器
let countdownTimer: number | null = null;

// 启动倒计时
const startCountdown = () => {
    if (countdownTimer) {
        clearInterval(countdownTimer);
    }
    
    countdownTimer = window.setInterval(() => {
        if (appConfig.timeDownSeconds > 0) {
            appConfig.timeDownSeconds--;
        } else {
            // 时间到了，停止计时器
            if (countdownTimer) {
                clearInterval(countdownTimer);
                countdownTimer = null;
            }
        }
    }, 1000);
};

// 页面加载时获取订单信息
onMounted(() => {
    orderStore.fetchOrder(route.params.id as string).then(() => {
        // 订单信息加载完成后启动倒计时
        if (appConfig.timeDownSeconds > 0) {
            startCountdown();
        }
    });
});

// 页面卸载时清理定时器
onUnmounted(() => {
    if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
    }
});
</script>

<style lang="scss" scoped>
.kr-page {
    min-height: 100vh;
    background-color: $background-color;
    padding: 20px;
    display: flex;
    justify-content: center;
    font-family: 'Noto Sans KR', sans-serif;

    .kr-container {
        width: 100%;
        max-width: 600px;
        background-color: $neutral-100;
        border-radius: 12px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        padding: 24px;

        // 语言切换器
        .language-switcher {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-bottom: 24px;

            .language-selector {
                display: flex;
                align-items: center;
                background-color: rgba($primary-color, 0.1);
                border-radius: 20px;
                padding: 4px 6px;
                box-shadow: 0 2px 6px rgba(74, 107, 223, 0.1);

                .globe-icon {
                    margin-left: 6px;
                    margin-right: 6px;
                    color: $primary-color;
                }
            }

            .language-buttons {
                display: flex;

                button {
                    background: none;
                    border: none;
                    border-radius: 16px;
                    padding: 6px 12px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    color: $text-secondary;
                    transition: all 0.2s;

                    &.active {
                        background-color: $primary-color;
                        color: white;
                    }

                    &:hover:not(.active) {
                        background-color: rgba(74, 107, 223, 0.1);
                        color: $primary-color;
                    }
                }
            }
        }

        // 付款时限
        .payment-timer {
            margin-bottom: 24px;
            text-align: center;

            .timer-label {
                font-size: 14px;
                color: $text-secondary;
                margin-bottom: 8px;
            }

            .timer-countdown {
                font-size: 24px;
                font-weight: bold;
                color: $error-color;

                span {
                    display: inline-block;
                    background-color: rgba($error-color, 0.1);
                    border-radius: 4px;
                    padding: 4px 8px;
                    min-width: 40px;
                    text-align: center;
                }
            }
        }

        // 付款金额 - 紧凑突出
        .payment-amount {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            padding: 16px;
            background: linear-gradient(135deg, rgba($primary-color, 0.06), rgba($primary-light, 0.04));
            border: 1px solid rgba($primary-color, 0.2);
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba($primary-color, 0.08);
            position: relative;

            .amount-container {
                display: flex;
                align-items: center;
                margin-bottom: 8px;

                .amount {
                    font-size: 32px;
                    font-weight: 800;
                    color: $primary-color;
                    text-shadow: 0 1px 2px rgba($primary-color, 0.15);
                }

                .copy-icon {
                    margin-left: 10px;
                    cursor: pointer;
                    color: $primary-color;
                    transition: all 0.2s;
                    font-size: 18px;

                    &:hover {
                        color: $primary-light;
                        transform: scale(1.1);
                    }
                }
            }

            .amount-warning {
                display: flex;
                align-items: center;
                font-size: 12px;
                font-weight: 500;
                color: $warning-color;
                background-color: rgba($warning-color, 0.12);
                padding: 6px 12px;
                border-radius: 16px;
                border: 1px solid rgba($warning-color, 0.25);

                svg {
                    margin-right: 4px;
                    font-size: 14px;
                }
            }
        }

        // 账号信息 - 使用主色调
        .account-number {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: linear-gradient(135deg, rgba($primary-color, 0.06), rgba($primary-light, 0.04));
            border: 1px solid rgba($primary-color, 0.2);
            border-radius: 8px;
            padding: 14px;
            margin-bottom: 18px;
            box-shadow: 0 2px 10px rgba($primary-color, 0.1);

            .number {
                font-size: 18px;
                font-weight: 800;
                letter-spacing: 1px;
                color: $primary-color;
                text-shadow: 0 1px 2px rgba($primary-color, 0.15);
            }

            .copy-button {
                background-color: $primary-color;
                color: white;
                border: none;
                border-radius: 6px;
                padding: 8px 12px;
                cursor: pointer;
                font-size: 12px;
                font-weight: 600;
                transition: all 0.2s;
                box-shadow: 0 1px 4px rgba($primary-color, 0.25);

                &:hover {
                    background-color: $primary-light;
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba($primary-color, 0.35);
                }
            }
        }

        // 温馨提示
        .warning-tips {
            display: flex;
            align-items: center;
            background-color: rgba($warning-color, 0.08);
            border: 1px solid rgba($warning-color, 0.25);
            border-radius: 6px;
            padding: 12px;
            margin-bottom: 16px;

            .warning-icon {
                margin-right: 6px;
                color: $warning-color;
                flex-shrink: 0;
            }

            .warning-text {
                color: $warning-color;
                font-size: 13px;
                font-weight: 500;
                line-height: 1.4;
            }
        }

        // 银行信息和账户名称共用样式
        .bank-info,
        .account-info {
            margin-bottom: 16px;

            .info-label {
                font-size: 13px;
                color: $text-secondary;
                margin-bottom: 6px;
                font-weight: 500;
            }

            .info-value {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: $neutral-300;
                border-radius: 6px;
                padding: 12px;

                span {
                    font-size: 15px;
                    font-weight: 600;
                    color: $text-color;
                }

                .copy-icon {
                    cursor: pointer;
                    color: $primary-color;
                    transition: all 0.2s;

                    &:hover {
                        color: $primary-light;
                        transform: scale(1.1);
                    }
                }
            }
        }

        // 操作按钮
        .action-buttons {
            margin-top: 20px;

            .status-button {
                width: 100%;
                background-color: $primary-color;
                color: white;
                border: none;
                border-radius: 6px;
                padding: 12px;
                font-size: 15px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                text-align: center;

                &:hover {
                    background-color: $primary-light;
                }
            }
        }
    }
}

// 移动端优化 - 540px 以内
@media (max-width: 540px) {
    .kr-page {
        padding: 12px;
        
        .kr-container {
            padding: 16px;
            margin: 0;
            border-radius: 8px;
        }
        
        // 头部语言选择器
        .header {
            margin-bottom: 16px;
            
            .language-selector {
                padding: 4px 6px;
                font-size: 12px;
                
                .globe-icon {
                    margin-left: 4px;
                    margin-right: 4px;
                }
            }
            
            .language-buttons button {
                padding: 6px 12px;
                font-size: 13px;
                border-radius: 16px;
            }
        }
        
        // 付款时限
        .payment-timer {
            margin-bottom: 20px;
            
            .timer-label {
                font-size: 14px;
                margin-bottom: 8px;
            }
            
            .timer-countdown {
                font-size: 20px;
                
                span {
                    padding: 4px 8px;
                    min-width: 32px;
                    border-radius: 4px;
                }
            }
        }
        
        // 付款金额 - 移动端突出
        .payment-amount {
            margin-bottom: 24px;
            padding: 20px;
            
            .amount-container {
                margin-bottom: 12px;
                
                .amount {
                    font-size: 28px;
                }
                
                .copy-icon {
                    margin-left: 10px;
                    font-size: 18px;
                }
            }
            
            .amount-warning {
                font-size: 12px;
                padding: 6px 12px;
                border-radius: 16px;
                
                svg {
                    margin-right: 4px;
                }
            }
        }

        // 账号信息
        .account-number {
            padding: 12px;
            margin-bottom: 14px;

            .number {
                font-size: 16px;
                letter-spacing: 0.5px;
            }

            .copy-button {
                padding: 6px 10px;
                font-size: 11px;
            }
        }

        // 温馨提示
        .warning-tips {
            padding: 10px;
            margin-bottom: 12px;

            .warning-icon {
                margin-right: 5px;
            }

            .warning-text {
                font-size: 11px;
                line-height: 1.3;
            }
        }

        // 银行信息和账户名称
        .bank-info,
        .account-info {
            margin-bottom: 12px;

            .info-label {
                font-size: 11px;
                margin-bottom: 4px;
            }

            .info-value {
                padding: 10px;

                span {
                    font-size: 13px;
                }
            }
        }

        // 操作按钮
        .action-buttons {
            margin-top: 16px;

            .status-button {
                padding: 10px;
                font-size: 13px;
            }
        }
    }
}

// PC适配
@media (min-width: 768px) {
    .kr-page {
        padding: 40px;
        align-items: center;

        .kr-container {
            padding: 32px;
        }
    }
}
</style>