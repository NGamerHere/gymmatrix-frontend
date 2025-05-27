<script setup lang="ts">
import {  RouterView } from 'vue-router'
import { useRouter } from 'vue-router';
const router = useRouter();
import { App } from '@capacitor/app';
App.addListener('backButton', () => {
  router.back();
});

</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
