<template>
    <div class="px-[3rem]  pb-[0.2rem]">
        <div v-if="!pending" class="bg-white shadow-lg rounded-2xl p-4 sm:p-[5rem]">
            <h3 class="mb-3 text-lg text-gray-600 font-bold">ویرایش فرایند {{ data?.process?.title }}</h3>
            <hr class="mb-10">
            <Form :validation-schema="schema" @submit="submit">
                <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-6">
                <app-select-input name="architecture_id" :options="data?.architectures!"
                    v-model="data!.process!.architecture_id" :label="$t('architecture_id')" class="flex col-span-1"
                    @selectedItem="changeSelectItem"></app-select-input>
                <app-text-input name="title" v-model="data!.process!.title" :label="$t('title')"
                    class="flex col-span-1"></app-text-input>
                <app-code-input name="code" :label="$t('code')" v-model="data!.process!.code" class="flex col-span-1"></app-code-input>
                <app-select-input name="status" :options-list="options" :label="$t('status')"
                        v-model="data!.process!.status" class="flex col-span-1"></app-select-input>
                <app-file-input name="files" :label="$t('files')" class="flex col-span-2"></app-file-input>
                <div class="flex flex-col items-center gap-4 md:flex-row flex-wrap col-span-2">
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

                <app-text-input name="description" area :label="$t('description')" v-model="data!.process!.description"
                    class="flex col-span-2"></app-text-input>
                <app-button type="submit" :loading="loading" class="btn btn-block sm:col-span-2 bg-indigo-800 hover:bg-indigo-500 text-white hover:text-l mt-2">{{ $t('submit') }}</app-button>
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
import { useGetBaseArchitecturesService } from "~/composables/architectures/useArchitecture.service";
import { useEditProcessValidation } from "~/composables/processes/useProcess.validation";
import { ToastEnum, ButtonVariantEnum } from "~/types";

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
const { $t } = useNuxtApp()
// const loading = ref<boolean>(false);

const { schema } = useEditProcessValidation()
const { showToast } = useToast();
const route = useRoute();
import { useErrorHandler } from "~/composables/useErrorHandler";
import type { ArchitectureBaseDto } from "~/composables/architectures/architecture.dto";
import { useCreateProcessService } from "~/composables/processes/useProcess.service";
import { useGetProcessByIdService } from "~/composables/processes/useProcess.service"
import type { FileDto } from '~~/composables/file.dto';
import { useEditProcess } from "~/composables/processes/useEditProcess";

const architectureIdSelected = ref<number | null>(null)
const architectureSelected = ref<ArchitectureBaseDto | null>(null)
const fileIdsForDeleteArray = ref<number[]>([])
const filesProcess = ref<FileDto[]>([])
const getArchitectures = useGetBaseArchitecturesService()
const getProcessById = useGetProcessByIdService();
const createProcess = useCreateProcessService();
const changeSelectItem = (selectedItemId) => {
    // architectureIdSelected.value = selectedItemId

    // architectureSelected.value = architectures.value?.find((item) => item.id == architectureIdSelected.value)
    // console.log("emit", architectureSelected.value)
}
// const prefix_code = computed(() => (architectureSelected.value ? ("PS-" + architectureSelected.value!.code + "-") : ''))
const prefix_code = "PS - "
const { data, pending, error } = await useAsyncData('edit-process' + route.params.id, async () => {
    const [architectures, process] = await Promise.all([getArchitectures(), getProcessById(route.params.id as string)]);
    return { architectures, process }
}, { server: false })
// useErrorHandler(error)
watch(data, (value) => {
    if ((data.value)?.process) {
        filesProcess.value = (data.value)?.process?.files
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
console.log("processById", data)
const { submit, loading } = useEditProcess(route.params.id, fileIdsForDeleteArray.value)
// const submit = (values, { setErrors, resetForm }: FormActions<any>) => {
//     loading.value = true
//     console.log("submit", values)
//     createProcess(values, { setErrors }).then((res) => {
//         if (res !== undefined) {
//             showToast({ message: "فرایند ویرایش شد.", type: ToastEnum.success })
//             resetForm()
//         }
//     }).finally(() => {
//         loading.value = false
//     })

// }
const test = ()=>{
    console.log("submit") 
}
</script>

<style scoped></style>