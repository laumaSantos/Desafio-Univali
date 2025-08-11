<template>
  <div class="form-container">
    <h1>{{ isEditing ? 'Editar Produto' : 'Cadastrar Produto' }}</h1>
    <ProductForm :product-id="productId" @saved="handleSaved" @cancel="goToList" />
  </div>
</template>

<script setup lang="ts">
import ProductForm from '@/components/ProductForm.vue'
import { inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const showToast = inject<((msg: string) => void)>('showToast')

function handleSaved() {
  showToast?.(isEditing ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!')
  router.push('/products')
}

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
  margin: 2rem auto;
}

.form-container h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #09090b;
}

@media (max-width: 768px) {
  .form-container {
    padding: 20px;
  }
}
</style>
