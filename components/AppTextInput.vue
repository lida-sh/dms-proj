<template>
    <div
      class="form-control"
      :class="{ 'has-error': !!errorMessage, success: meta.valid }"
    >
      <label
        v-if="label !== ''"
        class="flex justify-between items-center px-1 pb-1.5"
        :for="name"
      >
        <span class="label-text">{{ label }}</span>
        <slot name="leftLabel"></slot>
      </label>
      <template v-if="area">
          <textarea :name="name" :placeholder="placeholder" v-bind="$attrs" :value="inputValue" :rows="rows" class="rounded-lg focus:ring-0 focus:ring-offset-0 focus:border-gray-300 border-gray-300"  @input="handleChange" @blur="handleBlur"></textarea>
      </template>
      <template v-else>
        <input class="focus:ring-0 focus:ring-offset-0 focus:border-gray-300 border-gray-300 rounded-lg h-12 relative" autocomplete="off" v-bind="$attrs" :class="{'h-9': thin}"
        :type="type" :placeholder="placeholder"
        :value="inputValue" :name="name"
        @input="handleChange"
        @blur="handleBlur">
      </template>
      <label class="flex items-center min-h-[1.4rem] px-1">
          <span class="label-text-alt leading-3 text-error text-2xs">{{errorMessage ||successMessage}}</span>
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
      thin: {
        type: Boolean,
        default:false
      }
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
      watchEffect(()=>{
          emit("update:modelValue", unref(inputValue))
      })
      watch(()=>props.modelValue, (value)=>{
          setValue(value)
      })
      return {errorMessage, inputValue, handleChange, handleBlur, meta};
    },
  });
  </script>
  
  <style scoped>
  </style>