<template>
    <div>
        <div :class="{'flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ':!isDialog, 'px-64 py-5': isDialog}" >
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <!-- <img class="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> -->
                    <img class="mx-auto h-40 w-auto"
                    src="/assets/images/file-icons/tci.png" alt="شرکت مخابرات ایران">
                <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">ورود به حساب کاربری
                </h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Form :validation-schema="schema" class="space-y-3" @submit="submit">
                    <div>
                        <app-text-input name="username" :label="$t('username')" thin class="focus:ring-2 focus:ring-inset focus:ring-indigo-600"></app-text-input>
                    </div>

                    <div class="flex flex-col ">
                        <div class="flex items-center self-end">
                            <div class="text-sm">
                                <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">
                                    فراموشی رمز عبور</a>
                            </div>
                        </div>
                        <div class="">
                            <app-text-input name="password" type="password" thin :label="$t('password')" class="focus:ring-2 focus:ring-inset focus:ring-indigo-600"></app-text-input>
                        </div>
                    </div>

                    <div>
                        <app-button type="submit" :loading="loading" 
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">ورود</app-button>
                    </div>
                </Form>

                <!-- <p class="mt-10 text-center text-sm/6 text-gray-500">
                    Not a member?
                    <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free
                        trial</a>
                </p> -->
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import {Form} from "vee-validate"
import { useLogin } from "~/composables/auth/login/useLogin";
import { useLoginValidation } from "~/composables/auth/login/useLogin.validation";
const {submit, loading, error} = useLogin()
const {schema} = useLoginValidation()
interface Props {
    isDialog?:boolean
}
const props = withDefaults(defineProps<Props>(), {
    isDialog: false
})
</script>

<style scoped></style>