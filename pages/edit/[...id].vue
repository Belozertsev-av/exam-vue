<template>
  <div class="container">
    <v-btn class="cancel__button"
           variant="flat"
           prepend-icon="mdi-arrow-left" to="/">Назад
    </v-btn>
    <edit-form
        :cars="cars"
        :fines="fines"></edit-form>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import type {ICar, IFineType} from "~/model/types";
import {getAllCars, getAllFineTypes} from "~/model/endpoints";

const cars = ref<ICar[]>(await getAllCars() ?? [])
const fines = ref<IFineType[]>(await getAllFineTypes() ?? [])
</script>

<style scoped lang="scss">
.cancel__button {
  margin-bottom: 2rem;
}
</style>