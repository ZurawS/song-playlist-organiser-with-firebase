import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

//global styles
import "./assets/main.css";
import { projectAuth } from "./firebase/config";

let app = null;

projectAuth.onAuthStateChanged(() => {
  if (!app) app = createApp(App).use(router).mount("#app");
});

//In order to deploy use:
//yarn run build
//firebase deploy
