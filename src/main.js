import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { install } from "@icon-park/vue-next/es/all";
import "@icon-park/vue-next/styles/index.css";

import BaseRequest from "./requests";
import { FlessStorage } from "./store";

const app = createApp(App);

// Install 全局引入 iconPark 图标库
install(app, "ip"); // use custom prefix 'ip', eg: icon is People, name is ip-people.

// 注入 request 实例
new BaseRequest(app);
app
  .use(FlessStorage)
  .use(router)
  .use(ElementPlus)
  .mount("#app");
