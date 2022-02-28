<template>
  <el-row :gutter="10">
    <el-col :span="6">
      <Detail title="总销售额" count="￥126560">
        <template v-slot:charts>
          <span
            >周同比 1%
            <svg
              t="1645794122008"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3935"
              width="16"
              height="16"
            >
              <path
                d="M960 704L512 256l-448 448z"
                fill="#1afa29"
                p-id="3936"
              ></path>
            </svg>
          </span>
          <span
            >日同比 2%
            <svg
              t="1645794193419"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4215"
              width="16"
              height="16"
            >
              <path
                d="M64 320l448 448 448-448z"
                fill="#d81e06"
                p-id="4216"
              ></path>
            </svg>
          </span>
        </template>
        <template v-slot:footer>
          <span>日销售额 ￥1234</span>
        </template>
      </Detail>
    </el-col>
    <el-col :span="6">
      <Detail title="总访问量" count="126560">
        <template v-slot:charts>
          <LineChart></LineChart>
        </template>
        <template v-slot:footer>
          <span>日访问量 1234</span>
        </template>
      </Detail>
    </el-col>
    <el-col :span="6">
      <Detail title="支付笔数" count="126560">
        <template v-slot:charts>
          <BarChart></BarChart>
        </template>
        <template v-slot:footer>
          <span>转化率 65%</span>
        </template>
      </Detail>
    </el-col>
    <el-col :span="6">
      <Detail title="运营活动效果" count="78%">
        <template v-slot:charts>
          <ProgressChart></ProgressChart>
        </template>
        <template v-slot:footer>
          <span
            >周同比 1%
            <svg
              t="1645794122008"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3935"
              width="16"
              height="16"
            >
              <path
                d="M960 704L512 256l-448 448z"
                fill="#1afa29"
                p-id="3936"
              ></path></svg
          ></span>
          <span
            >日同比 2%
            <svg
              t="1645794193419"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4215"
              width="16"
              height="16"
            >
              <path
                d="M64 320l448 448 448-448z"
                fill="#d81e06"
                p-id="4216"
              ></path>
            </svg>
          </span>
        </template>
      </Detail>
    </el-col>
  </el-row>
</template>

<script>
import Detail from "./Detail";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import ProgressChart from "./ProgressChart";

export default {
  name: "Card",
  components: { Detail, LineChart, BarChart, ProgressChart },
};
</script>

<style></style>
