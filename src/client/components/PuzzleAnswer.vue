<script setup lang="ts">
import Button from "./Button.vue";
import TextInput from "./TextInput.vue";

defineProps<{ content: "text" | "file" }>();
</script>

<template>
    <p class="flex gap-2 items-center">
        Answer:
        <TextInput />
        <Button text="Submit" @click="console.log('click')" />
    </p>
</template>

<style scoped></style>
