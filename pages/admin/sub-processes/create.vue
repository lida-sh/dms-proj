<template>
    <div class="px-[3rem]  pb-[0.2rem]">
        <div class="bg-white shadow-lg rounded-2xl p-4 sm:p-[5rem]">
            <h3 class="mb-3 text-lg text-gray-600 font-bold">ایجاد زیر فرایند جدید</h3>
            <hr class="mb-5 sm:mb-10">
            <Form :validation-schema="schema" @submit="submit">
                <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-6">
                    <app-select-input name="architecture_id" :options="architectures!" :label="$t('architecture_id')"
                        class="col-span-1" @selectedItem="changeSelectItem"></app-select-input>
                    <app-select-input name="process_id" :options="processes!" :label="$t('process_id')"
                        class="col-span-1"></app-select-input>
                    <app-text-input name="title" :label="$t('title')" class="col-span-1 sm:col-span-2"></app-text-input>
                    <app-code-input name="code" :label="$t('code')" class="col-span-1"></app-code-input>
                    <app-select-input name="status" :options-list="options" :label="$t('status')"
                        class="col-span-1"></app-select-input>
                    <div class="flex col-span-2">
                        <app-file-input name="files" :label="$t('files')" class="w-full"></app-file-input>
                    </div>
                    <app-text-input name="description" area :label="$t('description')"
                        class="sm:col-span-2"></app-text-input>
                    <app-button type="submit" :loading="loading"
                        class="btn btn-block sm:col-span-2 bg-[#003e1f] text-white hover:text-gray-700 mt-2">{{
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

const { schema } = useSubProcessValidation()
const { showToast } = useToast();

import { useErrorHandler } from "~/composables/useErrorHandler";
import type { ArchitectureBaseDto } from "~/composables/architectures/architecture.dto";
import { useGetBaseProcessesService } from "~/composables/processes/useProcess.service";
import type { ProcessBaseDto } from "~/composables/processes/process.dto";
import { useSubProcessValidation } from "~/composables/sub-processes/useSubProcess.validation";
import { useCreateSubProcessService } from "~/composables/sub-processes/useSubProcess.service";
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
const processes = ref<ProcessBaseDto[]>([])
const architectureIdSelected = ref<number | null>(null)
const architectureSelected = ref<ArchitectureBaseDto | null>(null)
const createSubProcess = useCreateSubProcessService();
const getArchitectures = useGetBaseArchitecturesService()
const getProcesses = useGetBaseProcessesService();
const { data: architectures, error } = await useLazyAsyncData('architectures', () => getArchitectures({ toastError: true }), {
    server: false
})

useErrorHandler(error)


console.log("architectures are", architectures)
const changeSelectItem = async (selectedItemId) => {
    const data  = await getProcesses(selectedItemId, { toastError: true })
  if (data !== undefined) {
    processes.value = data
  }

    // architectureIdSelected.value = selectedItemId

    // architectureSelected.value = architectures.value?.find((item) => item.id == architectureIdSelected.value)
    // console.log("emit", architectureSelected.value)
}
// const prefix_code = computed(() => (architectureSelected.value ? ("PS-" + architectureSelected.value!.code + "-") : ''))
// const prefix_code = "PS - "


const submit = (values, { setErrors, resetForm }: FormActions<any>) => {
    loading.value = true
    console.log("submit", values)
    createSubProcess(values, { setErrors }).then((res) => {
        if (res !== undefined) {
            showToast({ message: "زیرفرایند جدید ایجاد شد.", type: ToastEnum.success })
            resetForm()
            navigateTo("/admin/sub-processes")
        }
    }).finally(() => {
        loading.value = false
    })

}
</script>

<style scoped></style>