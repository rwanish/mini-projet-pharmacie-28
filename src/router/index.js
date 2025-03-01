/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
//import { setupLayouts } from 'virtual:generated-layouts'
import Home from "@/views/Home.vue";
import Medicament from "@/views/Medicament.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/medicaments", component: Medicament },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // extendRoutes: setupLayouts,
  routes,
});

export default router;
