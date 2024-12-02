<template>
   <div class="min-w-16 relative transition duration-1000" :class="{ 'opacity-0': !authStore.getFullName }">
      <button v-if="authStore.isLoggedIn" class="btn btn-link no-animation lg:ml-2 flex items-center no-underline"
         @click="openMenu">
         <span>{{ authStore.getFullName }}</span>
         <IconsArrowDownSmall></IconsArrowDownSmall>
      </button>
      
   </div>
   <div class="absolute bg-white rounded-br-lg border left-0  top-20 w-[20rem] z-30 invisible h-0 flex flex-col p-1 divide-y"
         ref="target">
         <router-link v-for="(item, index) in links" :key="`item-${index}`" :to="item.to" :class="item.style" class="py-4 flex items-center gap-4"><div class="flex items-center gap-[0.625rem] pr-[1rem]">
              <component :is="item.icon" ></component>
              <span class="font-bold text-sm">{{ item.title }}</span>
            </div>
         </router-link>
      </div>
</template>

<script setup lang="ts">
import ProfileUserAcount from "~~/components/icons/admin/ProfileUserAcount.vue"
import { useAuthStore } from '~/composables/auth/Auth.store';
import { useLogout } from '~/composables/auth/useLogout';
import IconsAdminSignout  from "~/components/icons/admin/Signout.vue";
import IconsAdminProfileAcount from "~/components/icons/admin/ProfileAcount.vue";
const links = [
  { title: "پروفایل", to: "/", icon: IconsAdminProfileAcount},
  { title: "خروج", to: "/logout",icon: IconsAdminSignout, style: "text-red-600" },
];
const authStore = useAuthStore()
const { logout } = useLogout()
const { target, openMenu } = useMenu()
</script>

<style scoped>
.no-underline {
   text-decoration-line: none;
}
</style>