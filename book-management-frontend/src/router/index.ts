import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { authService } from "@/services";

// Define routes
const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    name: "Books",
    component: () => import("@/views/BooksView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/books/create",
    name: "CreateBook",
    component: () => import("@/views/BookFormView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/books/:id",
    name: "BookDetail",
    component: () => import("@/views/BookDetailView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/books/:id/edit",
    name: "EditBook",
    component: () => import("@/views/BookFormView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    redirect: "/",
  },
];

// create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check authentication
router.beforeEach((to, _from, next) => {
  const isAuthenticated = authService.isAuthenticated();
  const requiresAuth = to.meta.requiresAuth !== false;

  // Redirect to login if not authen
  if (requiresAuth && !isAuthenticated) {
    next({ name: "Login" });
    return;
  }

  // Redirect to home if already authen
  if (to.name === "Login" && isAuthenticated) {
    next({ name: "Books" });
    return;
  }

  next();
});

export default router;
