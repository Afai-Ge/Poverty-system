<template>
  <div class="nav-menu-wrapper">
    <!-- <img
      class="set-img"
      src="@/assets/images/styleLogo.png"
      alt="图片"
      title="欢迎来到alan的博客"
      @click="handleLogo"
    /> -->
    <div class="logo" @click="handleLogo">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fupinqingkuang"></use>
      </svg>
      <span>扶贫信息管理</span>
    </div>
    <el-menu
      class="menu-box"
      :default-active="activeIndex"
      mode="vertical"
      text-color="#555"
      @select="handleSelect"
    >
      <template v-for="(item, index) in menuList" :key="item.path">
        <template v-if="!item.children">
          <el-menu-item :index="item.meta?.index" @click="handleRoute(item)">{{
            item.meta?.title
          }}</el-menu-item>
        </template>
        <template v-else>
          <el-sub-menu :index="item.meta?.index">
            <template #title>{{ item.meta?.title }}</template>
            <el-menu-item
              :index="subItem.meta?.index"
              v-for="(subItem, index) in item.children"
              :key="subItem.path"
              @click="handleRoute(subItem)"
              >{{ subItem.meta?.title }}</el-menu-item
            >
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "@/store"
import { mapState } from "vuex"

// interface Prop_Setting {
//   showLogo?: boolean
//   showSearch?: boolean
//   directionType?: string
// }
// withDefaults(defineProps<Prop_Setting>(), {
//   showLogo: true,
//   showSearch: true,
//   directionType: "vertical",
// })

// 路由部分
const router = useRouter()
const menuList = router.options.routes[1].children
console.log("menuList: ", menuList)
const handleRoute = (item: any) => {
  router.push(item.path)
}

// 状态管理
const store = useStore()

// 控制切换
// const activeIndex = store.state.currentMenu || ref<string>('1');
const activeIndex = ref(
  computed(mapState(["currentMenu"]).currentMenu.bind({ $store: store })) ||
    ref<string>("1")
)
const handleSelect = (key: string, keyPath: string) => {
  // console.log(key, keyPath);
  store.commit("SET_CURRENT_MENU", key)
}

// 点击logo回到首页
const handleLogo = () => {
  store.commit("SET_CURRENT_MENU", "1")
  router.push("/home")
}
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
