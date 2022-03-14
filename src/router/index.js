import { createRouter, createWebHistory } from "vue-router";

// 路由信息
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home/Home.vue")
  },
  {
    path: "/tela",
    name: "Tela",
    component: () => import("../views/Tela/Tela.vue")
  },
  {
    path: "/template",
    name: "telaList",
    component: () => import("../views/tela-list-page/tela-list-page.vue")
  },
  {
    path: "/telarender",
    name: "telaRender",
    component: () => import("../views/tela-render-page/tela-render-page.vue")
  },
  {
    path: "/draggable",
    name: "Draggable",
    component: () => import("../views/Draggable/Draggable.vue")
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/Test/Test.vue")
  }
];

// 导出路由
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
