<template>
  <div class="wrap">
    <Header />
    <div class="content">
      <div class="bread-list">
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item> -->
          <el-breadcrumb-item
            v-for="(item, index) in breads"
            :key="index"
            :to="item.path"
            >{{ item.meta.title }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div class="view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from "./header/index.vue"
import { ref, Ref, watch } from "vue"
import { useRoute, RouteLocationMatched } from "vue-router"

const route = useRoute()
// Ref接口限制类型
const breads: Ref<RouteLocationMatched[]> = ref([])

const getBreadList = () => {
  let list = route.matched.filter((e) => e.meta && e.meta.title)
  // 判断首页
  const one = list[0]
  console.log("one: ", one)
  if (one?.path !== "/home") {
    let arr = [{ path: "/home", meta: { title: "首页" } } as any]
    list = [...arr, ...list]
  }

  // 赋值面包屑
  breads.value = list
}
getBreadList()
watch(
  () => route.path,
  () => {
    getBreadList()
  }
)
</script>
<style lang="scss" scoped>
.wrap {
  height: 100vh;
  display: flex;
  overflow: hidden;
  .bread-list {
    height: 30px;
    margin-left: 14px;
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  .content {
    width: calc(100% - 228px);
    height: calc(100vh - 30px);
    .view {
      // padding: 14px;
      margin: 0 14px;
      background-color: #fff;
      width: 100%;
      height: calc(100vh - 30px);
      overflow-y: auto;
    }
  }
}
</style>
