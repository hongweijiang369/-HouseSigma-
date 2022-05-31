import { createApp } from "vue";
import router from "./router";
import "normalize.css/normalize.css";

import { createPinia } from "pinia";
import App from "@/App.vue";
import VueGoogleMaps from "@fawmi/vue-google-maps";

const app = createApp(App);

const pinia = createPinia();

app.use(router);

app.use(pinia);
app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyA1Krb9T9-F1KMysusQqc3b_Hk6YRL-0YU"
  }
});
app.mount("#app");
