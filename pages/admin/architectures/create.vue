<template>
    <div class="px-[3rem]  pb-[0.2rem]">
        <div class="bg-white shadow-lg rounded-2xl p-4 sm:p-[5rem]">
            <h3 class="mb-10 text-lg text-gray-600 font-bold">ایجاد معماری جدید</h3>
            <Form :validation-schema="schema" @submit="submit"
                class="flex flex-col lg:grid lg:grid-cols-6 lg:gap-4">
                <app-text-input name="title" :label="$t('title')" class="col-span-3"></app-text-input>
                <app-text-input name="code" :label="$t('code')" class="col-span-3"></app-text-input>
                <app-select-input name="type" :optionsList="options" :label="$t('type')" class="col-span-3"></app-select-input>
                <app-file-input name="files" :label="$t('files')" class="col-span-3"></app-file-input>
                <app-text-input name="description" area :label="$t('description')" class="col-span-6"></app-text-input>
                <app-button type="submit" :loading="loading"
                    class="btn btn-block col-span-6 bg-purple-800 text-white hover:text-gray-700 mt-2">{{ $t('submit')
                    }}</app-button>
            </Form>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "admin"
})
import { Form } from "vee-validate"


import { useArchitectureValidation } from "~/composables/architectures/useArchitecture.validation";
import { useCreateArchitecture } from "~/composables/architectures/useCreateArchitecture";
import { ButtonVariantEnum } from "~/types";

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
const { $t } = useNuxtApp()
const { schema } = useArchitectureValidation()
const { submit, loading } = useCreateArchitecture()
</script>

<style scoped></style>