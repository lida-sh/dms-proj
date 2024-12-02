<template>
    <div class="form-control" :class="{ 'has-error': !!errorMessage, success: meta.valid }">
        <label v-if="label !== ''" class="flex justify-between items-center px-1 pb-1.5" :for="name">
            <span class="label-text">{{ label }}</span>
            <slot name="leftLabel"></slot>
        </label>
        <select
            class="bg-left-center select-custom focus:ring-0 focus:ring-offset-0 focus:border-gray-300 border-gray-300 rounded-lg h-12 font-normal font-gray-700"
            :placeholder="placeholder" v-bind="$attrs" :value="inputValue" :name="name" @change="changeSelect"
            @blur="handleBlur">
            <option value=""></option>
            <option v-if="optionsList" v-for="(item, index) in optionsList" :key="index" :value="item.value" class="selection:bg-gray-300">{{ item.title }}</option>
            <option v-if="options" v-for="(item, index) in options" :key="index" :value="item.id" class="selection:bg-gray-300">{{ item.title }}</option>
        </select>
        <label class="flex items-center min-h-[1.4rem] px-1">
            <span class="label-text-alt leading-3 text-error text-2xs">{{ errorMessage || successMessage }}</span>
        </label>
    </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { defineComponent } from "vue";
interface OptionList {
    title: string,
    value: string
}
interface Option {
    id: number,
    title: string,
    type?: string,
    code?: string
}
interface Props {
    name: string,
    optionsList?: OptionList[],
    options?: Option[],
    placeholder?: string,
    label?: string,
    modelValue?: any,
    successMessage?: string
}
const props = withDefaults(defineProps<Props>(), {
    placeholder: "",
    label: "",
    successMessage: "",
})
const emit = defineEmits(["update:modelValue", "selectedItem"])
const {
    value: inputValue,
    errorMessage,
    handleChange,
    handleBlur,
    meta,
    setValue,
} = useField(props.name, undefined, {
    initialValue: props.modelValue,
    validateOnValueUpdate: false,
});
const changeSelect = (event) =>{
    handleChange(event)
    emit("selectedItem", event.target.value)
    

}
watchEffect(() => {
    emit("update:modelValue", unref(inputValue))
})
watch(() => props.modelValue, (value) => {
    setValue(value)
})


</script>

<style scoped>

select > option {
    font-family: "siteFont", serif !important;
    
}


</style>