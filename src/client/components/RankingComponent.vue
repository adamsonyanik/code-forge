<script setup lang="ts">
import { User } from "../domain/user";

defineProps<{ ranking: { details: string; user: User }[]; startPosition: number }>();
</script>

<template>
    <div class="justify-self-end py-4 px-5 border-l flex-shrink">
        <pre v-for="(u, i) in ranking" :key="i">{{ i + startPosition }}.  {{ u.details }}  {{ u.user.name }}</pre>
    </div>
</template>

<style scoped></style>
