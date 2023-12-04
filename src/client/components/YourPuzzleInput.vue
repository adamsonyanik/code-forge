<script setup lang="ts">
import { useRoute } from "vue-router";

const path = useRoute().fullPath;
</script>

<template>
    <a :href="path + (path.endsWith('/') ? '' : '/') + 'input'" target="_blank">your puzzle input</a>
</template>
