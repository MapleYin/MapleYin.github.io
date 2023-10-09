import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Best Intention",
  description: "With the best of intentions",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
