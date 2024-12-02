<template>
    <div class="form-control" :class="{ 'has-error': !!errorMessage, success: meta.valid }">
        <label v-if="label !== ''" class="flex justify-between items-center px-1 pb-1.5" :for="name">
            <span class="label-text">{{ label }}</span>
            <slot name="leftLabel"></slot>
        </label>
        <input id="file-input" class="hidden file-input file-input-bordered w-full" type="file" multiple="true"
            bind="$attrs" :name="name" @change="change" @blur="handleBlur">
        <div class="flex items-center gap-4 border border-gray-300 rounded-lg">
            <label for="file-input"
                class="border-gray-900 bg-gray-600 text-white py-3 px-4 rounded-r-lg flex items-center justify-center text-sm font-bold">انتخاب
                فایل</label>
            <span id="file-chosen" class="text-sm font-medium text-gray-700" >فایلی انتخاب نشده است.</span>
        </div>

        <label class="flex items-center min-h-[1.4rem] px-1">
            <span class="label-text-alt leading-3 text-error text-2xs">{{ errorMessage || successMessage }}</span>
        </label>
    </div>
</template>

<script lang="ts">
import { useField } from "vee-validate";
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            default: "",
        },
        label: {
            type: String,
            default: "",
        },
        successMessage: {
            type: String,
            default: "",
        },
    },
    setup(props, { emit }) {
        const {
            value: inputValue,
            errorMessage,
            handleChange,
            handleBlur,
            meta,
            setValue,
        } = useField(props.name, undefined, {
            initialValue: null,
            validateOnValueUpdate: true,
        });
        const change = (event: any) => {
            handleChange(event);
            const fileName = event.target.value.split("\\")
            console.log("files", event.target.files)
            console.log("inputValue", inputValue.value)
            if(event.target.files){
                document.getElementById('file-chosen').innerHTML = "";
            }
            
            for (let i = 0; i < event.target.files.length; i++) {
                document.getElementById('file-chosen').innerHTML += event.target.files[i].name + ((i === (event.target.files.length) - 1) ? "" : ",  ")
            }



            // event.target.files.forEach(element => {
            //     document.getElementById('file-chosen')?.textContent += element.name + ","
            // });



        }
        watch(inputValue, (value) => {
            if (!value) {
                document.getElementById('file-chosen').innerHTML = value
            }
        })

        return { errorMessage, inputValue, handleChange, handleBlur, meta, change };
    },
});

</script>

<style scoped>
.file-input::placeholder {
    content: "";
}

.ltr-dir {
    direction: ltr;
}
</style>