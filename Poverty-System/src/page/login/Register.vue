<template>
  <el-form
    class="form-show"
    :rules="registerRules"
    :model="form"
    ref="ruleFormRef"
  >
    <el-form-item prop="username">
      <el-input v-model="form.username" placeholder="账号，必填"></el-input>
    </el-form-item>
    <el-form-item prop="phone">
      <el-input v-model="form.phone" placeholder="手机，必填"></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input v-model="form.email" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item prop="role">
      <span style="color: #888">选择角色：</span>
      <el-radio-group v-model="form.role">
        <el-radio-button label="user" />
        <el-radio-button label="admin" />
      </el-radio-group>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="form.password"
        placeholder="密码至少六位，必填"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item prop="confirmPassword">
      <el-input
        type="password"
        v-model="form.confirmPassword"
        placeholder="确认密码，必填"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="register">立即注册</el-button>
    </el-form-item>
    <span id="toLogin" @click="toLogin">使用已有帐号登录</span>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, unref } from "vue"
import { useRouter } from "vue-router"
import { UserService } from "@/script/axios/api/api"
import { ElNotification } from "element-plus"
import md5 from "md5"
// 表单验证
const ruleFormRef = ref()

const form = reactive({
  username: "",
  phone: "",
  email: "",
  role: "",
  roleList: ["user", "admin"],
  password: "",
  confirmPassword: "",
})

const checkPhone = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入手机号"))
  }
  // 判断手机号
  else if (
    !/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(
      value
    )
  ) {
    callback(new Error("请输入正确的手机号"))
  } else {
    callback()
  }
}

const checkEmail = (rule: any, value: any, callback: any) => {
  if (value !== "") {
    if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
      callback(new Error("请输入正确的邮箱"))
    }
  }
  callback()
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"))
  } else {
    if (form.confirmPassword !== "") {
      if (!ruleFormRef.value) {
        return ruleFormRef.value.validateField("confirmPassword", () => null)
      }
    }
    callback()
  }
}

const validateConfirmPass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"))
  } else {
    if (form.password !== "") {
      if (value !== form.password) {
        callback(new Error("两次输入的密码不一致"))
      }
    }
    callback()
  }
}

const registerRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  phone: [
    // { required: true, message: "请输入手机号", trigger: "blur" },
    { validator: checkPhone, trigger: "blur" },
  ],
  email: [{ validator: checkEmail, trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { validator: validatePass, trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    { validator: validateConfirmPass, trigger: "blur" },
  ],
})

/**
 * 注册
 */
const register = async () => {
  const el = unref(ruleFormRef)
  console.log("el: ", el)
  el.validate(async (valid: any) => {
    if (valid) {
      form.password = md5(form.password)
      const res: any = await UserService.register(form)
      console.log("res: ", res)
      if (res.code === 200) {
        toLogin()
        ElNotification({
          type: "success",
          message: "注册成功，请登录",
        })
      } else {
        const { msg } = res.data
        const ref = unref(ruleFormRef)
        ref.resetFields()
        ElNotification({
          type: "error",
          message: msg,
        })
      }
    }
  })
  // form.password = md5(form.password)
  // const res: any = await UserService.register(form)
  // console.log("res: ", res)
  // if (res.code === 200) {
  //   toLogin()
  //   ElNotification({
  //     type: "success",
  //     message: "注册成功，请登录",
  //   })
  // } else {
  //   const { msg } = res.data
  //   const ref = unref(ruleFormRef)
  //   ref.resetFields()
  //   ElNotification({
  //     type: "error",
  //     message: msg,
  //   })
  // }
}

const router = useRouter()
const toLogin = () => {
  router.push("/login")
}
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  .el-form-item {
    margin-bottom: 14px;
    .el-button {
      width: 100%;
    }
  }
  span {
    font-size: 12px;
    color: #888;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }
}
</style>
