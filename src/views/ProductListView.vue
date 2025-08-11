<template>
    <div class="list-container">
        <div>
            <h1 class="title">Produtos Cadastrados</h1>
            <button @click="goToCreate" class="form-button">
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
                        <th>Produto Perecível</th>
                        <th>Data de Fabricação</th>
                        <th>Data de Validade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.id">
                        <td>{{ product.name }}</td>
                        <td>{{ product.unit }}</td>
                        <td>{{ product.quantity }}</td>
                        <td>{{ product.price }}</td>
                        <td class="text-center">
                            <CheckCircle v-if="product.perishable" class="check-icon" />
                            <XCircle v-else class="x-icon" />
                        </td>
                        <td>{{ formatDate(product.manufacturingDate) || 'N/A' }}</td>
                        <td>{{ formatDate(product.expirationDate) || 'N/A' }}</td>
                        <td>
                            <button @click="edit(product.id)" class="action-button">Editar</button>
                            <button @click="askDelete(product.id)" class="action-button delete">Excluir</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p v-else class="no-products">Nenhum produto cadastrado ainda.</p>
        </div>
    </div>
    <ConfirmModal v-model:open="showDeleteModal" title="Excluir produto"
        :message="`Tem certeza que deseja excluir este produto? Essa ação não pode ser desfeita.`" confirmText="Excluir"
        cancelText="Cancelar" @confirm="onConfirmDelete" @cancel="onCancelDelete" />
    <Toast ref="toastRef" />
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getProducts, removeProduct } from '@/utils/localStorage'
import type { Product } from '@/utils/types'
import ConfirmModal from '@/components/ConfirmModal.vue'
import Toast from '@/components/PersonalizedToast.vue'
import { CheckCircle, XCircle } from 'lucide-vue-next'
import { formatDate } from '@/utils/formatDate'

const router = useRouter()
const products = ref<Product[]>([])
const showDeleteModal = ref(false)
const pendingDeleteId = ref<string | null>(null)
const toastRef = ref()

function loadProducts() {
    products.value = getProducts()
}

function goToCreate() {
    router.push('/products/new')
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
    toastRef.value?.show('Produto excluído com sucesso!')
}

function onCancelDelete() {
    pendingDeleteId.value = null
}


onMounted(loadProducts)
</script>

<style scoped>
.list-container {
    max-width: 1400px;
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
    color: #09090b;
}

.form-button {
    background: var(--blue-7);
    color: var(--vt-c-white);
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.form-button:hover {
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

.action-button {
    margin-right: 0.5rem;
    background-color: #e5e7eb;
    color: #111827;
    border: none;
    padding: 0.4rem 0.75rem;
    margin-top: 2px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    width: 70px;
}

.action-button:hover {
    background-color: #d1d5db;
}

.action-button.delete {
    background-color: #f87171;
    color: white;
}

.action-button.delete:hover {
    background-color: #ef4444;
}

.no-products {
    margin-top: 1rem;
    color: #6b7280;
}

.text-center {
    text-align: center;
}

.check-icon,
.x-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: #10b981;
}

.check-icon {
    color: #10b981;
}

.x-icon {
    color: #ef4444;
}

@media (max-width: 1420px) {
    .list-container {
        padding-left: 15rem;
        padding-right: 1rem;
    }
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

    .form-button {
        width: 100%;
        text-align: center;
    }

    .product-table th,
    .product-table td {
        padding: 0.75rem;
        font-size: 0.8rem;
    }

    .action-button {
        font-size: 0.75rem;
        padding: 0.3rem 0.6rem;
    }
}
</style>
