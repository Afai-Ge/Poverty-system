import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Message from "element-plus"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
    name: "Login",
    component: () => import("@/components/login/index.vue"),
    children: [
      {
        path: "/login",
        component: () => import("@/page/login/Login.vue"),
      },
      {
        path: "/register",
        component: () => import("@/page/login/Register.vue"),
      },
    ],
  },
  {
    path: "/backstage",
    component: () => import("@/components/layout/index.vue"),
    // hidden: false,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        // hidden: false,
        component: () => import("@/page/home/index.vue"),
        meta: {
          title: "新闻页面",
          icon: "",
          index: "1",
        },
      },
      {
        path: "/village",
        name: "village",
        component: () => import("@/page/information/Village.vue"),
        meta: {
          title: "贫困村信息",
          icon: "",
          index: "2",
        },
        // children: [
        //   {
        //     path: "/villageDetail",
        //     name: "villageDetial",
        //     component: () => import("@/page/about/index.vue"),
        //     meta: {
        //       title: "贫困村菜单",
        //       icon: "",
        //       index: "1",
        //     },
        //   },
        // ],
      },
      {
        path: "/person",
        name: "person",
        component: () => import("@/page/information/Person.vue"),
        meta: {
          title: "贫困人员信息",
          icon: "",
          index: "3",
        },
      },
      {
        path: "/analysis",
        name: "analysis",
        redirect: "/current",
        component: () => import("@/page/analysis/index.vue"),
        meta: {
          title: "数据分析",
          icon: "",
          index: "4",
        },
        children: [
          {
            path: "/current",
            name: "current",
            component: () => import("@/page/analysis/current/index.vue"),
            meta: {
              title: "本年",
              icon: "",
              index: "4-1",
            },
          },
          {
            path: "/annual",
            name: "annual",
            component: () => import("@/page/analysis/annual/index.vue"),
            meta: {
              title: "年报",
              icon: "",
              index: "4-2",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/index",
    name: "index",
    hidden: false,
    component: () => import("@/page/home/index.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/detail",
    name: "detail",
    hidden: false,
    component: () => import("@/page/newsDetail/index.vue"),
    meta: {
      title: "新闻",
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// router.beforeEach((to, from, next) => {
//   console.log("to, from: ", to, from)
//   if (from.path == "/login") {
//     const userInfo = sessionStorage.getItem("userInfo")
//     if (userInfo) {
//       next()
//     } else {

//       next("/login")
//     }
//   } else {
//     next()
//   }
//   //   next({ name: "Login" })
//   // } else {
//   //   next()
//   // }
// })

export default router
