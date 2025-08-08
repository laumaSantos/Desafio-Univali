<template>
    <form @submit="onSubmit" class="form-fields">
        <!-- Nome -->
        <div>
            <label for="name">Nome do item:</label>
            <Field name="name" as="input" type="text" class="inputField" />
            <ErrorMessage name="name" class="error" />
        </div>

        <!-- Unidade -->
        <div>
            <label for="unit">Unidade de Medida:</label>
            <Field name="unit" as="select" class="inputField">
                <option value="">Selecione</option>
                <option value="Litro">Litro</option>
                <option value="Quilograma">Quilograma</option>
                <option value="Unidade">Unidade</option>
            </Field>
            <ErrorMessage name="unit" class="error" />
        </div>

        <!-- Quantidade -->
        <div>
            <label for="quantity">Quantidade:</label>
            <Field name="quantity" as="input" type="number" step="0.001" class="inputField" />
            <ErrorMessage name="quantity" class="error" />
        </div>

        <!-- Preço -->
        <div>
            <label for="price">Preço (R$):</label>
            <Field name="price" as="input" type="text" class="inputField" />
            <ErrorMessage name="price" class="error" />
        </div>

        <!-- Perecível -->
        <div>
            <label for="perishable">Produto Perecível:</label>
            <Field name="perishable" as="input" type="checkbox" :value="true" />
            <ErrorMessage name="perishable" class="error" />
        </div>

        <!-- Validade -->
        <div>
            <label for="expirationDate">Data de Validade:</label>
            <Field name="expirationDate" as="input" type="date" class="inputField" />
            <ErrorMessage name="expirationDate" class="error" />
        </div>

        <!-- Fabricação -->
        <div>
            <label for="manufacturingDate">Data de Fabricação:</label>
            <Field name="manufacturingDate" as="input" type="date" class="inputField" />
            <ErrorMessage name="manufacturingDate" class="error" />
        </div>

        <div class="buttons">
            <button type="submit">Salvar</button>
            <button type="button" @click="$emit('cancel')">Cancelar</button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { Field, ErrorMessage, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { productSchema } from '@/utils/validationSchema'
import { onMounted } from 'vue'
import { getProductById, getProducts, saveProducts } from '@/utils/localStorage'

const props = defineProps({
    productId: {
        type: String,
        default: null
    }
})

const emit = defineEmits(['saved', 'cancel'])

const { handleSubmit, setValues, resetForm } = useForm({
    validationSchema: toTypedSchema(productSchema),
    initialValues: {
        perishable: false,
    }
})

onMounted(() => {
    if (props.productId) {
        const product = getProductById(props.productId)
        if (product) setValues(product)
    }
})

const onSubmit = handleSubmit(values => {
    const products = getProducts()
    if (props.productId) {
        const index = products.findIndex(i => i.id === props.productId)
        products[index] = { ...values, id: props.productId }
    } else {
        products.push({ ...values, id: String(Date.now()) })
    }
    saveProducts(products)
    resetForm()
    emit('saved')
})
</script>

<style scoped>
label {
    font-size: 16px;
    margin-top: 10px;
    color: #09090b;
}

.inputField {
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    border: none;
    margin: 2px;
    font-size: 16px;
    border: 1px solid #e5e7eb;
}

button {
    padding: 10px 50px;
    margin-top: 20px;
    border-radius: 10px;
    background: var(--blue-7);
    color: var(--vt-c-white);
    font-size: 16px;
    font-weight: 700;
    border: none;

    @media (max-width:770px) {
        width: 100%;
    }
}

.error {
    color: red;
    font-size: 0.875rem;
}

.buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}
</style>
