<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
// 引入Echarts
import echarts from "echarts";

export default {
  name: "ProgressChart",
  mounted() {
    // 初始化Echarts实例
    let barCharts = echarts.init(this.$refs.charts);
    // 配置数据
    barCharts.setOption({
      xAxis: {
        show: false,
        // 最小值、最大值设置
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        type: "category",
      },
      // 系列
      series: [
        {
          type: "bar",
          // 平滑
          smooth: true,
          data: [78],
          color: "orange",
          // 柱状图宽度
          barWidth: 10,
          color: "yellowgreen",
          // 背景设置
          showBackground: true,
          backgroundStyle: {
            color: "#eee",
          },
          // 文本标签
          label: {
            show: true,
            formatter: '|',
            position: 'right'
          }
        },
      ],
      // 布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
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
