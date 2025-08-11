<template>
    <div>
        <label for="price">Preço:</label>

        <Field name="price" :rules="priceRules" v-slot="{ field }">
            <input v-bind="field" id="price" v-money3="moneyOpts" class="inputField" inputmode="decimal"
                autocomplete="off" @wheel.prevent />
        </Field>

        <ErrorMessage name="price" class="error" />
    </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'

const moneyOpts = {
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    precision: 2,
    masked: false
}

const priceRules = (val: null | string | number | unknown) => {
    if (val === null || val === undefined || val === '') return 'Preço é obrigatório'
    const n = Number(val)
    if (Number.isNaN(n)) return 'Preço inválido'
    if (n <= 0) return 'Informe um valor maior que zero'
    return true
}
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
    font-size: 14px;
    border: 1px solid #e5e7eb;
    color: #4b5563;
}

.error {
    color: red;
    font-size: 0.875rem;
}
</style>
