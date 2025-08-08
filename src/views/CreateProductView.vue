<template>
  <div class="form-container">
    <h1>{{ isEditing ? 'Editar Produto' : 'Cadastrar Produto' }}</h1>
    <ProductForm :product-id="productId" @saved="goToList" @cancel="goToList" />
  </div>
</template>

<script setup lang="ts">
import ProductForm from '@/components/ProductForm.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const productId = route.params.id as string || undefined
const isEditing = !!productId

function goToList() {
  router.push('/products')
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
