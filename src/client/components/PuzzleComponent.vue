<script setup lang="ts">
import YourPuzzleInput from "./YourPuzzleInput.vue";
import PuzzleAnswer from "./PuzzleAnswer.vue";
</script>

<template>
    <main>
        <article>
            <h1>Sort</h1>
            <p>
                The document consists of text lines. On each line is a integer. Sort the input from the lowest number to
                the highest number.
            </p>
            <p>For example:</p>
            <pre><code>69
12
42
1
</code></pre>
            <p>
                In the example the sorted list would be: <code>1</code> at index <code>1</code>, <code>12</code> at
                index <code>2</code>, <code>42</code> at index <code>3</code> and <code>69</code> at index
                <code>4</code>. Multiplying and adding them up would result in: <code>1*1 + 2*12 + 3*42 + 4*69</code> =
                <code><em>427</em></code>
            </p>
            <p>
                What is the sum of the products of the indices and the values of <YourPuzzleInput />? The indices start
                at one.
            </p>
            <PuzzleAnswer content="text" />
        </article>
    </main>
</template>
