import { createApp } from "vue"
import App from "./App.vue"

import { store, key, useStore } from "@/store"
import router from "./router"
import {} from "@/store"
import ElementPlus, { ElNotification } from "element-plus"
import locale from "element-plus/lib/locale/lang/zh-cn"
import "element-plus/dist/index.css"

import { start, close } from "@/script/utils/nprogress"

createApp(App)
  .use(store, key)
  .use(router)
  .use(ElementPlus, { locale })
  .mount("#app")

// const myStore = useStore()
// 设置路由导航守卫
router.beforeEach((to, from, next) => {
  start()

  if (to.meta.title) {
    document.title = String(to.meta.title)
  } else {
    document.title = "乡镇扶贫信息管理系统"
  }

  // //   路由出错处理
  // if (to.matched.length === 0 && !to.name) {
  //   ElNotification({
  //     title: "路由地址出错",
  //     message: `[${to.fullPath}] 找不到对应页面...`,
  //     type: "error",
  //     duration: 3000,
  //   })

  //   router.push("/login")
  // } else {
  //   next()
  // }

  // 未输入账号密码
  if (to.path !== "/login" && to.path !== "/register") {
    const userInfo = sessionStorage.getItem("userInfo")
    if (userInfo) {
      //   路由出错处理
      if (to.matched.length === 0 && !to.name) {
        ElNotification({
          title: "路由地址出错",
          message: `[${to.fullPath}] 找不到对应页面...`,
          type: "error",
          duration: 3000,
        })

        router.push("/home")
      } else {
        console.log("to:", to.meta)
        // myStore.commit("SET_CURRENT_MENU", to.meta.index)
        return next()
      }
    } else {
      ElNotification({
        title: "无法跳转页面",
        message: `请输入正确的账号密码`,
        type: "info",
        duration: 3000,
      })
      return next("/login")
    }
  }

  return next()
})

router.afterEach(() => {
  close()
})
