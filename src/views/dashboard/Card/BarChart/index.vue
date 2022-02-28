<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
// 引入Echarts
import echarts from "echarts";

export default {
  name: "BarChart",
  mounted() {
    // 初始化Echarts实例
    let barCharts = echarts.init(this.$refs.charts);
    // 配置数据
    barCharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      // 系列
      series: [
        {
          type: "bar",
          // 平滑
          smooth: true,
          data: [10, 7, 44, 33, 88, 12, 9, 24, 7, 44, 66, 1],
          color: "orange",
        },
      ],
      // 布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      // 提示
      tooltip: {}
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
