<template>
  <div class="containerInformation">
    <h1>Deseja cadastrar um novo produto?</h1>
    <button>
      <router-link to="/new-product">Clique aqui</router-link>
    </button>
    <router-link to="/products">Ver produtos</router-link>
  </div>
</template>
<script setup lang="ts">

</script>
<style scoped>
.containerInformation {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 50px;
}
</style>