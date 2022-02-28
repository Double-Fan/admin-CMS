<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div class="search-header">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span>
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="12">
            <LineCharts></LineCharts>
          </el-col>
          <el-col :span="12">
            <LineCharts></LineCharts>
          </el-col>
        </el-row>
        <!-- table -->
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column type="index" label="排名" width="80">
          </el-table-column>
          <el-table-column label="搜索关键字" width="180"> </el-table-column>
          <el-table-column label="用户数" sortable> </el-table-column>
          <el-table-column label="周涨幅" sortable> </el-table-column>
        </el-table>
        <!-- pagination -->
        <el-pagination class="pagination" layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>
  </el-card>
</template>

<script>
import LineCharts from "./LineCharts";

export default {
  name: "Search",
  components: {
    LineCharts,
  },
  data() {
    return {
      tableData: [{}],
    };
  },
};
</script>

<style scoped>
.search-header {
  display: flex;
  justify-content: space-between;
}
.pagination {
  text-align: center;
}
</style>
