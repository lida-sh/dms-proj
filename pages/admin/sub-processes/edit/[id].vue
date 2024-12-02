<template>
    <div class="px-[3rem]  pb-[0.2rem]">
        <div class="bg-white shadow-lg rounded-2xl p-4 sm:p-[5rem]" v-if="data?.subProcess">
            <h3 class="mb-3 text-lg text-gray-600 font-bold">ویرایش زیر فرایند {{ data?.subProcess?.title }}</h3>
            <hr class="mb-5 sm:mb-10">
            <Form :validation-schema="schema" @submit="submit">
                <div class="flex flex-col sm:grid sm:grid-cols-2 sm:gap-6">
                    <app-select-input name="architecture_id" :options="data?.architectures!"
                        :label="$t('architecture_id')" class="col-span-1" @selectedItem="changeSelectItem"
                        v-model="data!.subProcess!.architecture_id"></app-select-input>
                    <app-select-input name="process_id" :options="processes!" :label="$t('process_id')"
                        class="col-span-1" v-model="data!.subProcess!.process_id"></app-select-input>
                    <app-text-input name="title" :label="$t('title')" class="col-span-1 sm:col-span-2"
                        v-model="data!.subProcess!.title"></app-text-input>
                    <app-code-input name="code" :label="$t('code')" class="col-span-1"
                        v-model="data!.subProcess!.code"></app-code-input>
                    <app-select-input name="status" :options-list="options" :label="$t('status')"
                        v-model="data!.subProcess!.status" class="col-span-1"></app-select-input>
                    <div class="flex col-span-2">
                        <app-file-input name="files" :label="$t('files')" class="w-full"></app-file-input>
                    </div>
                    <div class="flex flex-col sm:flex-row flex-wrap items-center gap-4 col-span-2">
                        <template v-for="(item, index) in filesProcess" :key="index">
                            <div class="relative flex items-center justify-center px-2 py-3 w-40 shadow-lg rounded-lg">
                                <type-file-display :file-name="item.fileName"></type-file-display>
                                <button class="absolute right-2 top-2 text-red-600" type="button"
                                    @click="deleteFile(item.id)">
                                    <IconsAdminClose></IconsAdminClose>
                                </button>
                            </div>
                        </template>
                    </div>
                    <app-text-input name="description" area :label="$t('description')"
                        v-model="data!.subProcess!.description" class="sm:col-span-2"></app-text-input>
                    <app-button type="submit" :loading="loading"
                        class="btn btn-block sm:col-span-2 bg-indigo-800 hover:bg-indigo-500 text-white mt-2">{{
                            $t('submit')
                        }}</app-button>
                </div>
            </Form>

        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "admin"
})
import { Form, type FormActions } from "vee-validate"
import { useCreateArchitectureService, useGetBaseArchitecturesService } from "~/composables/architectures/useArchitecture.service";

import { ToastEnum, ButtonVariantEnum } from "~/types";


const { $t } = useNuxtApp()
// const loading = ref<boolean>(false);

const { schema } = useEditSubProcessValidation()
const { showToast } = useToast();

import { useErrorHandler } from "~/composables/useErrorHandler";
import type { ArchitectureBaseDto } from "~/composables/architectures/architecture.dto";
import { useGetBaseProcessesService } from "~/composables/processes/useProcess.service";
import type { ProcessBaseDto } from "~/composables/processes/process.dto";
import { useEditSubProcessValidation } from "~/composables/sub-processes/useSubProcess.validation";
import { useCreateSubProcessService, useGetSubProcessByIdService } from "~/composables/sub-processes/useSubProcess.service";
import type { FileDto } from "#imports";
import { useEditSubProcess } from "~/composables/sub-processes/useEditSubProcess";
const options = [
    {
        title: "فعال",
        value: "1"
    },
    {
        title: "غیر فعال",
        value: "0"
    },
]
const route = useRoute();
const fileIdsForDeleteArray = ref<number[]>([])
const filesProcess = ref<FileDto[]>([])
const processes = ref<ProcessBaseDto[]>([])
const architectureIdSelected = ref<number | null>(null)
const architectureSelected = ref<ArchitectureBaseDto | null>(null)
const createSubProcess = useCreateSubProcessService();
const getArchitectures = useGetBaseArchitecturesService()
const getProcesses = useGetBaseProcessesService();
const getSubProcessById = useGetSubProcessByIdService();
// const { data: architectures, error } = await useLazyAsyncData('architectures', () => getArchitectures({ toastError: true }), {
//     server: false
// })

// useErrorHandler(error)

const { data, pending, error } = await useAsyncData('edit-sub-process' + route.params.id, async () => {
    const [architectures, subProcess] = await Promise.all([getArchitectures(), getSubProcessById(route.params.id as string)]);
    return { architectures, subProcess }
}, { server: false })
useErrorHandler(error)
watch(data, async (value) => {
    if ((data.value)?.subProcess) {
        filesProcess.value = (data.value)?.subProcess?.files
        if (data.value && (data.value)?.architectures) {
            const { data: processesData } = await useLazyAsyncData('processes-architecture', () => getProcesses(data!.value!.subProcess.architecture_id as number, { toastError: true }), {
                server: false
            })
            if (processesData.value) {
                processes.value = processesData.value
            }
        }
    }

}, { immediate: true })
const deleteFile = (id: number) => {
    fileIdsForDeleteArray.value?.push(id);
    console.log("click", fileIdsForDeleteArray.value)
    let index = filesProcess.value.findIndex((item) => item.id === id)
    console.log("index", index)
    filesProcess.value.splice(index, 1)
    console.log("test", filesProcess.value)
}

const { submit, loading } = useEditSubProcess(route.params.id, fileIdsForDeleteArray.value)

const changeSelectItem = async (selectedItemId) => {
    const { data } = await useLazyAsyncData('processes', () => getProcesses(selectedItemId, { toastError: true }), {
        server: false
    })
    if (data.value) {
        processes.value = data.value
    }

    // architectureIdSelected.value = selectedItemId

    // architectureSelected.value = architectures.value?.find((item) => item.id == architectureIdSelected.value)
    // console.log("emit", architectureSelected.value)
}
// const prefix_code = computed(() => (architectureSelected.value ? ("PS-" + architectureSelected.value!.code + "-") : ''))
// const prefix_code = "PS - "



</script>

<style scoped></style>