<script setup lang="ts">
import { ref } from "vue";

const events = ref([
    { name: "Sort", id: "sort" },
    { name: "Shortest Path", id: "shortest-path" }
]);
</script>

<template>
    <main>
        <article>
            <h1>Generic Puzzles</h1>
            <div class="my-10">
                <router-link v-for="(e, i) in events" :key="e.id" :to="`/adventures/generic-puzzles/puzzles/${e.id}`">
                    <div
                        class="text-gray-800 font-normal px-1 w-full cursor-pointer hover:bg-green-500 hover:text-white text-lg"
                    >
                        {{ i + 1 }}. {{ e.name }}
                    </div>
                </router-link>
            </div>
        </article>
    </main>
</template>

<style scoped></style>
