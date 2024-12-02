<template>
    <div>
    <div
      class="dropzone"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @click="fileInput.click()"
    >
      <input
        type="file"
        ref="fileInput"
        multiple
        @change="handleFiles"
        class="hidden"
      />
      <p>Drag & drop files here or click to select files</p>
      <p v-if="files?.length">Selected files: {{ files.map(file => file.name).join(', ') }}</p>
    </div>
    <ErrorMessage name="files" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { useField, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const emit = defineEmits()

const { value: files, errorMessage } = useField(
  'files',
  yup.array().min(1, 'At least one file is required.')
)

const fileInput = ref(null)

const handleFiles = (event) => {
  const selectedFiles = Array.from(event.target.files)
  files.value = selectedFiles
  emit('update:files', selectedFiles) // Emit files to parent if needed
}

const handleDrop = (event) => {
  const droppedFiles = Array.from(event.dataTransfer.files)
  files.value = droppedFiles
  emit('update:files', droppedFiles) // Emit files to parent if needed
}
</script>

<style scoped>
.dropzone {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}
.dropzone:hover {
  border-color: #aaa;
}
</style>