<template>
  <div class="chart">
    <chart-annual
      :option="annualData"
      v-if="annualData.isLoaded"
      height="480px"
      width="100%"
    ></chart-annual>
  </div>
  <div class="content">
    <div class="pan">
      <div
        class="item"
        v-for="(item, index) in panData.data"
        :style="{ 'background-color': panData.color[index % 6] }"
      >
        <div class="title">
          <div class="type">{{ item.type }}</div>
          <div class="des">{{ item.des }}</div>
        </div>
        <div class="number">
          {{ item.number }}
          <div class="unit">{{ item.unit }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ChartAnnual } from "@/components/charts/index"
import { onMounted, reactive } from "vue"
import { AnalysisService } from "@/script/axios/api/api"

const annualData = reactive({
  title: "近年来贫困人口占比情况",
  color: ["#adb5bd", "#375bf8", "#f05c29"],
  data: {
    year: [],
    total: [],
    poor: [],
    rate: [],
  },
  isLoaded: false,
})
const getAnnual = async () => {
  const res: any = await AnalysisService.getAnnalData()
  const { code, data } = res
  if (code === 200) {
    console.log("data: ", data)
    annualData.data = data
    annualData.isLoaded = true
  }
}
const updateAnnual = async () => {
  await AnalysisService.updateAnnal()
}
onMounted(() => {
  updateAnnual()
  getAnnual()
  getPanData()
})
/**
 *  数据分析板
 */
const panData = reactive({
  // color 色盘
  color: ["#F5C443", "#76BDFB", "#7A7DFA", "#EE7FA1", "#67C1C2", "#6CCDAE"],
  data: [
    {
      type: "",
      des: "",
      number: "",
      unit: "",
    },
  ],
})
const getPanData = async () => {
  const res: any = await AnalysisService.getPanData()
  console.log("res: ", res)
  const { code, data } = res
  if (code === 200) {
    panData.data = data.data
  }
}
// const panData = reactive([
//   {
//     type: "贫困占比最高",
//     des: "2010 年",
//     number: "67.0",
//     unit: "%",
//   },
//   {
//     type: "贫困占比最低",
//     des: "2022 年",
//     number: "33.0",
//     unit: "%",
//   },
//   {
//     type: "贫困人口最高",
//     des: "2010 年",
//     number: "4,056",
//     unit: "人",
//   },
//   {
//     type: "贫困人口最低",
//     des: "2022 年",
//     number: "2,002",
//     unit: "人",
//   },
//   {
//     type: "同比幅度下降",
//     des: "2021-2022 年",
//     number: "11.0",
//     unit: "%",
//   },
//   {
//     type: "近十年降幅",
//     des: "2012-2022 年",
//     number: "28.0",
//     unit: "%",
//   },
//   {
//     type: "未有明显降幅",
//     des: "2012-2016 年",
//     number: "5",
//     unit: "年",
//   },
// ])
</script>

<style lang="scss" scoped>
.chart {
  // background: #ffa8a8;
  width: 100%;
  height: 480px;
}
.content {
  width: 100%;
  height: calc(100% - 480px);
  background-color: #ececec;
  padding-top: 14px;
  .pan {
    // height: calc(100% - 14px);
    height: 100%;
    background: #fff;
    padding: 14px 0 0 14px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    .item {
      width: 240px;
      height: 80px;
      background-color: pink;
      border-radius: 4px;
      margin: 0 36px 14px 0;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px;
      .title {
        .type {
          // font-family: "黑体";
          // font-weight: bold;
          font-size: 18px;
          margin-bottom: 8px;
        }
        .des {
        }
      }
      .number {
        font-size: 32px;
        // font-weight: bold;
        display: flex;
        align-items: flex-end;
        line-height: 32px;
        .unit {
          font-size: 14px;
          text-align: end;
          line-height: 20px;
          width: 16px;
        }
      }
    }
  }
}
</style>
