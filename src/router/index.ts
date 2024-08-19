import cache from "@/utils/cache";
import { initMenu } from "@/utils/mapMenus";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/main"
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/login.vue")
    },
    {
      path: "/main",
      name: "main",
      component: () => import("@/views/main/main.vue")
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/NotFound.vue")
    }
  ]
});
router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = cache.getCache("token");
    if (!token) {
      return "/login";
    }
  }
  if (to.path == "/main") {
    return initMenu.url;
  }
});
export default router;
