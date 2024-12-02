<template>
    <div class="px-[3rem]  pb-[0.2rem]">
        <div class="bg-white shadow-lg rounded-2xl p-4 sm:p-[5rem]">
            <h3 class="mb-3 text-lg text-gray-600 font-bold">ایجاد فرایند جدید</h3>
            <hr class="mb-10">
            <Form :validation-schema="schema" @submit="submit"
                class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-6">
                <app-select-input name="architecture_id" :options="architectures!" :label="$t('architecture_id')"
                    class="" @selectedItem="changeSelectItem"></app-select-input>
                <app-text-input name="title" :label="$t('title')" class=""></app-text-input>
                <app-code-input name="code" :label="$t('code')" class=""></app-code-input>
                <app-select-input name="status" :options-list="options" :label="$t('status')"></app-select-input>
                <div class="flex col-span-2">
                    <app-file-input name="files" :label="$t('files')" class="w-full"></app-file-input>
                </div>
                <app-text-input name="description" area :label="$t('description')" class="col-span-2"></app-text-input>
                <app-button type="submit" :loading="loading"
                    class="btn btn-block col-span-2 bg-[#003e1f] text-white hover:text-gray-700 mt-2">{{ $t('submit')
                    }}</app-button>
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
import { useProcessValidation } from "~/composables/processes/useProcess.validation";
import { ToastEnum, ButtonVariantEnum } from "~/types";


const { $t } = useNuxtApp()
const loading = ref<boolean>(false);
// const createArchitecture = useCreateArchitectureService()
const { schema } = useProcessValidation()
const { showToast } = useToast();

import { useErrorHandler } from "~/composables/useErrorHandler";
import type { ArchitectureBaseDto } from "~/composables/architectures/architecture.dto";
import { useCreateProcessService } from "~/composables/processes/useProcess.service";
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
const architectureIdSelected = ref<number | null>(null)
const architectureSelected = ref<ArchitectureBaseDto | null>(null)
const createProcess = useCreateProcessService();
const changeSelectItem = (selectedItemId) => {
    // architectureIdSelected.value = selectedItemId

    // architectureSelected.value = architectures.value?.find((item) => item.id == architectureIdSelected.value)
    // console.log("emit", architectureSelected.value)
}
// const prefix_code = computed(() => (architectureSelected.value ? ("PS-" + architectureSelected.value!.code + "-") : ''))
// const prefix_code = "PS - "
const getArchitectures = useGetBaseArchitecturesService()
const { data: architectures, error, execute } = await useLazyAsyncData('architectures', () => getArchitectures(), {
})

// useErrorHandler(error)

// onMounted(() => {
//     if (!unref(architectures)) {
//         execute()
//     }
// })
console.log("architectures are", architectures)

const submit = (values, { setErrors, resetForm }: FormActions<any>) => {
    loading.value = true
    console.log("submit", values)
    createProcess(values, { setErrors }).then((res) => {
        if (res !== undefined) {
            showToast({ message: "فرایند جدید ایجاد شد.", type: ToastEnum.success })
            resetForm()
            navigateTo("/admin/processes")
        }
    }).finally(() => {
        loading.value = false
    })

}
</script>

<style scoped></style>