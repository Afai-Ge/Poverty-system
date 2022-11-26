<template>
  <menu-bar></menu-bar>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import MenuBar from "@/components/layout/menu/MenuBar.vue"
import { Expand } from "@element-plus/icons"
import { ref } from "vue"
const router = useRouter()

const drawer = ref<boolean>(false)
const handleClose = (done: any) => {
  done()
}
const handleOpenMenu = () => {
  drawer.value = !drawer.value
}
</script>

<style lang="scss" scoped></style>
