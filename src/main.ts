import { createApp } from "vue";
import App from "./App.vue";
import Globalregister from "./global";
import icons from "@/global/register-elementIcons";
import { initLocalStorge } from "./store";
import router from "./router";
import store from "@/store";
const app = createApp(App);
app.use(store);
initLocalStorge();
app.use(router);
app.use(Globalregister);
app.use(icons);

app.mount("#app");
// window.addEventListener(
//   "touchstart",
//   (event: any) => {
//     const { preventDefault } = event;
//     // 其他处理逻辑
//     preventDefault();
//   },
//   { passive: false }
// );
