<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene != 0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!-- 展示SPU列表数据 -->
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table :data="records" style="width: 100%">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <HitButton
                type="success"
                size="mini"
                icon="el-icon-plus"
                title="添加spu"
                @click="addSku(row)"
              ></HitButton>
              <HitButton
                type="warning"
                size="mini"
                icon="el-icon-edit"
                title="修改spu"
                @click="updateSku(row)"
              ></HitButton>
              <HitButton
                type="info"
                size="mini"
                icon="el-icon-info"
                title="查看spu"
                @click="handler(row)"
              ></HitButton>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <HitButton
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  title="删除spu"
                  slot="reference"
                ></HitButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 9]"
          :page-size="limit"
          layout="prev, pager, next, jumper , -> ,sizes, total"
          :total="total"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>

      <!-- 添加|修改spu -->
      <SpuForm
        v-show="scene === 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>

      <!-- 添加sku -->
      <SkuForm
        v-show="scene === 2"
        ref="sku"
        @changeScene2="changeScene2"
      ></SkuForm>

      <!-- sku列表对话框 -->
      <el-dialog
        :title="`${spu.spuName}的 sku 列表`"
        :visible.sync="dialogTableVisible"
        :before-close="close"
      >
        <el-table
          :data="skuList"
          style="width: 100%"
          border
          v-loading="loading"
        >
          <el-table-column prop="skuName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="price" label="价格" width="width">
          </el-table-column>
          <el-table-column prop="weight" label="重量" width="width">
          </el-table-column>
          <el-table-column label="默认图片" width="width">
            <template slot-scope="{ row, $index }">
              <img
                style="width: 100px; height: 100px"
                :src="row.skuDefaultImg"
                alt=""
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";

export default {
  name: "Spu", //Standard Product Unit
  components: { SpuForm, SkuForm },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // spu列表数据
      records: [],
      // 第几页
      page: 1,
      // 页大小
      limit: 3,
      // 总条数
      total: 0,
      // 0：展示spu  1：添加|修改spu  2：添加sku
      scene: 0,
      // 控制对话框显示隐藏
      dialogTableVisible: false,
      spu: {},
      skuList: [],
      // loading
      loading: true,
    };
  },
  methods: {
    // 获取SPU数据
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code === 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    // 把子组件相应的id传给父组件
    getCategoryId({ categoryId, level }) {
      if (level === 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level === 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    // 处理页大小改变
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    // 添加spu按钮的回调
    addSpu() {
      this.scene = 1;
      // 通知子组件发请求
      this.$refs.spu.addSpuData(this.category3Id);
    },
    // 修改某个spu
    updateSku(row) {
      this.scene = 1;
      this.$refs.spu.initSpuData(row);
    },
    // 添加sku按钮的回调
    addSku() {
      this.scene = 2;
    },
    // spuForm 子组件自定义事件
    changeScene({ scene, flag }) {
      this.scene = scene;
      if (flag == "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    // 删除SPU
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code === 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    // 新增
    addSku(row) {
      this.scene = 2;
      // 父组件调用子组件的方法，让子组件发请求  --- 三个请求
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    // skuForm 切换场景
    changeScene2(scene) {
      this.scene = scene;
    },
    // 查看sku列表
    async handler(spu) {
      this.dialogTableVisible = true;
      this.spu = spu;
      // 发请求获取 sku 列表
      let result = await this.$API.spu.reqSkuList(spu.id);
      if (result.code === 200) {
        this.skuList = result.data;
        this.loading = false;
      }
    },
    // 对话框关闭的回调
    close(done) {
      // 将loading属性再次变为true
      this.loading = true;
      // 清除sku列表数据
      this.skuList = [];
      // 关闭对话框
      done();
    },
  },
};
</script>

<style scoped></style>
