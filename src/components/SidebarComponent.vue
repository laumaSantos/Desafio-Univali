<template>
    <aside class="sidebar">
        <h2 class="title">Item Manager</h2>
        <nav>
            <ul>
                <li>
                    <RouterLink to="/products" class="nav-link" active-class="active">Ver projetos</RouterLink>
                </li>
                <li>
                    <RouterLink to="/products/new" class="nav-link" active-class="active">Criar Produto</RouterLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.sidebar {
    width: 200px;
    background-color: #233568;
    color: white;
    padding: 1.5rem;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
}

.title {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
}

.nav-link {
    display: block;
    color: white;
    text-decoration: none;
    margin-bottom: 1rem;
}

.active {
    font-weight: bold;
    text-decoration: underline;
}
</style>
