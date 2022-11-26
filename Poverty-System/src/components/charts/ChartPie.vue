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
  title: string
  data: object
  color?: object
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

  setTimeout(() => {
    drawChart()
  }, 20)
})

const option = reactive({
  title: {
    text: props.data.title,
    left: "center",
    top: "14px",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "left",
    orient: "vertical",
  },
  toolbox: {
    show: true,
    right: 0,
    feature: {
      mark: { show: true },
      // dataView: { show: true, readOnly: false },
      // magicType: { show: true, type: ["line", "bar"] },
      // restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      name: "学历分布",
      type: "pie",
      // radius: ["40%", "70%"],
      radius: "50%",
      avoidLabelOverlap: true,
      label: {
        show: true,
        // position: "center",
      },
      itemStyle: {
        borderRadius: 5,
        borderColor: "#fff",
        borderWidth: 2,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "16",
          formatter: "{b}: {d}%",
        },
        shadowBlur: 20,
        shadowOffsetX: 5,
        shadowColor: "rgba(0, 0, 0, 0.5)",
      },
      labelLine: {
        show: true,
      },
      // data: [
      //   { value: 1048, name: 'Search Engine' },
      //   { value: 735, name: 'Direct' },
      //   { value: 580, name: 'Email' },
      //   { value: 484, name: 'Union Ads' },
      //   { value: 300, name: 'Video Ads' }
      // ]
      data: props.data.data,
    },
  ],
  color: props.data.color,
})

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
