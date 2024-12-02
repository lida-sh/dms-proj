import { useAuthStore } from "~/composables/auth/Auth.store"

export default defineNuxtPlugin((nuxtApp)=>{
    const pinia = nuxtApp.$pinia;
    const authStore = useAuthStore(pinia);
    authStore.initialStateFromLocalStorage();
})