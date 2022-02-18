<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-card>
      <!-- 表格展示 -->
      <div v-if="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="isShowTable = false"
          >添加属性</el-button
        >
        <!-- 平台属性 -->
        <el-table :data="attrList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="attrValueList" label="属性值列表">
            <template slot-scope="{ row, $index }">
              <!-- row是每个平台的属性 -->
              <el-tag
                style="margin: 0 10px"
                type="success"
                v-for="attr of row.attrValueList"
                :key="attr.id"
                >{{ attr.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template>
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-edit"
                @click="isShowTable = false"
              ></el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 平台属性添加|修改 -->
      <div v-if="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus">添加属性值</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table style="margin: 10px 0; width: 100%" border>
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
          </el-table-column>
          <el-table-column label="操作" width="width"> </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Attr",
  data() {
    return {
      // 一级分类id
      category1Id: "",
      // 二级分类id
      category2Id: "",
      // 三级分类id
      category3Id: "",
      // 平台属性
      attrList: [],
      // 表格的显示与隐藏
      isShowTable: true,
    };
  },
  methods: {
    // 获取123级分类id
    getCategoryId({ categoryId, level }) {
      if (level === 1) {
        this.category1Id = categoryId;
        // 清空23级id
        this.category2Id = "";
        this.category3Id = "";
      } else if (level === 2) {
        this.category2Id = categoryId;
        // 清空3级id
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        // 获取123级id后，获取数据
        this.getAttrList();
      }
    },
    // 获取平台属性数据
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code === 200) {
        this.attrList = result.data;
      }
    },
  },
};
</script>
