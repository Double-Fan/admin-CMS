import request from "@/utils/request";

// 获取SPU列表  /admin/product/{page}/{limit}  GET
export const reqSpuList = (page, limit, category3Id) =>
  request({
    url: `/admin/product/${page}/${limit}`,
    method: "get",
    params: { category3Id },
  });

// 获取spu基本信息  /admin/product/getSpuById/{spuId}  GET
export const reqSpu = (spuId) =>
  request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: "GET",
  });

// 获取品牌信息  /admin/product/baseTrademark/getTrademarkList  GET
export const reqTradeMarkList = () =>
  request({
    url: `/admin/product/baseTrademark/getTrademarkList`,
    method: "get",
  });

// 获取SPU图片  /admin/product/spuImageList/{spuId}  GET
export const reqSpuImageList = (spuId) =>
  request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: "get",
  });

// 获取平台全部的销售属性  /admin/product/baseSaleAttrList  GET
export const reqBaseSaleAttrList = () =>
  request({
    url: `/admin/product/baseSaleAttrList`,
    method: "get",
  });

// 增加SPU  /admin/product/saveSpuInfo  POST
// 修改SPU  /admin/product/updateSpuInfo  POST
export const reqAddOrUpdateSpu = (data) => {
  if (data.id) {
    // 参数带有id，则为修改
    return request({
      url: `/admin/product/updateSpuInfo`,
      method: "post",
      data,
    });
  } else {
    // 参数不带有id，则为增加
    return request({
      url: `/admin/product/saveSpuInfo`,
      method: "post",
      data,
    });
  }
};

// 删除SPU  /admin/product/deleteSpu/{spuId}  delete
export const reqDeleteSpu = (spuId) =>
  request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: "delete",
  });

// 获取销售属性  /admin/product/spuSaleAttrList/{spuId}  GET
export const reqSpuSaleAttrList = (spuId) =>
  request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: "get",
  });

// 获取平台属性的数据  /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}  GET
export const reqAttrInfoList = (category1Id, category2Id, category3Id) =>
  request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });

// 保存  /admin/product/saveSkuInfo  POST
export const reqSaveSkuInfo = (data) =>
  request({
    url: `/admin/product/saveSkuInfo`,
    method: "post",
    data,
  });

// 获取SKU列表数据接口  /admin/product/findBySpuId/{spuId}  GET
export const reqSkuList = (spuId) =>
  request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: "get",
  });
