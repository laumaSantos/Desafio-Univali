<template>
    <div v-if="open" class="modal-overlay" @click.self="handleCancel">
        <div class="modal-card" role="dialog" aria-modal="true" :aria-labelledby="ids.title"
            :aria-describedby="ids.desc">
            <header class="modal-header">
                <h2 :id="ids.title" class="modal-title">{{ title }}</h2>
            </header>

            <p :id="ids.desc" class="modal-message">
                {{ message }}
            </p>

            <footer class="modal-actions">
                <button type="button" class="btn-cancel" @click="handleCancel">
                    {{ cancelText }}
                </button>
                <button type="button" class="btn-confirm" @click="handleConfirm" autofocus>
                    {{ confirmText }}
                </button>
            </footer>

            <button class="modal-x" @click="handleCancel" aria-label="Fechar">×</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
    open: boolean
    title?: string
    message?: string
    confirmText?: string
    cancelText?: string
    idBase?: string
}>()

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void
    (e: 'confirm'): void
    (e: 'cancel'): void
}>()

const ids = computed(() => {
    const base = props.idBase || 'confirm-modal'
    return { title: `${base}-title`, desc: `${base}-desc` }
})

function handleCancel() {
    emit('cancel')
    emit('update:open', false)
}
function handleConfirm() {
    emit('confirm')
    emit('update:open', false)
}

function onKey(e: KeyboardEvent) {
    if (!props.open) return
    if (e.key === 'Escape') handleCancel()
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, .45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-card {
    position: relative;
    width: min(92vw, 460px);
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, .15);
    padding: 20px;
}

.modal-header {
    margin-bottom: 10px;
}

.modal-title {
    margin: 0;
    font-size: 1.1rem;
    color: #0f172a;
}

.modal-message {
    margin: 10px 0 20px;
    color: #334155;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: .5rem;
}

.btn-cancel {
    background: #e5e7eb;
    color: #111827;
    border: none;
    padding: .5rem .9rem;
    border-radius: 8px;
    cursor: pointer;
}

.btn-cancel:hover {
    background: #d1d5db;
}

.btn-confirm {
    background: #114da6;
    color: #fff;
    border: none;
    padding: .5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
}

.btn-confirm:hover {
    background: #2563eb;
}

.modal-x {
    position: absolute;
    top: 10px;
    right: 12px;
    border: none;
    background: transparent;
    font-size: 1.25rem;
    cursor: pointer;
    color: #64748b;
}

.modal-x:hover {
    color: #0f172a;
}
</style>
