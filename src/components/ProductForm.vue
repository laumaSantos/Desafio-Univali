<template>
    <form @submit="onSubmit" class="form-fields">
        <div>
            <label for="name">Nome do item:</label>
            <Field name="name" as="input" type="text" class="inputField" />
            <ErrorMessage name="name" class="error" />
        </div>
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
        <div>
            <label for="quantity">Quantidade:</label>
            <Field name="quantity" v-slot="{ field }">
                <div class="input-with-addon">
                    <input v-bind="field" id="quantity" type="number" inputmode="decimal" :min="0"
                        :step="unit === 'Unidade' ? 1 : 0.001" class="inputField input-with-addon__input"
                        :aria-describedby="unitSuffix ? 'quantity-addon' : undefined" />
                    <span v-if="unitSuffix" id="quantity-addon" class="input-with-addon__addon">
                        {{ unitSuffix }}
                    </span>
                </div>
            </Field>
            <ErrorMessage name="quantity" class="error" />
        </div>
        <div>
            <MoneyField />
        </div>
        <div>
            <label for="perishable">Produto Perecível:</label>
            <Field name="perishable" as="input" type="checkbox" :value="true" />
            <ErrorMessage name="perishable" class="error" />
        </div>
        <div>
            <label for="expirationDate">Data de Validade:</label>
            <Field name="expirationDate" as="input" type="date" class="inputField" />
            <ErrorMessage name="expirationDate" class="error" />
        </div>
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
import { Field, ErrorMessage, useForm, useFieldValue } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { productSchema } from '@/utils/validationSchema'
import { computed, onMounted } from 'vue'
import { getProductById, getProducts, saveProducts } from '@/utils/localStorage'
import MoneyField from './fields/MoneyField.vue'

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

const unit = useFieldValue('unit')

const unitSuffix = computed(() => {
    switch (unit.value) {
        case 'Litro': return 'Lt'
        case 'Quilograma': return 'Kg'
        case 'Unidade': return 'Un'
        default: return ''
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
    margin-top: 10px;
    font-size: 14px;
    font-weight: 600;
    color: #4b5563;
}

.inputField {
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    border: none;
    margin: 2px;
    font-size: 16px;
    border: 1px solid #e5e7eb;
    color: #4b5563;
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

.input-with-addon {
    position: relative;
    width: 100%;
    display: inline-block;
}

.input-with-addon__input {
    width: 100%;
    padding-right: 3rem;
    /* espaço para o addon */
}

.input-with-addon__addon {
    position: absolute;
    right: .5rem;
    top: 50%;
    transform: translateY(-50%);
    padding: 2px 8px;
    border-radius: 8px;
    background: #eef2f7;
    font-size: .85rem;
    line-height: 1;
    color: #334155;
    pointer-events: none;
    /* não intercepta cliques */
}
</style>
