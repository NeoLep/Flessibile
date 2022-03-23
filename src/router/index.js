import { createRouter, createWebHistory } from "vue-router";

// 路由信息
const routes = [
  {
    path: "/",
    name: "Home",
    layout: "主页",
    icon: "home",
    type: "page",
    component: () => import("../views/Home/Home.vue")
  },
  {
    path: "/tela",
    name: "Tela",
    layout: "新建模版",
    icon: "newlybuild",
    type: "function",
    component: () => import("../views/Tela/Tela.vue")
  },
  {
    path: "/template",
    name: "telaList",
    layout: "已创建的模版",
    icon: "list-bottom",
    type: "page",
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
    layout: "draggable列表",
    type: "page",
    icon: "drag",
    component: () => import("../views/Draggable/Draggable.vue")
  },
  {
    path: "/test",
    name: "test",
    type: "page",
    layout: "测试页面",
    component: () => import("../views/Test/Test.vue")
  }
];

// 导出路由
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
