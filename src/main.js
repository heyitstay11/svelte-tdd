import App from "./App.svelte";
import "./axios";
import "../locale/i18n";

const app = new App({
  target: document.body,
});

export default app;
