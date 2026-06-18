<script setup lang="ts">
import LoginPage from '../page/login.vue'
</script>

<template>
  <LoginPage />
</template>

<style>
/* 覆盖默认的 body margin，确保渐变色全屏且不出现滚动条白边 */
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  /* 阻止手机端下拉回弹出现的白底 */
  background: #764ba2; 
}
</style>

<style scoped>
</style>
