import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import Home from "../pages/home_page.vue";
import Recorder from "../pages/recorder_page.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/recorder", component: Recorder },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const routesNav = [
  { path: "/", name: { es: "Inicio", en: "Home" } },
  { path: "/recorder", name: { es: "Capturador", en: "Recorder" } },
] as { path: string; name: { en: string; es: string } }[];

export { router, routesNav };
