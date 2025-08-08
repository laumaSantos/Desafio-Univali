<template>
    <div class="list-container">
        <h1 class="title">Produtos Cadastrados</h1>

        <button @click="goToCreate" class="btn">
            Adicionar Novo Produto
        </button>

        <table v-if="products.length" class="product-table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Unidade</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td>{{ product.name }}</td>
                    <td>{{ product.unit }}</td>
                    <td>{{ product.quantity }}</td>
                    <td>R$ {{ product.price }}</td>
                    <td>
                        <button @click="edit(product.id)" class="action-btn">Editar</button>
                        <button @click="confirmDelete(product.id)" class="action-btn delete">Excluir</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <p v-else class="no-products">Nenhum produto cadastrado ainda.</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getProducts, removeProduct } from '@/utils/localStorage'
import type { Product } from '@/utils/types'

const router = useRouter()
const products = ref<Product[]>([])

function loadProducts() {
    products.value = getProducts()
}

function goToCreate() {
    router.push('/products/new')
}

function edit(id: string) {
    router.push(`/products/${id}`)
}

function confirmDelete(id: string) {
    if (confirm('Deseja realmente excluir este produto?')) {
        removeProduct(id)
        loadProducts()
        alert('Produto excluído com sucesso!')
    }
}

onMounted(loadProducts)
</script>

<style scoped>
.list-container {
    max-width: 900px;
    margin: 0 auto;
}

.title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.btn {
    background-color: #233568;
    color: white;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-bottom: 1rem;
}

.product-table {
    width: 100%;
    border-collapse: collapse;
}

.product-table th,
.product-table td {
    border: 1px solid #e5e7eb;
    padding: 0.75rem;
    text-align: left;
}

.action-btn {
    margin-right: 0.5rem;
    background-color: #e5e5e5;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    cursor: pointer;
}

.action-btn.delete {
    background-color: #f87171;
    color: white;
}

.no-products {
    margin-top: 1rem;
    font-style: italic;
    color: #555;
}

td,
th {
    color: #09090b;
}
</style>
