<template>
  <div class="container">
    <div class="search">
      <v-text-field
          v-model="liveSearch"
          append-inner-icon="mdi-magnify"
          density="compact"
          label="Начните вводить номер машины"
          variant="solo"
          hide-details
          single-line
          @input="search"
          @click:append-inner="search"
      ></v-text-field>
      <v-btn class="btn-top" elevation="2" to="edit">
        Оформить
      </v-btn>
    </div>
    <v-card v-if="isModalOpen" elevation="2" variant="tonal"
            :color="answer.color" class="message-box">
      <p class="message-text">{{ answer.text }}</p>
      <VIcon @click="isModalOpen = false" icon="mdi-window-close"/>
    </v-card>
    <div class="page-title">Штрафы:</div>
    <v-data-iterator :items="filtratedItems" :page="page" :items-per-page="itemsPerPage">
      <template
          v-for="item in filtratedItems"
          :key="item.id"
      >
        <v-card class="card" elevation="4">
          <template v-slot:title>
            {{ (item.car as ICar).number }}
          </template>
          <template v-slot:subtitle>
            {{ (item.car as ICar).ownerName }}
          </template>
          <template v-slot:text>
            <div class="blocks">
              <div class="block">
                <p>Машина: {{ (item.car as ICar).name }}</p>
                <p>Дата нарушения: <span class="bold">{{ item.date }}</span></p>
              </div>
              <div class="block">
                <p>Нарушение: {{ (item.fineType as IFineType).fine }}</p>
                <p>Сумма штрафа: <span class="bold">{{ (item.fineType as IFineType).amount }}</span></p>
              </div>
            </div>
          </template>
          <v-card-actions>
            <v-btn class="btn" elevation="2" @click="navigateToIdPage(item)">
              Редактировать
            </v-btn>
            <v-btn class="btn" variant="tonal" color="red" @click="store.deleteFine(item.id)">Удалить</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-data-iterator>
    <v-pagination :length="filtratedItems.length / itemsPerPage"
                  v-model="page"
                  @next="page++"
                  @prev="page--"
                  @first="1"
                  @last="filtratedItems.length / itemsPerPage"></v-pagination>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {debounce} from "perfect-debounce";
import {useStore} from "~/stores/useStore";
import type {ICar, IFine, IFineType} from "~/model/types";

const store = useStore()

const page = ref(1)
const itemsPerPage = ref(5)
const items = ref<IFine[]>(store.getFines() ?? [])
const filtratedItems = ref<IFine[]>(items.value)

const liveSearch = ref<string | null>(null)

const isModalOpen = ref<boolean>(false)
const answer = ref({})

const deleteFine = async (id: number) => {
  answer.value = store.deleteFine(id)
  items.value = []
  items.value = store.getFines() ?? []
  isModalOpen.value = true
}

const search = debounce(() => {
  if (liveSearch.value) {
    filtratedItems.value = items.value.filter(it => it.date.toLowerCase().includes(liveSearch.value!.toLowerCase()))
  } else filtratedItems.value = items.value
}, 500)

const navigateToIdPage = (item: IFine) => {
  navigateTo({
    path: `edit/${item.id}`,
  })
}
</script>

<style lang="scss" scoped>
.card {
  margin: 1rem;
}

.blocks {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.block {
  display: flex;
  flex-direction: column;

  &:last-child {
    margin-left: 5rem;
  }
}

.bold {
  display: inline;
  font-weight: bold;
}

.btn {
  margin: 0 0 1rem 0;
}

.btn-top {
  margin-left: 1rem;
}

.subtitle {
  margin-left: 2rem;
}

.search {
  display: flex;
  align-items: center;
  padding: 1rem;
}

.page-title {
  font-size: 1.2rem;
  margin-left: 1rem;
}

.message-box {
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  padding: 1rem;
}
</style>