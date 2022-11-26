<!-- TODO: 
          轮播图片 
          标题
          跳转
-->
<template>
  <div class="wrap">
    <div class="header"></div>
    <div class="content">
      <div class="view">
        <div class="col">
          <el-carousel v-if="newsList4.length">
            <el-carousel-item
              v-for="(item, index) in newsList4"
              :key="item.new_id"
              @click="handleNewsDetail(item.new_id)"
            >
              <span>{{ item.title }}</span>
            </el-carousel-item>
          </el-carousel>
          <div class="news">
            <div class="news-header"><span>各地咨询</span></div>

            <ul class="news-content">
              <li
                class="news-item"
                v-for="item in newsList1"
                :key="item.new_id"
                @click="handleNewsDetail(item.new_id)"
              >
                <span>{{ item.title }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="col">
          <div class="news">
            <div class="news-header"><span>焦点新闻</span></div>

            <ul class="news-content">
              <li
                class="news-item"
                v-for="item in newsList2"
                :key="item.new_id"
                @click="handleNewsDetail(item.new_id)"
              >
                <span>{{ item.title }}</span>
              </li>
            </ul>
          </div>
          <div class="news">
            <div class="news-header"><span>乡村简报</span></div>

            <ul class="news-content">
              <li
                class="news-item"
                v-for="item in newsList3"
                :key="item.new_id"
                @click="handleNewsDetail(item.new_id)"
              >
                <span>{{ item.title }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script lang="ts" setup>
import { loadEnv } from "vite"
import { NewsService } from "@/script/axios/api/api"
import { onMounted, reactive, ref } from "vue"
const mode = import.meta.env
// console.log('loadEnv', loadEnv('development', process.cwd()).VITE_APP_PORT);

// 获取新闻列表
const newsList1 = reactive<any[]>([])
const newsList2 = reactive<any[]>([])
const newsList3 = reactive<any[]>([])
const newsList4 = reactive<any[]>([])
const getNewsList = async () => {
  const res: any = await NewsService.getNewsList()
  if (res.code === 200) {
    newsList1.push(...res.data.block1)
    newsList2.push(...res.data.block2)
    newsList3.push(...res.data.block3)
    newsList4.push(...res.data.img)
  }
}

const handleNewsDetail = (id: number) => {
  console.log("id: ", id)
  window.open(`/#/detail?id=${id}`, "_blank")
}

onMounted(() => {
  getNewsList()
})
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  // height: 100%;
  height: 100vh;
  background: url("@/assets/images/home/home_bg.jpg") no-repeat;
  background-size: cover;
  background-position: center bottom;
  @include flex-center;
  flex-direction: column;
  .header {
    height: 100px;
    width: 100%;
    // background-color: rgba(230, 73, 128, 0.5);
  }
  .content {
    flex: 1;
    width: 100%;
    // backdrop-filter: blur(10px);
    @include flex-center;
    .view {
      width: 80vw;
      height: 100%;
      padding: 30px;
      display: flex;
      justify-content: center;
      // background: #fff;

      .col {
        width: 600px;
        margin-right: 20px;
        .el-carousel {
          height: 300px;
          backdrop-filter: blur(50px);
          cursor: pointer;
          .el-carousel__item {
            // position: relative;
            background-size: cover;
            background-repeat: no-repeat;
            // background-position: center;
            &:nth-child(3) {
              background-image: url(@/assets/images/carousel/1.jpg);
            }
            &:nth-child(4) {
              background-image: url(@/assets/images/carousel/2.jpg);
            }
            &:nth-child(5) {
              background-image: url(@/assets/images/carousel/3.jpg);
            }
            &:nth-child(6) {
              background-image: url(@/assets/images/carousel/4.jpg);
            }
            span {
              display: block;
              width: 100%;
              height: 50px;
              backdrop-filter: blur(50px);
              color: #fff;
              font-size: 18px;
              line-height: 50px;
              position: absolute;
              bottom: 0;
            }
          }
        }
        .news {
          width: 100%;
          height: 300px;
          // background-color: #ffc9c9;
          backdrop-filter: blur(50px);

          &:nth-child(2) {
            margin-top: 20px;
          }

          .news-header {
            // padding-left: 20px;
            color: #fff;
            line-height: 36px;
            text-align: left;
            border-bottom: 1px solid #868e96;
            span {
              font-size: 20px;
              font-weight: bold;
              position: relative;
              margin-left: 10px;
              &::after {
                content: "";
                width: 130%;
                border-top: 4px solid #fff;
                position: absolute;
                bottom: -9px;
                left: -10px;
              }
            }
          }
          .news-content {
            height: calc(100% - 36px);
            padding-left: 10px;
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: space-around;

            .news-item {
              --color: #fff;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: start;
              cursor: pointer;
              &::before {
                content: "";
                display: inline-block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                margin-right: 10px;
                background: var(--color);
              }
              span {
                display: inline-block;
                width: 90%;
                font-size: 18px;
                color: var(--color);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: start;
              }
              &:hover {
                --color: #db4e87;
              }
            }
            a {
              text-decoration: none;
            }
          }
        }
      }
    }
  }
  .footer {
    height: 150px;
    width: 100%;
    // background-color: #58b0a5;
  }
}
</style>
