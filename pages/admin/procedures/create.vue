<template>
    <div class="px-[3rem]  pb-[0.2rem]">
        <div class="bg-white shadow-lg rounded-2xl p-4 sm:p-[5rem]">
            <h3 class="mb-3 text-lg text-gray-600 font-bold">ایجاد سند جدید</h3>
            <hr class="mb-5 sm:mb-10">
            <Form :validation-schema="schema" @submit="submit">
                <div class="flex flex-col lg:grid lg:grid-cols-6 lg:gap-4">
                    <app-select-input name="architecture_id" :options="architectures!" :label="$t('architecture_id')"
                        class="col-span-3" @selectedItem="changeSelectItem"></app-select-input>
                    <app-select-input name="process_id" :options="processes!" :label="$t('process_id')"
                        class="col-span-3"></app-select-input>
                    <app-text-input name="title" :label="$t('title')" class="col-span-1 sm:col-span-6"></app-text-input>
                    <app-select-input name="docType" :options-list="doctypes" :label="$t('docType')"
                        class="col-span-2"></app-select-input>
                    <app-code-input name="code" :label="$t('code')" class="col-span-2"></app-code-input>
                    <app-select-input name="status" :options-list="options" :label="$t('status')"
                        class="col-span-2"></app-select-input>
                    <div class="flex col-span-6">
                        <app-file-input name="files" :label="$t('files')" class="w-full"></app-file-input>
                    </div>
                    <app-text-input name="description" area :label="$t('description')"
                        class="sm:col-span-6"></app-text-input>
                    <app-button type="submit" :loading="loading"
                        class="btn btn-block h-8 sm:col-span-6 bg-indigo-800 hover:bg-indigo-500 text-white hover:text-lg mt-2">{{
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
const loading = ref<boolean>(false);

const { schema } = useProceturesValidation()
const { showToast } = useToast();

import { useErrorHandler } from "~/composables/useErrorHandler";
import type { ArchitectureBaseDto } from "~/composables/architectures/architecture.dto";
import { useGetBaseProcessesService } from "~/composables/processes/useProcess.service";
import type { ProcessBaseDto } from "~/composables/processes/process.dto";
import { useProceturesValidation } from "~/composables/procetures/useProcetures.validation";
import { useCreateProcetureService } from "~/composables/procetures/useProcedure.service";
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
const processes = ref<ProcessBaseDto[]>([])
const architectureIdSelected = ref<number | null>(null)
const architectureSelected = ref<ArchitectureBaseDto | null>(null)
const createProceture = useCreateProcetureService();
const getArchitectures = useGetBaseArchitecturesService()
const getProcesses = useGetBaseProcessesService();
const { data: architectures, error } = await useLazyAsyncData('architectures', () => getArchitectures({ toastError: true }), {
    server: false
})

useErrorHandler(error)

const changeSelectItem = async (selectedItemId) => {
    const data = await getProcesses(selectedItemId, { toastError: true })
    if (data !== undefined) {
        processes.value = data
    }
}



const submit = (values, { setErrors, resetForm }: FormActions<any>) => {
    loading.value = true
    console.log("submit", values)
    createProceture(values, { setErrors }).then((res) => {
        if (res !== undefined) {
            showToast({ message: "سند جدید ایجاد شد.", type: ToastEnum.success })
            resetForm()
            navigateTo("/admin/procedures")
        }
    }).finally(() => {
        loading.value = false
    })

}
</script>

<style scoped></style>