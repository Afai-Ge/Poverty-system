<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useStore } from "@/store";
import { onUnmounted, onMounted } from "vue";

const onUpdate = (data: any) => {
  console.log(data);
};

const store = useStore();

</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
// @import "@/assets/style/global.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
