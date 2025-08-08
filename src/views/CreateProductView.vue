<template>
  <div class="form-container">
    <h1>{{ isEditing ? 'Editar Item' : 'Cadastrar Item' }}</h1>
    <ProductForm :item-id="itemId" @saved="goToList" @cancel="goToList" />
  </div>
</template>

<script setup lang="ts">

import ProductForm from '@/components/ProductForm.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const itemId = route.params.id || null
const isEditing = !!itemId

function goToList() {
  router.push('/items')
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
}

.form-container h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #09090b;
}
</style>
