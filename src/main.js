// main.js

/**
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

import router from "./router";
import vuetify from "./plugins/vuetify";

// Import du fichier SCSS principal
import "./scss/main.scss";

const app = createApp(App);

registerPlugins(app); // Ici, Vuetify est déjà inclus dans registerPlugins

app.use(router);
app.use(vuetify);

app.mount("#app"); // On monte l'application ici
