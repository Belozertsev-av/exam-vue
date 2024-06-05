import {defineStore} from 'pinia'

export const useUser = defineStore('user', () => {
    const state = reactive(<IUser>{
        id: 0,
        login: "petya",
        password: "123"
    })

    const getUserPassword = computed(() => state.password)

    function cryptPassword() {
        return state.password + "123"
    }

    return {state, getUserPassword, cryptPassword}
})