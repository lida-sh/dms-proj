<template>
    <div class="overflow-hidden h-0 invisible" ref="target">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap"
const target = ref(null)
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})
let animation: any = null
const setAnimation = () => {
    animation = gsap.to(unref(target), {
        height: "auto",
        autoAlpha: 1,
        duration: 0.5,
        ease: "power2.inOut",
        paused: true
    })
}
onMounted(()=>{
    setAnimation();
})
watch(() => props.isOpen, (newValue) => {
    if (newValue) {
        animation.play()
    } else {
        animation.reverse()
    }
})
</script>

<style scoped></style>