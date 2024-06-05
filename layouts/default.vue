<template>
  <div>
    <header class="header">
      <v-app-bar color="#03c58e" :elevation="4" class="header__body">
        <div class="container">
          <v-app-bar-title class="header__title">{{ title }}</v-app-bar-title>
        </div>
      </v-app-bar>
    </header>
    <main class="main">
      <div class="container">
        <slot/>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()

const title = computed(() => {
  if (route.path === "/") return "Все штрафы"
  else if (route.path === "/edit") return "Оформление нового штрафа"
  else if (route.path === `/edit/${route.params.id}`) return `Редактирование штрафа № ${route.params.id}`
})

</script>

<style lang="scss" scoped>
.header {
  display: flex;
  width: 100%;
}

.main {
  display: flex;
  flex: 1 1 auto;
  margin-top: 6rem;
  height: 100%;
  width: 100%;
  flex-direction: column;
}

.container {
  width: 870px;
  padding: 0 15px;
  margin: 0 auto;
}

.header__title {
  color: #fff;
  margin-left: 1rem;
}
</style>