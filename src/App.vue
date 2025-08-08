<template>
  <div class="app-layout">
    <Sidebar />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/SidebarComponent.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped>
.app-layout {
  display: flex;
}

.main-content {
  width: 100vw;
  min-height: 100vh;
  background-color: #f4f4f4;

}
</style>
