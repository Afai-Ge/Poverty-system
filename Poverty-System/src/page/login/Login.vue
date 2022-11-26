<template>
  <el-form class="form-show" :rules="loginRules" :model="form" ref="Login_Form">
    <span>账号密码登录</span>
    <el-form-item prop="username">
      <el-input
        v-model="form.username"
        placeholder="请输入用户名/手机号"
        :prefix-icon="User"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="form.password"
        type="password"
        placeholder="请输入密码"
        :prefix-icon="Lock"
        show-password
        @keyup.enter="login"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="login-button" type="primary" @click="login"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
  <span id="toRegister" @click="toRegister">注册账户</span>
</template>

<script setup lang="ts">
import { ref, reactive, unref } from "vue"
import { useRouter } from "vue-router"
import { ElNotification } from "element-plus"
import { User, Lock } from "@element-plus/icons-vue"
import { UserService } from "@/script/axios/api/api"
import md5 from "md5"
import { useStore } from "@/store"
const router = useRouter()
const Login_Form = ref()
const form = reactive({
  username: "",
  password: "",
})

const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 12, message: "密码长度在6-12位", trigger: "blur" },
  ],
})

const store = useStore()

const login = () => {
  const el = unref(Login_Form)
  console.log("el: ", el)
  el.validate(async (valid: any) => {
    if (valid) {
      const res: any = await UserService.login({
        username: form.username,
        password: md5(form.password),
      })

      console.log("click login")
      console.log("res: ", res)
      const { code, data } = res
      const { username, role, msg } = data
      if (code === 200) {
        ElNotification({
          title: msg,
          message: `跳转至首页`,
          type: "success",
          duration: 3000,
        })
        sessionStorage.setItem("userInfo", data)
        if (role === "admin") {
          // sessionStorage.setItem("currentMenu", "1")
          store.commit("SET_CURRENT_MENU", "1")
          router.push("/home")
        } else {
          router.push("/index")
        }
      } else {
        ElNotification({
          title: "登陆失败",
          message: msg,
          type: "warning",
          duration: 3000,
        })
      }
    }
  })
}

const toRegister = () => {
  router.push("/register")
}
</script>

<style lang="scss" scoped>
.form-show {
  margin-top: 70px;
  .el-form-item {
    margin-bottom: 20px;
    .login-button {
      margin-top: 30px;
      width: 100%;
    }
  }
  span {
    font-size: 12px;
    color: #888;
    line-height: 30px;
  }
}
#toRegister {
  font-size: 12px;
  color: #888;
  cursor: pointer;
  &:hover {
    color: #409eff;
  }
}
</style>
