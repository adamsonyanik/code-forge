<script setup lang="ts">
import { ref } from "vue";

const particleGroup = ref();
const hammer = ref();
let hitListener: (() => void) | null = null;

const onHit = () => {
    hammer.value.removeEventListener("webkitTransitionEnd", hitListener);
    hammer.value.style = "transform:; transition:;";
    const particles = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < particles; i++) addParticle();
};

function hit() {
    if (hitListener) hammer.value.removeEventListener("webkitTransitionEnd", hitListener);
    hitListener = onHit;
    hammer.value.addEventListener("webkitTransitionEnd", hitListener);
    hammer.value.style = "transform: translate(50px, 30px) rotate(0deg); transition: all 0.05s ease-in;";
}

function addParticle() {
    const angleRange = 75;
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const gTranslate = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    text.innerHTML = "" + Math.floor(Math.random() * 2);
    text.setAttribute("style", "transform: translate(-5px, 0px); opacity: 1;");
    text.setAttribute("font-family", "monospace");
    text.setAttribute("font-size", "15");
    text.setAttribute("fill", "#333");
    text.addEventListener("webkitTransitionEnd", () => g.remove());

    gTranslate.appendChild(text);
    g.appendChild(gTranslate);
    g.setAttribute("transform", `rotate(${Math.floor(Math.random() * angleRange * 2) - angleRange})`);
    particleGroup.value.appendChild(g);

    setTimeout(() => {
        const time = 0.2;
        text.setAttribute("style", `transition: all ${time}s ease-in; transform: scale(0.2); opacity: 0`);
        gTranslate.setAttribute("style", `transition: all ${time}s ease-out; transform: translate(-5px, -50px)`);
    });
}
</script>

<template>
    <svg class="select-none cursor-pointer inline" @mousedown="hit()" viewBox="0 0 185 275" height="500">
        <g transform="translate(-100 -40)">
            <g transform="translate(195 183)">
                <g ref="particleGroup" transform="translate(3 0)"></g>
                <rect width="120" height="30" transform="translate(-60 0)" fill="#555" />
                <rect width="70" height="40" transform="translate(-35 20)" fill="#555" />
            </g>
            <g transform="translate(30 0)">
                <g id="hammer" ref="hammer">
                    <rect width="80" height="15" transform="translate(30 121)" fill="#777" />
                    <rect width="25" height="50" transform="translate(100 104)" fill="#333" />
                </g>
            </g>
        </g>
    </svg>
</template>

<style scoped>
#hammer {
    transform: translate(20px, 30px) rotate(-20deg);
    transition: all 0.2s ease;
}

svg:hover #hammer {
    transform: translate(3px, 30px) rotate(-30deg);
}

rect {
    rx: 2px;
    ry: 2px;
}
</style>
