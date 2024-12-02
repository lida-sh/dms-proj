<template>
    <div class="relative flex justify-between items-center px-10 py-2.5 shadow-lg min-h-[4.25rem] bg-white">
        <section>
            <button class="block lg:hidden" @click="openMenu">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
            <div ref="target" class="flex flex-col lg:flex-row lg:w-auto absolute lg:static bg-white inset-x-10 h-0 lg:h-auto invisible lg:visible lg:bg-transparent lg:space-x-1 xl:space-x-2 lg:space-x-reverse rounded-box lg:rounded-none border lg:border-none shadow-lg lg:shadow-none mt-1 lg:mt-0 divide-y divide-gray-200 lg:divide-none">
               <router-link v-for="(item, index) in links" :key="`menu-${index}`" :to="item.to" class="py-4 pr-4 text-sm lg:text-base">{{ item.title }}</router-link>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
const links = [
//   { title: "صفحه اصلی", to: "/" },
  { title: "معماری سازمانی", to: "/" },
  { title: "مستندات درون سازمانی", to: "/" },
  { title: "مستندات برون سازمانی", to: "/" },
  { title: "اقدام اصلاحی", to: "/" },
  { title: "گزارش ها", to: "/" },
  { title: "سوابق  مطالعاتی", to: "/" },
  { title: "راهنمای سامانه", to: "/" },
];
const {target, openMenu} = useMenu()
</script>

<style scoped></style>