<!-- 
  1 学历分布图
  2 性别比例图
  3 年龄分布
  4 村->贫困人数排布
 -->
<template>
  <div class="chart-view">
    <div class="top">
      <div class="chart">
        <chart-pie v-if="pieLoaded" :data="eduData" height="400px"></chart-pie>
      </div>
      <div class="chart">
        <chart-pie v-if="pieLoaded" :data="sexData" height="400px"></chart-pie>
      </div>
      <div class="chart">
        <!-- TODO：添加点击事件，pie图和line图转换 -->
        <chart-pie v-if="pieLoaded" :data="ageData" height="400px"></chart-pie>
      </div>
    </div>
    <div class="content">
      <div class="chart">
        <chart-ratio
          v-if="ratioLoaded"
          :option="ratioData"
          height="480px"
        ></chart-ratio>
      </div>
    </div>
  </div>

  <!-- <chart-pie :data="data"></chart-pie> -->
</template>
<script lang="ts" setup>
import { ChartPie, ChartRatio } from "@/components/charts/index"
// import ChartPie from "@/components/charts/ChartPie.vue"
import { ref, reactive, onMounted } from "vue"
import { AnalysisService } from "@/script/axios/api/api"

onMounted(() => {
  getRatioData()
  getLineData()
})
const ratioLoaded = ref(false)
const pieLoaded = ref(false)
const eduData = reactive({
  title: "学历分布",
  data: [
    {
      name: "研究生",
      value: "10",
    },
    {
      name: "本科",
      value: "20",
    },
    {
      name: "中学",
      value: "30",
    },
    {
      name: "小学",
      value: "50",
    },
  ],
  color: ["#375BF8", "#307CD9", "#42C0F0", "#30D5D9", "#37F8C6"],
})
const sexData = reactive({
  title: "性别比例分布",
  data: [
    {
      name: "男",
      value: "10",
    },
    {
      name: "女",
      value: "20",
    },
  ],
  color: ["#7A8DF0", "#F0A186", "#6FC7F0", "#29D9D6", "#2FF8BC"],
})
const ageData = reactive({
  title: "年龄比例分布",
  data: [
    {
      name: "1~12岁",
      value: "42",
    },
    {
      name: "13~17岁",
      value: "76",
    },
    {
      name: "19~45岁",
      value: "45",
    },
    {
      name: "46-69岁",
      value: "49",
    },
    {
      name: ">69岁",
      value: "92",
    },
  ],
  color: ["#375BF8", "#307CD9", "#42C0F0", "#30D5D9", "#37F8C6"],
})
const getRatioData = async () => {
  const res: any = await AnalysisService.getRatioData()
  const { code, data } = res
  if (code === 200) {
    console.log(data)
    const { edu, sex, age } = data
    eduData.data = edu
    sexData.data = sex
    ageData.data = age
    pieLoaded.value = true
  }
}

const ratioData = reactive<any>({
  title: "各村贫困率排名",
  data: {
    name: [],
    total: [],
    poor: [],
    rate: [],
  },
  color: ["#375bf8", "#42c0f0", "#f05c29"],
})

const getLineData = async () => {
  let res: any = await AnalysisService.getLineData()
  if (res.code == 200) {
    ratioData.data = res.data
    console.log("ratioData: ", ratioData)
    ratioLoaded.value = true
  }
}
</script>
<style lang="scss" scoped>
.chart-view {
  width: 100%;
  background: #ececec;
  flex-direction: column;
  .top {
    display: flex;
    width: 100%;
    height: 400px;
    margin-bottom: 10px;
    .chart {
      flex: 1;
      height: 400px;
      background: #fff;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .content {
    width: 100%;
    height: 480px;
    .chart {
      background: #fff;
      height: 100%;
    }
  }
}
</style>
