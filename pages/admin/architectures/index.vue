<template>
  <div class="px-[3rem]  pb-[0.2rem] min-h-screen">
    <div v-if="!data" class="card p-8 w-full h-40 rounded-box shadow-lg bg-white flex items-center justify-center">
      معماری ثبت نشده است.
        </div>
    <div v-else class="card px-16 py-8 flex flex-col gap-4 w-full rounded-box shadow-lg bg-white">
      <h3 class="text-lg font-bold text-gray-700 mb-5">لیست معماری های مخابرات ایران</h3>
      <table class="table table-zebra ">
        <thead>
          <tr class="bg-stone-300 rounded-lg text-base">
            <th class="text-center">شماره</th>
            <th class="text-right">عنوان</th>
            <th class="text-right">نام مستعار</th>
            <th class="text-right">کد</th>
            <!-- <th class="text-right">توضیحات</th> -->
            <th class="text-center">عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index" class="hover divide-y">
            <!-- <th class="text-center">{{ index }}</th> -->
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-right">{{ item.displayTitle }}</td>
            <td class="text-right">{{ item.slug }}</td>
            <td class="text-right">{{ item.code }}</td>
            <!-- <td class="text-right">{{ item.description }}</td> -->
            <td class="text-right flex items-center justify-center gap-2 ">
              <NuxtLink :to="`architectures/${item.slug}`"
                class="btn btn-outline border-sky-700 hover:border-none border-2 btn-sm text-sky-600 text-xs hover:bg-gradient-to-b hover:from-sky-900 hover:to-sky-400 hover:text-white">
                نمایش
              </NuxtLink>
              <NuxtLink :to="`architectures/edit/${item.id}`"
                class="btn btn-outline border-amber-700 hover:border-none border-2 btn-sm text-amber-600 text-xs hover:bg-gradient-to-b hover:from-amber-900 hover:to-amber-400 hover:text-white">
                ویرایش
              </NuxtLink>
              <button
                class="btn btn-outline border-red-700 hover:border-none border-2 btn-sm text-red-600 text-xs hover:bg-gradient-to-b hover:from-red-900 hover:to-red-400 hover:text-white">حذف</button>
              <button
                class="btn btn-outline border-emerald-700 hover:border-none border-2 btn-sm text-emerald-600 text-xs hover:bg-gradient-to-b hover:from-emerald-900 hover:to-emerald-400 hover:text-white">ارتقا</button>
            </td>

          </tr>
          <hr />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin"
})

import { useGetArchitecturesService, useGetBaseArchitecturesService } from '~/composables/architectures/useArchitecture.service';

const getArchitectures = useGetArchitecturesService()
const { data, pending, error } = await useAsyncData('architectures', () => getArchitectures(), { server: false })

console.log("data", data.value)


</script>

<style scoped></style>