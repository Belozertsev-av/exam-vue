<template>
  <form @submit.prevent="submit">
    <v-select
        v-model="car"
        :items="carItems"
        label="Автомобиль"
    ></v-select>

    <v-select
        v-model="fineType"
        :items="fineTypeItems"
        label="Тип штрафа"
    ></v-select>

    <v-btn
        class="form__btn me-4"
        type="submit"
    >
      {{ (route.path === `/edit/${route.params.id}`) ? "Редактировать" : "Создать" }}
    </v-btn>

    <v-btn variant="tonal" color="red" @click="reset" class="form__btn">
      Очистить
    </v-btn>
  </form>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import type {ICar, IFineType} from "~/model/types";
import {createFine, getAllCars, getAllFineTypes, updateFineById} from "~/model/endpoints";

const route = useRoute()
const routeProps = route.query as {
  car: string,
  fineType: string,
  date: Date | null
}

const cars = ref<ICar[]>([])
const fines = ref<IFineType[]>([])

const carItems = ref<string[]>([])
const fineTypeItems = ref<string[]>([])

const car = ref<string>((routeProps.car) ? routeProps.car : "")
const fineType = ref<string>((routeProps.fineType) ? routeProps.fineType : "")
const date = ref<Date | null>((routeProps.date) ? routeProps.date : null)

cars.value = await getAllCars() ?? []
fines.value = await getAllFineTypes() ?? []

carItems.value = cars.value.map(it => it.number + " " + it.name)
fineTypeItems.value = fines.value.map(it => it.fine)

const submit = async () => {
  if (route.path === `/edit/${route.params.id}`) {
    await updateFineById(Number(route.params.id), {
      car: car.value,
      fineType: fineType.value,
      date: date.value,
      carId: cars.value.find(it => it.number + " " + it.name === car.value)?.id,
      fineTypeId: fines.value.find(it => it.fine === fineType.value)?.id
    })
  } else {
    await createFine({
      car: car.value,
      fineType: fineType.value,
      date: date.value,
      carId: cars.value.find(it => it.number + " " + it.name === car.value)?.id,
      fineTypeId: fines.value.find(it => it.fine === fineType.value)?.id
    })
  }
  navigateTo("/")
}
const reset = () => {
  car.value = ""
  fineType.value = ""
  date.value = null
}
</script>

<style scoped lang="scss">
.form__btn {
  margin-top: 2rem;
}
</style>