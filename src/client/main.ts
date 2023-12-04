import "./main.css";
import { createApp } from "vue";
import App from "./app.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/home-page.vue";
import Puzzle from "./pages/puzzle-page.vue";
import EventPage from "./pages/event-page.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: HomePage },
        { path: "/events/:event", component: EventPage },
        { path: "/events/:event/puzzles/:puzzle", component: Puzzle },
        { path: "/:path(.*)*", redirect: "/" }
    ]
});

createApp(App).use(router).mount("#app");
