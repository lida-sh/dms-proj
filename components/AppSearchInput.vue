<template>
  <div class="form-control" :class="{ 'has-error': !!errorMessage, success: meta.valid }">
    <label v-if="label !== ''" class="flex justify-between items-center px-1 pb-1.5" :for="name">
      <span class="label-text">{{ label }}</span>
      <slot name="leftLabel"></slot>
    </label>
    <div class="relative w-full">
      <input class="focus:ring-0 focus:ring-offset-0 focus:border-gray-300 border-gray-300 rounded-lg h-12 relative w-full placeholder:text-sm"
        autocomplete="off" :type="type" placeholder="جستجو ..." v-bind="$attrs" :value="inputValue" :name="name"
        @input="handleChange" @blur="handleBlur">
      <button type="button" @click="handleSearch"
        class="absolute flex items-center justify-center top-0 end-0 p-2.5 text-sm font-medium h-full w-14 text-white bg-gray-500 rounded-e-lg border border-gray-600 hover:bg-gray-800  focus:outline-none">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
        <!-- <span class="sr-only">Search</span> -->
      </button>
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
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    area: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    rows: {
      type: Number,
      default: 3,
    },
    modelValue: {
      type: String,
      default: "",
    },
    successMessage: {
      type: String,
      default: "",
    },
  },
  emits:["clickSearch", "update:modelValue"],
  setup(props, { emit }) {
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
    watchEffect(() => {
      emit("update:modelValue", unref(inputValue))
    })
    watch(() => props.modelValue, (value) => {
      setValue(value)
    })
    const handleSearch = ()=>{
      emit("clickSearch")
    }
    return { errorMessage, inputValue, handleChange, handleBlur, meta, handleSearch };
  },
});
</script>

<style scoped></style>