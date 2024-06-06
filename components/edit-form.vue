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

    <v-text-field
        v-model="date"
        label="Введите дату в формате 11.11.2011">
    </v-text-field>
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
import {useStore} from "~/stores/useStore";
import type {ICar, IFineType} from "~/model/types";

const store = useStore()
const route = useRoute()
const routeProps = ref(store.getFineById(Number(route.params.id)) ?? null)
console.log(routeProps.value)

const cars = ref<ICar[]>(store.getCars() as ICar[] ?? [])
const fines = ref<IFineType[]>(store.getFineTypes() as IFineType[] ?? [])


const car = ref<string>((routeProps.value) ? routeProps.value.car!.number + ' ' + routeProps.value.car!.name : "")
const fineType = ref<string>((routeProps.value) ? routeProps.value.fineType!.fine : "")
const date = ref<string>((routeProps.value) ? routeProps.value.date : "")

const carItems = computed(() => {
  return cars.value.map(it => it.number + " " + it.name)
})
const fineTypeItems = computed(() => {
  return fines.value.map(it => it.fine)
})

const submit = () => {
  if (route.path !== `/edit`) store.editFine(routeProps.value.id, {
    id: routeProps.value.id,
    date: date.value,
    car: cars.value.find(it => (it.number + " " + it.name) === car.value)!,
    fineType: fines.value.find(it => it.fine === fineType.value)!
  })
  else store.addFine({
    id: store.getLastIndexOfFine() + 1,
    date: date.value,
    car: cars.value.find(it => (it.number + " " + it.name) === car.value)!,
    fineType: fines.value.find(it => it.fine === fineType.value)!
  })

  navigateTo("/")
}
const reset = () => {
  car.value = ""
  fineType.value = ""
  date.value = ""
}
</script>

<style scoped lang="scss">
.form__btn {
  margin-top: 2rem;
}
</style>