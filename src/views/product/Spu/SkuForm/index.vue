<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          type="number"
          placeholder="价格(元)"
          v-model="skuInfo.price"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          type="textarea"
          placeholder="规格描述"
          rows="4"
          v-model="skuInfo.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item
            :label="attr.attrName"
            v-for="attr of attrInfoList"
            :key="attr.id"
          >
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
                v-for="attrValue of attr.attrValueList"
                :key="attrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item
            :label="saleAttr.saleAttrName"
            v-for="saleAttr of spuSaleAttrList"
            :key="saleAttr.id"
          >
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
              <el-option
                :label="saleAttrValue.saleAttrValueName"
                :value="`${saleAttr.id}:${saleAttrValue.id}`"
                v-for="saleAttrValue of saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          style="width: 100%"
          border
          :data="spuImageList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" prop="prop" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{ row, $index }">
              <img
                style="width: 100px; height: 100px"
                :src="row.imgUrl"
                alt=""
              />
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="名称" width="width">
            <template slot-scope="{ row, $index }">
              {{ row.imgName }}
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                v-if="row.isDefault == 0"
                @click="changeDefault(row)"
                >设为默认</el-button
              >
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      // 存储图片信息
      spuImageList: [],
      // 存储销售属性
      spuSaleAttrList: [],
      // 存储平台属性
      attrInfoList: [],
      // 收集sku数据的字段
      skuInfo: {
        // 第一类数据：父亲给的
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二类数据：通过 v-model 收集
        skuName: "",
        price: 0,
        weight: "",
        skuDesc: "",
        // 第三类，需要自己收集
        skuAttrValueList: [],
        skuDefaultImg: "", //默认图片
        skuImageList: [],
        skuSaleAttrValueList: [],
      },
      spu: {},
      // 收集图片数据字段
      imageList: [],
    };
  },
  methods: {
    // 获取SKUForm数据
    async getData(category1Id, category2Id, spu) {
      // 收集父组件给予的数据
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.skuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      this.spu = spu;
      // 获取图片
      let imageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (imageResult.code === 200) {
        let list = imageResult.data;
        list.forEach((item) => {
          item.isDefault = 0;
        });
        this.spuImageList = list;
      }
      // 获取销售属性
      let saleResult = await this.$API.spu.reqSpuSaleAttrList(spu.id);
      if (saleResult.code === 200) {
        this.spuSaleAttrList = saleResult.data;
      }
      // 获取平台属性
      let attrResult = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (attrResult.code === 200) {
        this.attrInfoList = attrResult.data;
      }
    },
    // table表格复选框
    handleSelectionChange(selection) {
      // 获取到用户选中所有图片的数据，但是缺少isDefault 字段
      this.imageList = selection;
    },
    // 排他
    changeDefault(row) {
      this.spuImageList.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      // 收集默认图片信息
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    // 取消
    cancel() {
      this.$emit("changeScene2", 0);
      // 清除数据
      Object.assign(this._data, this.$options.data());
    },
    // 保存
    async save() {
      const { attrInfoList, skuInfo, spuSaleAttrList, imageList } = this;
      // 整理平台属性
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
        // 有值，说明用户已选择
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(":");
          prev.push({ attrId, valueId });
        }
        return prev;
      }, []);
      // 整理销售属性
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        // 有值，说明用户已选择
        if (item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] =
            item.attrIdAndValueId.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev;
      }, []);
      // 整理图片属性
      skuInfo.skuImageList = imageList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });
      // 保存请求
      let result = await this.$API.spu.reqSaveSkuInfo(skuInfo);
      if (result.code === 200) {
        this.$message({ type: "success", message: "保存成功" });
        this.$emit("changeScene", 0);
      }
    },
  },
};
</script>

<style></style>
