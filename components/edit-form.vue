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

    <v-menu :close-on-content-click="true">
      <template v-slot:activator="{ props }">
        <v-text-field readonly v-model="date" :value="date" v-bind="props" label="Дата оформления"
                      variant="solo" class="sorting__search-to" append-inner-icon="mdi mdi-calendar-blank">
        </v-text-field>
      </template>
      <v-date-picker v-model="date" color="#03c58e">
      </v-date-picker>
    </v-menu>

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
import {type PropType, ref} from 'vue'
import {updateFineById} from "~/model/endpoints";
import type {ICar, IFineType} from "~/model/types";
import {useFine} from "~/stores/useUser";

const props = defineProps({
  cars: {
    type: Object as PropType<ICar[]>,
    required: true,
  },
  fines: {
    type: Object as PropType<IFineType[]>,
    required: true,
  }
})
const route = useRoute()
const routeProps = route.query as {
  car: string,
  fineType: string,
  date: string | null
}

const {state, addFine} = useFine()
const car = ref<string>((routeProps.car) ? routeProps.car : "")
const fineType = ref<string>((routeProps.fineType) ? routeProps.fineType : "")
const date = ref<string | null>((routeProps.date) ? routeProps.date : null)

const carItems = computed(() => {
  return props.cars.map(it => it.number + " " + it.name)
})
const fineTypeItems = computed(() => {
  return props.fines.map(it => it.fine)
})

const submit = async () => {
  if (route.path === `/edit/${route.params.id}`) {
    await updateFineById(Number(route.params.id), {
      car: props.cars.find(it => it.number + " " + it.name === car.value),
      fineType: props.fines.find(it => it.fine === fineType.value),
      date: date.value!,
      carId: props.cars.find(it => it.number + " " + it.name === car.value)?.id,
      fineTypeId: props.fines.find(it => it.fine === fineType.value)?.id
    })
  } else {
    await addFine({
      date: date.value!,
      car: props.cars.find(it => it.number + " " + it.name === car.value)!,
      carId: props.cars.find(it => it.number + " " + it.name === car.value)?.id!,
      fineType: props.fines.find(it => it.fine === fineType.value)!,
      fineTypeId: props.fines.find(it => it.fine === fineType.value)?.id!
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