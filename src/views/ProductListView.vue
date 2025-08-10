<template>
    <div class="list-container">
        <div>
            <h1 class="title">Produtos Cadastrados</h1>
            <button @click="goToCreate" class="btn">
                Adicionar Novo Produto
            </button>
        </div>

        <div class="table-wrapper">
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
                            <button @click="askDelete(product.id)" class="action-btn delete">Excluir</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p v-else class="no-products">Nenhum produto cadastrado ainda.</p>
        </div>
        <ConfirmModal v-model:open="showDeleteModal" title="Excluir produto"
            :message="`Tem certeza que deseja excluir este produto? Essa ação não pode ser desfeita.`"
            confirmText="Excluir" cancelText="Cancelar" @confirm="onConfirmDelete" @cancel="onCancelDelete" />
    </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getProducts, removeProduct } from '@/utils/localStorage'
import type { Product } from '@/utils/types'
import ConfirmModal from '@/components/ConfirmModal.vue'

const router = useRouter()
const products = ref<Product[]>([])
const showDeleteModal = ref(false)
const pendingDeleteId = ref<string | null>(null)

function loadProducts() {
    products.value = getProducts()
}

function goToCreate() {
    router.push('/products')
}

function edit(id: string) {
    router.push(`/products/${id}`)
}

function askDelete(id: string) {
    pendingDeleteId.value = id
    showDeleteModal.value = true
}

function onConfirmDelete() {
    if (!pendingDeleteId.value) return
    removeProduct(pendingDeleteId.value)
    loadProducts()
    pendingDeleteId.value = null
    alert('Produto excluído com sucesso!')
}

function onCancelDelete() {
    pendingDeleteId.value = null
}

onMounted(loadProducts)
</script>

<style scoped>
.list-container {
    max-width: 1100px;
    margin: 2rem auto;
    padding-left: 220px;
}

.list-container div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.title {
    font-size: 1.75rem;
    font-weight: 600;
    color: #09090b;
}

.btn {
    background-color: #114da6;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #2563eb;
}

.table-wrapper {
    overflow-x: auto;
    border-radius: 0.5rem;
}

.product-table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;
    background-color: white;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.product-table thead {
    background-color: #f9fafb;
}

.product-table th {
    text-align: left;
    padding: 1rem;
    font-size: 14px;
    font-weight: 600;
    color: #4b5563;
    border-bottom: 1px solid #e5e7eb;
}

.product-table td {
    padding: 1rem;
    font-size: 0.9rem;
    color: #1f2937;
    border-bottom: 1px solid #f3f4f6;
}

.product-table tbody tr:hover {
    background-color: #f9fafb;
}

.action-btn {
    margin-right: 0.5rem;
    background-color: #e5e7eb;
    color: #111827;
    border: none;
    padding: 0.4rem 0.75rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: background-color 0.2s ease;
}

.action-btn:hover {
    background-color: #d1d5db;
}

.action-btn.delete {
    background-color: #f87171;
    color: white;
}

.action-btn.delete:hover {
    background-color: #ef4444;
}

.no-products {
    margin-top: 1rem;
    font-style: italic;
    color: #6b7280;
}

@media (max-width: 1020px) {
    .list-container {
        padding-left: 5rem;
        padding-right: 1rem;
    }
}

@media (max-width: 760px) {
    .list-container {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .list-container div {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
    }

    .btn {
        width: 100%;
        text-align: center;
    }

    .product-table th,
    .product-table td {
        padding: 0.75rem;
        font-size: 0.8rem;
    }

    .action-btn {
        font-size: 0.75rem;
        padding: 0.3rem 0.6rem;
    }
}
</style>
