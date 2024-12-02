<template>
    <div class="px-[3rem]  pb-[0.2rem]">
        <div class="bg-white shadow-lg rounded-2xl p-[5rem]">
            <template v-if="architecture">
                <h3 class="mb-10 text-lg text-gray-600 font-bold">ویرایش معماری {{ architecture?.displayTitle }}</h3>
                <Form :validation-schema="schema" @submit="submit"
                    class="grid grid-cold-1 sm:grid-cols-2 gap-8 items-center">
                    <app-text-input name="title" v-model="architecture.title" :label="$t('title')"
                        class=""></app-text-input>
                    <app-text-input name="code" v-model="architecture.code" :label="$t('code')"
                        class=""></app-text-input>
                    <app-select-input name="type" :optionsList="options" v-model="architecture.type" :label="$t('type')"
                        class=""></app-select-input>
                    <app-file-input name="files" :label="$t('files')" class="w-full"></app-file-input>
                    <div class="flex flex-col sm:flex-row flex-wrap items-center gap-4 col-span-2">
                        <template v-for="(item, index) in filesArchitecture" :key="index">
                            <div class="relative flex items-center justify-center px-2 py-3 w-40 shadow-lg rounded-lg">
                                <type-file-display :file-name="item.fileName" :file-path="item.filePath"></type-file-display>
                                <button class="absolute right-2 top-2 text-red-600" type="button" @click="deleteFile(item.id)">
                                    <IconsAdminClose></IconsAdminClose>
                                </button>
                            </div>
                        </template>

                        <!-- <font-awesome-icon icon="file-word" size="2x" style="color:#145DA0" /> -->
                        <!-- <font-awesome-icon :icon="['fal', 'file-word']" color="blue" size="2x"/>
                        <font-awesome-icon :icon="['fal', 'file-word']" color="blue" size="2x"/> -->
                        <!-- <font-awesome-icon icon="file-pdf" size="2x" style="color:#cf6130" />
                        <font-awesome-icon icon="file-image" size="2x" style="color:#44bb6c" />
                        <font-awesome-icon icon="file-jpg" size="2x" style="color:#b0b847" /> -->
                    </div>

                    <app-text-input name="description" v-model="architecture.description" area
                        :label="$t('description')" class="col-span-2"></app-text-input>
                    <app-button type="submit" :loading="loading"
                        class="btn btn-block col-span-2 bg-indigo-800 hover:bg-indigo-500 text-white mt-2">{{
                            $t('submit')
                        }}</app-button>
                </Form>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "admin"
})
import type { FileDto } from '~~/composables/file.dto';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import { Form } from "vee-validate"
import { useGetArchitectureByIdService } from "~/composables/architectures/useArchitecture.service";
import { useEditArchitectureValidation } from "~/composables/architectures/useArchitecture.validation";
import { useEditArchitecture } from "~/composables/architectures/useEditArchitecture";
const route = useRoute();

const options = [
    {
        title: "اداره کل",
        value: "administration"
    },
    {
        title: "معاونت",
        value: "assistance"
    },
]
const fileIdsForDeleteArray = ref<number[]>([])
const filesArchitecture = ref<FileDto[]>([])
const { $t } = useNuxtApp()
const { schema } = useEditArchitectureValidation()
const { submit, loading } = useEditArchitecture(route.params.id, fileIdsForDeleteArray.value)

const getArchitecture = useGetArchitectureByIdService()

const { data: architecture, pending } = await useAsyncData("architecture" + route.params.id, () => getArchitecture(route.params.id as string), { server: false })
watch(architecture, (value)=>{
    if(architecture.value){
        filesArchitecture.value = architecture?.value.files
    }
    
},{immediate:true})
// if (architecture.value) {
//     filesArchitecture.value = architecture.value.files
// }
const deleteFile = (id: number) => {
    fileIdsForDeleteArray.value?.push(id);
    console.log("click", fileIdsForDeleteArray.value)
    let index = filesArchitecture.value.findIndex((item) => item.id === id)
    console.log("index", index)
    filesArchitecture.value.splice(index, 1)
    console.log("test", filesArchitecture.value)
}
console.log("recieve architecte is", architecture.value)
</script>

<style scoped></style>