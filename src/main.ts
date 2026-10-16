import { registerSW } from "virtual:pwa-register";
import { mountApp } from "./app";
import "./styles/app.css";
import { applyTheme, detectTheme } from "./theme";

applyTheme(detectTheme());

registerSW({ immediate: true });

const root = document.querySelector("#app");
if (!root) {
  throw new Error("Missing #app");
}
mountApp(root as HTMLElement);
