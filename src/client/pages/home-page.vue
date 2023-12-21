<script setup lang="ts">
import AnvilComponent from "../components/anvil/AnvilComponent.vue";
</script>

<template>
    <div class="flex flex-col min-h-[80%] justify-center items-center dark:bg-zinc-900 dark:text-white gap-10">
        <div class="flex gap-20 w-10/12 sm:w-8/12 2xl:w-6/12 py-6 justify-center items-center">
            <h1 class="text-3xl lg:text-6xl font-bold">Code Forge</h1>
            <AnvilComponent />
        </div>

        <div class="flex items-baseline gap-5">
            <h2 class="text-xl lg:text-4xl">Current Adventure:</h2>
            <router-link class="text-2xl lg:text-5xl" to="/adventures/generic-puzzles">Generic Puzzles</router-link>
        </div>
    </div>
</template>
