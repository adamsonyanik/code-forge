<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
    <button
        type="submit"
        class="text-white bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-500 dark:active:bg-green-600 transition-all duration-75"
    >
        {{ text }}
    </button>
</template>

<style scoped></style>
