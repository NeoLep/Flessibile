import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import BaseRequest from "./requests";
import { FlessStorage } from "./store";

const app = createApp(App);

// 注入 request 实例
new BaseRequest(app);
app
  .use(FlessStorage)
  .use(router)
  .use(ElementPlus)
  .mount("#app");
