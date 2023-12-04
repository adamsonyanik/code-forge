<script setup lang="ts">
import RankingComponent from "../components/RankingComponent.vue";
import PuzzleComponent from "../components/PuzzleComponent.vue";
</script>

<template>
    <div class="flex h-full w-full justify-between">
        <PuzzleComponent />
        <RankingComponent
            :ranking="[
                { details: '00:00:14', user: { name: 'User 1' } },
                { details: '00:00:15', user: { name: 'User 2' } }
            ]"
            :start-position="1"
        />
    </div>
</template>
