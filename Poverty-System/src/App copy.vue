<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
const getRef = ref()

onMounted(()=>{
  console.log(getRef.value.child);
  
})
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld ref="getRef" msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
