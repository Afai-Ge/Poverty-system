<template>
  <div>
    <div
      ref="chartRef"
      :style="{ width: props.width, height: props.height }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, withDefaults, reactive } from "vue"
import * as echarts from "echarts"
interface dataObj {
  name: string[]
  value: number[]
  color: string[]
  title: string
}
interface chartProp {
  data: dataObj
  width?: string
  height?: string
}

const props = withDefaults(defineProps<chartProp>(), {
  width: "100%",
  height: "360px",
})
const chartRef = ref<any>(null)

onMounted(() => {
  console.log("props:", props)
  setOption()
  setTimeout(() => {
    drawChart()
  }, 20)
})

const option = reactive<any>({
  title: {
    text: props.data.title + "排名",
    left: "center",
    top: "14px",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
      label: {
        show: true,
      },
    },
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      // dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ["line", "bar"] },
      // restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  calculable: true,
  legend: {
    // data: ["Growth", "Budget 2011", "Budget 2012"],
    top: "30px",
    right: "4px",
    itemGap: 5,
  },
  grid: {
    top: "12%",
    left: "24px",
    right: "14px",
    bottom: "16px",
    containLabel: true,
  },
  xAxis: [
    // {
    //   type: "category",
    //   // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    //   data: [],
    // },
  ],
  yAxis: [
    {
      type: "value",
      name: "人口（人）",
      // axisLabel: "(人)",
      // axisLabel: {
      //   formatter: function (a: any) {
      //     a = +a
      //     return isFinite(a) ? echarts.format.addCommas(+a / 1000) : ""
      //   },
      // },
      splitLine: {
        lineStyle: {
          color: "#ECEEF5",
          type: "dashed",
        },
      },
      nameTextStyle: {
        color: "#888",
        fontSize: 12,
      },
    },
  ],
  dataZoom: [
    {
      filterMode: "none",
      start: 0,
      end: 20,
      zoomLock: true,
      height: 0,
      handleSize: 0,
      throttle: 100,
      // backgroundColor: 'rgba(0,255,0,0)',
      borderColor: "#c1c1c1",
      moveHandleSize: 10,
      moveHandleStyle: {
        color: "#c1c1c1",
      },
      // handleSize: '100%',
      showDetail: false,
      brushStyle: {
        borderWidth: 10,
      },
    },
    // {
    //   type: "inside",
    //   start: 94,
    //   end: 100,
    // },
    // {
    //   show: true,
    //   yAxisIndex: 0,
    //   filterMode: "empty",
    //   width: 30,
    //   height: "80%",
    //   showDataShadow: false,
    //   left: "93%",
    // },
  ],
  series: [
    // {
    //   name: "贫困信息",
    //   type: "bar",
    //   // data: [120, 200, 150, 80, 70, 110, 130],
    //   // data: value,
    // },
    // {
    //   name: "Budget 2012",
    //   type: "bar",
    //   //   data: obama_budget_2012.budget2012List,
    // },
  ],
  color: props.data.color,
})

// 赋值
const setOption = () => {
  option.xAxis.push({
    interval: 1,
    type: "category",
    data: props.data.name,
  })
  option.series.push({
    name: props.data.title,
    type: "bar",
    // data: [120, 200, 150, 80, 70, 110, 130],
    data: props.data.value,
    barWidth: 15,
  })
}

// 绘制折线图
const drawChart = () => {
  // 初始化echarts实例
  const Chart = echarts.init(chartRef.value)
  // 父组件传来的实例参数
  Chart.setOption(option)
  window.addEventListener("resize", () => {
    //页面大小变化后Echarts也更改大小
    Chart.resize()
  })
}
// return {
//   chartRef,
//   drawChart,
// }
</script>
