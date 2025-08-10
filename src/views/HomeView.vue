<template>
  <div class="containerInformation">
    <h1>O que você deseja fazer?</h1>
    <div>
      <router-link to="/products" class="card-link">
        <Box class="card-icon" />
        <p>Ver produtos</p>
      </router-link>

      <router-link to="/products/new" class="card-link">
        <Plus class="card-icon" />
        <p> Cadastrar produtos</p>
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Box, Plus } from 'lucide-vue-next'
</script>
<style scoped>
.card-icon {
  width: 54px;
  height: 34px;
  flex-shrink: 0;
  font-size: initial;
}

.containerInformation {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 50px;
}

.containerInformation div {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-direction: row;
}

.card-link {
  color: white;
  text-decoration: none;
  padding: 40px 30px;
  background: var(--blue-7);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
  height: 200px;
  margin-top: 50px;
  font-size: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  text-align: center;
}
</style>