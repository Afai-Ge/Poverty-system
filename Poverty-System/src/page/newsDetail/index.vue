<template>
  <div class="wrap" v-loading="load">
    <div class="view">
      <div class="header">
        <div class="title">{{ newsData.title }}</div>
        <div class="message">
          <span>时间：{{ newsData.date }}</span>
          <span
            >转自：<a href="http://rural.gd.gov.cn/">广东省乡村振兴局</a></span
          >
        </div>
        <p></p>
      </div>
      <div class="content">
        <p v-for="(item, index) in newsData.content" :key="index">{{ item }}</p>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue"
import { NewsService } from "@/script/axios/api/api"
import { useRouter } from "vue-router"
const router = useRouter()
const load = ref(true)
// 新闻资料
const newsData = reactive({
  title: "",
  date: "",
  content: [],
})
const id = router.currentRoute.value.query.id
console.log("id: ", id)
const getNewsDetail = async () => {
  const res: any = await NewsService.getNewsDetail({ id: id })
  if (res.code === 200) {
    console.log("res: ", res)
    newsData.title = res.data.title
    newsData.date = res.data.date
    newsData.content = res.data.content
    load.value = false
  }
}

onMounted(() => {
  getNewsDetail()
})
</script>

<style lang="scss" scoped>
.wrap {
  background: url("@/assets/images/home/home_bg.jpg") no-repeat;
  background-size: cover;
  background-position: center bottom;
  .view {
    width: 1200px;
    margin: 0 auto;
    min-height: 100vh;
    background-color: #fff;
    // backdrop-filter: blur(50px);
    padding: 50px;
    .header {
      border-bottom: 2px dotted #d5d5d5;
      .title {
        color: #222;
        font-size: 24px;
        margin-bottom: 50px;
      }
      .message {
        color: #666;
        font-size: 14px;
        margin-bottom: 14px;
        span {
          margin-right: 1em;
        }
      }
    }
    .content {
      margin-top: 40px;
      p {
        color: #444;
        font-size: 16px;
        line-height: 2em;
        text-align: start;
      }
    }
  }
}
</style>
