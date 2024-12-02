<template>
  <div class="bg-[#F7F7F7] flex flex-col">
    <AdminHeader></AdminHeader>
    <!-- <div class="pt-[5px] lg:pt-[10px] relative w-full bg-white h-full"> -->
      <!-- <div v-if="pageLoading"
        class="bg-black backdrop-blur-[1px] bg-opacity-70 fixed inset-0 h-full w-full flex items-center justify-center overflow-hidden z-[5000]">
        <UiLoadingSpinner></UiLoadingSpinner> 
      </div> -->
      <div
        class="w-full h-full max-w-[110rem] pt-[1.5rem] lg:pt-[5rem] mx-auto gap-2 2xl:gap-[0.5rem] lg:px-2 flex items-start pb-20">
        <AdminMenuDashbard class="hidden xl:block sticky top-20 max-w-[16.5rem] min-w-[13rem] dashboard-card w-full">
        </AdminMenuDashbard>
        <main class="w-full">
          <slot></slot>
        </main>
        
      </div>
      <Footer></Footer>
    <!-- </div> -->
  </div>


</template>

<script setup lang="ts">
import { useAuthStore } from '~~/composables/auth/Auth.store';
const pageLoading = ref(true)
const authStore = useAuthStore()
onMounted(() => {
  pageLoading.value = false
  authStore.fetchAndSetIdentityIfLoggedin()
})





</script>

<style scoped></style>