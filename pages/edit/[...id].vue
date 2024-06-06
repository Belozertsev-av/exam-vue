<template>
  <div class="container">
    <v-btn class="cancel__button"
           variant="flat"
           prepend-icon="mdi-arrow-left" to="/">Назад
    </v-btn>
    <edit-form></edit-form>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.cancel__button {
  margin-bottom: 2rem;
}
</style>