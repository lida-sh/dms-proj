<template>
  <div class="px-[3rem]  pb-[0.2rem] min-h-screen">

    <div class="flex flex-col gap-4">
      <Form :validation-schema="schema"
        class="card px-4 py-8 flex flex-col sm:grid sm:grid-cols-4 gap-4 w-full rounded-box shadow-lg bg-white">
        <app-select-input name="architecture_id" :label="$t('architecture_id')"
          @selectedItem="(architecture) => handleFilter({ architecture_id: architecture })"
          :options="architectures!"></app-select-input>

        <app-search-input name="search" label="جستجو" v-model="searchWord"
          @clickSearch="searchWord !== '' && handleFilter({ search: searchWord })"></app-search-input>

        <div class="form-control">
          <label class="flex justify-between items-center px-1 pb-1.5" for="status">
            <span class="label-text">{{ $t('status') }}</span>
          </label>
          <select
            class="bg-left-center select-custom focus:ring-0 focus:ring-offset-0 focus:border-gray-300 border-gray-300 rounded-lg h-12 font-normal font-gray-700"
            placeholder="" v-model="status" name="status" @change="handleFilter({ status: status })">
            <option value=""></option>
            <option v-for="(item, index) in items" :key="index" :value="item.value" class="selection:bg-gray-300">{{
              item.title }}</option>
          </select>
        </div>
        <!-- <app-select-input name="status" v-model="status" @selectedItem="(state) => handleFilter({ status: status })"
          :label="$t('status')" :optionsList="items" class=""></app-select-input> -->
        <div class="form-control">
          <label class="flex justify-between items-center px-1 pb-1.5" for="status">
            <span class="label-text">{{ $t('sortedBy') }}</span>
          </label>
          <select
            class="bg-left-center select-custom focus:ring-0 focus:ring-offset-0 focus:border-gray-300 border-gray-300 rounded-lg h-12 font-normal font-gray-700"
            placeholder="" v-model="sortedBy" name="sortedBy" @change="handleFilter({ sortedBy: sortedBy })">
            <option value=""></option>
            <option v-for="(item, index) in sortItems" :key="index" :value="item.value" class="selection:bg-gray-300">{{
              item.title }}</option>
          </select>
        </div>
        <!-- <app-select-input name="sortedBy" @selectedItem="(sorted_by) => handleFilter({ sortedBy: sorted_by })"
          :label="$t('sortedBy')" :optionsList="sortItems" class=""></app-select-input> -->
      </Form>
      <div v-if="!(data?.processes && data?.processes?.length > 0) && !pending" class="">
        فرایندی ثبت نشده است.
      </div>
      <div v-else class="card p-4 gap-4 w-full rounded-box shadow-lg bg-white">
        <h3 class="text-lg font-bold text-gray-700 mb-5">لیست فرایند های مخابرات ایران</h3>
        <table class="table table-zebra ">
          <thead>
            <tr class="bg-gray-200 rounded-lg text-base">
              <th class="text-center">شماره</th>
              <th class="text-right">عنوان</th>
              <th class="text-right">نام مستعار</th>
              <th class="text-right">کد</th>
              <th class="text-right">معماری والد</th>
              <th class="text-center">وضعیت</th>
              <th class="text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data?.processes" class="hover divide-y">
              <!-- <th class="text-center">{{ index }}</th> -->
              <td class="text-center">{{ ((data!.meta.current_page - 1) * data!.meta.per_page) + index + 1 }}</td>
              <td class="text-right">{{ item.title }}</td>
              <td class="text-right">{{ item.slug }}</td>
              <td class="text-right">{{ item.code }}</td>
              <td class="text-right">{{ item.architecture.title }}</td>
              <td class="text-center">
                <span v-if="item.status == 1" class="text-green-500">فعال</span>
                <span v-if="item.status == 0" class="text-red-500">غیر فعال</span>
              </td>
              <td class="text-right flex items-center justify-center gap-2 ">
                <NuxtLink :to="`processes/${item.slug}`" class="btn btn-outline border-sky-700 hover:border-none border-2 btn-sm text-sky-600 text-xs hover:bg-gradient-to-b hover:from-sky-900 hover:to-sky-400 hover:text-white">نمایش
                </NuxtLink>
                <NuxtLink :to="`processes/edit/${item.id}`" class="btn btn-outline border-amber-700 hover:border-none border-2 btn-sm text-amber-600 text-xs hover:bg-gradient-to-b hover:from-amber-900 hover:to-amber-400 hover:text-white">ویرایش
                </NuxtLink>
                <button class="btn btn-outline border-red-700 hover:border-none border-2 btn-sm text-red-600 text-xs hover:bg-gradient-to-b hover:from-red-900 hover:to-red-400 hover:text-white">حذف</button>
                <button class="btn btn-outline border-emerald-700 hover:border-none border-2 btn-sm text-emerald-600 text-xs hover:bg-gradient-to-b hover:from-emerald-900 hover:to-emerald-400 hover:text-white">ارتقا</button>
              </td>

            </tr>
            <hr />
          </tbody>
        </table>

      </div>
      <div class="join flex items-center justify-center mt-5"  v-if="data?.meta.total > data?.meta?.per_page!">
        <button v-for="(link, index) in data?.meta.last_page" :key="index" @click="handleFilter({ page: link })"
          class="join-item btn" :class="{'btn-active': data?.meta.current_page == link}">{{ link }}</button>
        <!-- <button class="join-item btn btn-active">2</button> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin"
})
import { TailwindPagination } from 'laravel-vue-pagination';
import { useGetBaseArchitecturesService } from "~/composables/architectures/useArchitecture.service";
import { useGetProcessesService } from '~/composables/processes/useProcess.service';
import { useProcessFilter } from '~/composables/processes/useProcess.validation';
import { Form } from "vee-validate";
const query = ref({})
const { schema } = useProcessFilter()
const searchWord = ref("")
const status = ref(null)
const sortedBy = ref(null)
const route = useRoute()
const router = useRouter()
router.push({ query: {} })
const items = [
  { title: 'فعال', value: "1" },
  { title: 'غیر فعال', value: "-1" },
]
const sortItems = [
  { title: 'جدیدترین', value: "newest" },
  { title: 'قدیمی ترین', value: "oldest" },
]
const getProcesses = useGetProcessesService()
const { data, pending, error, refresh } = await useAsyncData('processes', () => getProcesses(query.value), { server: false })
const getArchitectures = useGetBaseArchitecturesService()
const { data: architectures } = await useLazyAsyncData('architectures', () => getArchitectures(), {
  server: false
})
// const { data, pending, error } = await useAsyncData('get-processes', async () => {
//   const [architectures, processes] = await Promise.all([getArchitectures(),  getProcesses()]);
//   return { architectures, processes }
// }, { server: false })
useErrorHandler(error)

const handleFilter = (link) => {
  query.value = { ...route.query, ...link }
  router.push({ query: query.value })
  refresh()
  // console.log("query", query.value)
}
// watch(() => route.query, (value) => {
//   if (value == null) {
//     status.value = null
//   }
// })

</script>

<style scoped></style>