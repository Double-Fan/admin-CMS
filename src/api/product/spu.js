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
