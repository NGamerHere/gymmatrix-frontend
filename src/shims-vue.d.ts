// src/shims-vue.d.ts
import { Router, RouteLocationNormalized } from 'vue-router';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $router: Router; // ✅ This allows using `this.$router.push()`
    $route: RouteLocationNormalized;
  }
}
