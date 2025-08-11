<template>
  <div class="app-layout">
    <Sidebar />
    <main class="main-content">
      <RouterView />
      <Toast ref="toastRef" />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/SidebarComponent.vue'
import { RouterView } from 'vue-router'
import { ref, provide } from 'vue'
import Toast from '@/components/personalizedToast.vue'

type ToastExposed = { show: (msg: string) => void }
const toastRef = ref<ToastExposed | null>(null)

function showToast(msg: string) {
  toastRef.value?.show(msg)
}
provide('showToast', showToast)
</script>

<style scoped>
.app-layout {
  display: flex;
}

.main-content {
  width: 100vw;
  min-height: 100vh;
  background-color: #f4f4f4;
  align-items: center;
  justify-content: center;
}
</style>
