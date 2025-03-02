import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/index.vue";
import Medicaments from "@/pages/medicaments.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/medicaments", component: Medicaments },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
