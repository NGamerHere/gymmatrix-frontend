// src/shims-vue.d.ts
import { RouteLocationNormalized } from 'vue-router';

declare module '@vue/runtime-core' {
  // Declare globally available properties for Vue
  interface ComponentCustomProperties {
    $route: RouteLocationNormalized;
  }
}
