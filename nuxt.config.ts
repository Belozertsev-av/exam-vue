import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
    build: {
        transpile: ['vuetify'],
    },
    modules: [
        (_options, nuxt) => {
        nuxt.hooks.hook('vite:extendConfig', (config) => {
            // @ts-ignore
            config.plugins.push(vuetify({ autoImport: true }))
        })
    },
        '@pinia/nuxt',
        '@nuxtjs/color-mode'
    ],
    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
    devtools: {enabled: true},
    pinia: {
        storesDirs: ['./stores/**'],
    },
    colorMode: {
        preference: 'system',
        fallback: 'light',
        hid: 'nuxt-color-mode-script',
        globalName: '__NUXT_COLOR_MODE__',
        componentName: 'ColorScheme',
        classPrefix: '',
        classSuffix: '-mode',
        storageKey: 'nuxt-color-mode'
    },
    css: [
        './assets/styles/main.scss'
    ],
})
