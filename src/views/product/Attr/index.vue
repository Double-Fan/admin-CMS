<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="!isShowTable"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!-- 表格展示 -->
      <div v-if="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!-- 平台属性 -->
        <el-table :data="attrList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
            <template slot-scope="{ row }">
              {{ row.attrName }}
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表">
            <template slot-scope="{ row, $index }">
              <el-tag
                style="margin: 0 10px"
                type="success"
                v-for="attrValue of row.attrValueList"
                :key="attrValue.id"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <!-- 修改按钮 -->
              <el-button
                style="margin-right: 10px"
                type="warning"
                size="mini"
                icon="el-icon-edit"
                @click="updateAttr(row)"
              ></el-button>
              <!-- 删除按钮 -->
              <el-popconfirm :title="`确定删除 [${row.attrName}] 属性吗？`">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 平台属性添加|修改 -->
      <div v-if="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          style="margin: 10px 0; width: 100%"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 删除按钮 -->
              <el-popconfirm
                :title="`确定删除 [${row.valueName}] 属性值吗？`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="addOrUpdateAttr"
          :disabled="attrInfo.attrValueList.length < 1"
          >保存</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入
import cloneDeep from "lodash/cloneDeep";

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
      // 收集商品属性添加|修改的属性信息
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [], //属性值列表，每一个属性值都是一个对象需要attrId，valueName
        categoryId: 0, // 三级分类id
        categoryLevel: 3, // 分类等级
      },
    };
  },
  methods: {
    // 通过自定义事件获取123级分类id
    getCategoryId({ categoryId, level }) {
      // 通过等级进行区分
      if (level === 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level === 2) {
        this.category2Id = categoryId;
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
    // 添加属性值
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        // 对于修改，即已有属性进行添加属性值的时候，可以在自己基础之上获取id；
        // 对于新增，添加的则是undefined
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true, //用于切换编辑和查看
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 添加属性
    addAttr() {
      this.isShowTable = false;
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [], //属性值列表
        categoryId: this.category3Id, // 三级分类id，此时可以收集
        categoryLevel: 3, // 分类等级,
      };
    },
    // 修改某一个属性
    updateAttr(row) {
      this.isShowTable = false;
      // 由于当前对象结构中存在对面里面套数组，因此需要深拷贝来解决。
      // this.attrInfo = {...row};
      this.attrInfo = cloneDeep(row);
      this.attrInfo.attrValueList.forEach((item) => {
        // item.flag = false; // 需要数据劫持的方式添加属性（响应式）
        this.$set(item, "flag", false);
      });
    },
    // 切换到查看模式
    toLook(row) {
      // row 是最新的数据
      if (row.valueName.trim() == "") {
        this.$message("输入不能为空");
        return;
      }
      // 判断新增属性值是否与已有属性值重复
      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        // 不要自己和自己比较，遍历的时候，把自己排除
        if (row != item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepeat) {
        this.$message("不允许重复");
        return;
      }
      row.flag = false;
    },
    // 切换到编辑模式
    toEdit(row, index) {
      row.flag = true;
      // 由查看到编辑，vue会等函数体全部执行完再去渲染，所以获取不到
      this.$nextTick(() => {
        // 获取input，实现聚焦
        this.$refs[index].focus();
      });
    },
    // 删除属性值的气泡确认框的确定
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    // 保存|更新数据
    async addOrUpdateAttr() {
      // 整理参数
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter((c) => {
        if (c.valueName.trim() != "") {
          // 删除对象属性
          delete c.flag;
          return true;
        }
      });
      // 发请求
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
        this.isShowTable = true;
        this.$message({ type: "success", message: "保存成功" });
        this.getAttrList();
      } catch (error) {
        this.$message({ type: "error", message: "保存失败" });
      }
    },
  },
};
</script>
