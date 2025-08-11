<template>
    <transition name="fade">
        <div v-if="visible" class="toast">
            <span class="toast-message">{{ message }}</span>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
    duration?: number
}>()

const visible = ref(false)
const message = ref('')

function show(msg: string) {
    message.value = msg
    visible.value = true
    setTimeout(() => {
        visible.value = false
    }, props.duration || 3000)
}

defineExpose({ show })
</script>

<style scoped>
.toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #1e293b;
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-size: 0.9rem;
    animation: slide-up 0.3s ease-out;
}

@keyframes slide-up {
    from {
        transform: translateY(10px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
