<template>
  <div class="form-control" :class="{ 'has-error': !!errorMessage, success: meta.valid }">
    <label v-if="label !== ''" class="flex justify-between items-center px-1 pb-1.5" :for="name">
      <span class="label-text">{{ label }}</span>
      <slot name="leftLabel"></slot>
    </label>
    <div class="flex gap-1 relative">
      <input class="focus:ring-0 focus:ring-offset-0 focus:border-gray-300 border-gray-300 rounded-lg h-12 ltr-dir pl-14 w-full text-base text-gray-600"
      autocomplete="off" :type="type" :placeholder="placeholder" v-bind="$attrs" :value="inputValue" :name="name"
      @input="handleChange" @blur="handleBlur">
      <!-- <input class="focus:ring-0 focus:ring-offset-0 focus:border-gray-300 border-gray-300 rounded-lg h-12 w-24 placeholder:text-sm ltr-dir"
      :placeholder="prefix" :disabled="true" > -->
       <span class="absolute top-3 left-5 ltr-dir text-gray-600 text-base">{{ prefix }}</span>
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
    prefix: {
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
    modelValue: {
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
      initialValue: props.modelValue,
      validateOnValueUpdate: false,
    });
    const prefix_code = computed(()=>(props.prefix !== null) ? props.prefix : "")
    watchEffect(() => {
      emit("update:modelValue", unref(inputValue))
    })
    watch(() => props.modelValue, (value) => {
      setValue(value)
    })
    return { errorMessage, inputValue, handleChange, handleBlur,prefix_code, meta };
  },
});
</script>

<style scoped>
.ltr-dir{
  direction: ltr;
}
</style>