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
  total: string[]
  poor: string[]
  rate: string[]
}
interface optionObj {
  data: dataObj
  color: string[]
  title: string
}
interface chartProp {
  option: optionObj
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
    text: props.option.title,
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
    textStyle: {
      align: "left",
    },
    formatter: (params: any) => {
      let str = ""
      str += `<div>${params[0].name}</div>`
      for (let i = 0; i < params.length; i += 1) {
        let num = params[i].data
        if (/\./.test(num)) {
          num = (num * 100).toFixed(1) + "%"
        } else {
          num = (+num).toLocaleString()
        }
        str += ` ${params[i].marker} <span>${params[i].seriesName}</span>：<span> ${num} <br>`
      }

      return str
    },
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      // dataView: { show: true, readOnly: false },
      // magicType: { show: true, type: ["line", "bar"] },
      // restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  calculable: true,
  legend: {
    // data: ["Growth", "Budget 2011", "Budget 2012"],
    top: "6px",
    right: "5%",
    itemGap: 5,
  },
  grid: {
    top: "17%",
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
      name: "贫困率",
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
      axisLabel: {
        formatter: function (value: any) {
          return value * 100 + "%"
        },
      },
    },
  ],
  dataZoom: [
    {
      filterMode: "none",
      start: 0,
      end: 30,
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
  color: props.option.color,
})

// 赋值
const setOption = () => {
  option.xAxis.push({
    interval: 1,
    type: "category",
    data: props.option.data.name,
  })
  option.yAxis.push({
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
      show: false,
      //   lineStyle: {
      //     color: "#ECEEF5",
      //     type: "dashed",
      //   },
    },
    nameTextStyle: {
      color: "#888",
      fontSize: 12,
    },
  })
  option.series.push({
    name: "总人口",
    type: "bar",
    yAxisIndex: 1,
    // data: [120, 200, 150, 80, 70, 110, 130],
    data: props.option.data.total,
    barWidth: 15,
  })
  option.series.push({
    name: "贫困人口",
    type: "bar",
    yAxisIndex: 1,
    // data: [120, 200, 150, 80, 70, 110, 130],
    data: props.option.data.poor,
    barWidth: 15,
  })

  option.series.push({
    name: "贫困率",
    type: "line",
    // data: [120, 200, 150, 80, 70, 110, 130],
    data: props.option.data.rate,
    barWidth: 15,
    symbol: "circle",
    symbolSize: 8,
    lineStyle: {
      width: 4,
      color: "#f0b9a6",
    },
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
