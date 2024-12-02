<template>
    <div class="px-[3rem]  pb-[0.2rem]">
        <div class="bg-white shadow-lg rounded-2xl p-4 sm:p-[5rem]" v-if="data?.procedure">
            <h3 class="mb-3 text-lg text-gray-600 font-bold"> ویرایش سند {{ data?.procedure?.title }}</h3>
            <hr class="mb-5 sm:mb-10">
            <Form :validation-schema="schema" @submit="submit">
                <div class="flex flex-col sm:grid sm:grid-cols-6 sm:gap-6">
                    <app-select-input name="architecture_id" :options="data?.architectures!"
                        :label="$t('architecture_id')" class="col-span-3" @selectedItem="changeSelectItem"
                        v-model="data!.procedure!.architecture_id"></app-select-input>
                    <app-select-input name="process_id" :options="processes!" :label="$t('process_id')"
                        class="col-span-3" v-model="data!.procedure!.process_id"></app-select-input>
                    <app-text-input name="title" :label="$t('title')" class="col-span-1 sm:col-span-6"
                        v-model="data!.procedure!.title"></app-text-input>
                    <app-select-input name="docType" :options-list="doctypes" :label="$t('docType')"
                        class="col-span-2" v-model="data!.procedure!.docType"></app-select-input>
                    <app-code-input name="code" :label="$t('code')" class="col-span-2"
                        v-model="data!.procedure!.code"></app-code-input>
                    <app-select-input name="status" :options-list="options" :label="$t('status')"
                        v-model="data!.procedure!.status" class="col-span-2"></app-select-input>
                    <div class="flex col-span-6">
                        <app-file-input name="files" :label="$t('files')" class="w-full"></app-file-input>
                    </div>
                    <div class="flex flex-col sm:flex-row flex-wrap items-center gap-4 col-span-6">
                        <template v-for="(item, index) in ProcedureFiles" :key="index">
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
                        v-model="data!.procedure!.description" class="sm:col-span-6"></app-text-input>
                    <app-button type="submit" :loading="loading"
                        class="btn btn-block sm:col-span-6 bg-indigo-800 hover:bg-indigo-500 text-white mt-2">{{ $t('submit') }}</app-button>
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
import {  useGetBaseArchitecturesService } from "~/composables/architectures/useArchitecture.service";

const { $t } = useNuxtApp()
// const loading = ref<boolean>(false);

const { schema } = useEditProcetureValidation()
const { showToast } = useToast();

import { useErrorHandler } from "~/composables/useErrorHandler";
import type { ArchitectureBaseDto } from "~/composables/architectures/architecture.dto";
import { useGetBaseProcessesService } from "~/composables/processes/useProcess.service";
import type { ProcessBaseDto } from "~/composables/processes/process.dto";

import { useCreateSubProcessService, useGetSubProcessByIdService } from "~/composables/sub-processes/useSubProcess.service";
import type { FileDto } from "#imports";

import { useGetProcedureByIdService } from "~/composables/procetures/useProcedure.service";
import { useEditProceture } from "~/composables/procetures/useEditPrecedure";
import { useEditProcetureValidation } from "~/composables/procetures/useProcetures.validation";
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
const doctypes = [
    {
        title: "روش اجرایی",
        value: "procedures"
    },
    {
        title: "دستورالعمل",
        value: "instruction"
    },
    {
        title: "قرارداد",
        value: "contract"
    },
    {
        title: "فرم",
        value: "form"
    },
    {
        title: "آئین نامه",
        value: "regulation"
    },
]
const route = useRoute();
const fileIdsForDeleteArray = ref<number[]>([])
const ProcedureFiles = ref<FileDto[]>([])
const processes = ref<ProcessBaseDto[]>([])
const architectureIdSelected = ref<number | null>(null)
const architectureSelected = ref<ArchitectureBaseDto | null>(null)

const getArchitectures = useGetBaseArchitecturesService()
const getProcesses = useGetBaseProcessesService();
const getProcedureById = useGetProcedureByIdService();
// const { data: architectures, error } = await useLazyAsyncData('architectures', () => getArchitectures({ toastError: true }), {
//     server: false
// })

// useErrorHandler(error)

const { data, pending, error } = await useAsyncData('edit-procedure' + route.params.id, async () => {
    const [architectures, procedure] = await Promise.all([getArchitectures(), getProcedureById(route.params.id as string)]);
    return { architectures, procedure }
}, { server: false })
useErrorHandler(error)
watch(data, async (value) => {
    if ((data.value)?.procedure) {
        ProcedureFiles.value = (data.value)?.procedure?.files
        if (data.value && (data.value)?.architectures) {
            const processesData  = await getProcesses(data!.value!.procedure.architecture_id as number, { toastError: true })
            if (processesData !== undefined) {
                processes.value = processesData
            }
        }
    }

}, { immediate: true })
const deleteFile = (id: number) => {
    fileIdsForDeleteArray.value?.push(id);
    let index = ProcedureFiles.value.findIndex((item) => item.id === id)
    ProcedureFiles.value.splice(index, 1)
}

const { submit, loading } = useEditProceture(route.params.id, fileIdsForDeleteArray.value)

const changeSelectItem = async (selectedItemId) => {
    const { data } = await useLazyAsyncData('processes', () => getProcesses(selectedItemId, { toastError: true }), {
        server: false
    })
    if (data.value) {
        processes.value = data.value
    }
}




</script>

<style scoped></style>