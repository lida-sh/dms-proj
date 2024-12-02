<template>
    <div class="flex flex-col items-center justify-center gap-2 min-h-24">
        <img v-if="extension == 'docx' || extension == 'doc'" src="/assets/images/file-icons/w.jpg" alt="word" class="w-9">
        <img v-if="extension == 'pdf'" src="/assets/images/file-icons/pdf2.png" alt="pdf" class="w-10">
        <img v-if="extension == 'png' || extension == 'jpg' || extension == 'jpeg' || extension == 'tiff' || extension == 'gif'"
            src="/assets/images/file-icons/image.png" alt="image" class="w-10">
        <img v-if="extension == 'bpm'" src="/assets/images/file-icons/bizagi.png" alt="bizagi" class="w-10 h-10">
        <img v-if="extension == 'pptx'" src="/assets/images/file-icons/power.jpg" alt="power point" class="w-14 h-10">
        <p class="text-xs text-center">{{ shortenText(fileName, 20) }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ fileName: string }>()
const extension = computed(() => {
    if (props.fileName) {
        return props.fileName.split('.').pop().toLowerCase();
    } else {
        return ""
    }
}
)
const shortenText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};
</script>

<style scoped></style>