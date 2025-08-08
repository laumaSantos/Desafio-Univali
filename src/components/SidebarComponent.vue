<template>
    <aside :class="['sidebar-container', { collapsed }]">
        <button class="toggle-btn" @click="collapsed = !collapsed">
            <ChevronRight v-if="collapsed" class="icon" />
            <ChevronLeft v-else class="icon" />
        </button>
        <nav>
            <ul>
                <li>
                    <RouterLink to="/products" :class="['nav-link', { collapsed }]" active-class="active">
                        <Box class="icon" />
                        <span v-if="!collapsed">Ver Produtos</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/products/new" :class="['nav-link', { collapsed }]" active-class="active">
                        <Plus class="icon" />
                        <span v-if="!collapsed">Criar Produto</span>
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import { Box, Plus, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const collapsed = ref(false)
</script>

<style scoped>
.sidebar-container {
    background-color: #114da6;
    color: white;
    width: 220px;
    padding: 1rem 0;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    transition: width 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-right: 1px solid #1e3a8a;
}

.sidebar-container.collapsed {
    width: 72px;
    padding: 1rem 0;
}

.toggle-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    align-self: flex-end;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.nav-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    color: #e0e7ff;
    font-weight: 500;
    text-decoration: none;

}

.nav-link.collapsed {
    justify-content: center;
}

.nav-link:not(.active):hover {
    background-color: #3b61d1;
    color: #ffffff;
}

.active {
    background-color: #3b82f6;
    color: white;
    font-weight: 600;
}

.icon {
    width: 20px;
    height: 20px;
}
</style>
