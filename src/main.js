import { registerPlugins } from "@/plugins";
import App from "./App.vue";
import { createApp } from "vue";
import store from "./store";

import "@/assets/styles/main.scss";

const app = createApp(App);

registerPlugins(app);

app.use(store).mount("#app");
