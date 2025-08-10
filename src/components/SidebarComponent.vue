<template>
    <aside v-if="!isMobile" :class="['sidebar-container', { collapsed }]">
        <button class="toggle-btn" @click="collapsed = !collapsed">
            <ChevronRight v-if="collapsed" class="icon" />
            <ChevronLeft v-else class="icon" />
        </button>
        <nav>
            <ul>
                <li>
                    <RouterLink to="/" :class="['nav-link', { collapsed }]" active-class="active">
                        <Home class="icon" />
                        <span v-if="!collapsed">Início</span>
                    </RouterLink>
                </li>
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
    <nav v-else class="mobile-navbar">
        <RouterLink to="/" class="mobile-link" active-class="active">
            <Home class="icon" />
            <span>início</span>
        </RouterLink>
        <RouterLink to="/products" class="mobile-link" active-class="active">
            <Box class="icon" />
            <span>Produtos</span>
        </RouterLink>
        <RouterLink to="/products/new" class="mobile-link" active-class="active">
            <Plus class="icon" />
            <span>Criar</span>
        </RouterLink>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

import { Box, Plus, ChevronLeft, ChevronRight, Home } from 'lucide-vue-next'

const collapsed = ref(false)
const isMobile = ref(false)

function handleResize() {
    collapsed.value = window.innerWidth < 1020
    isMobile.value = window.innerWidth < 770
}

onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.mobile-navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #114da6;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.5rem 0;
    z-index: 2;
    border-bottom: 1px solid #1e3a8a;
}

.mobile-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #e0e7ff;
    text-decoration: none;
    font-size: 0.75rem;
}

.mobile-link .icon {
    width: 20px;
    height: 20px;
}

.mobile-link.active {
    color: #ffffff;
    font-weight: 600;
}

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
