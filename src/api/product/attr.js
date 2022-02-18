import request from "@/utils/request";

// 获取一级分类  /admin/product/getCategory1  GET
export const reqCategory1List = () =>
  request({
    url: `/admin/product/getCategory1`,
    method: "get",
  });

// 获取二级分类  /admin/product/getCategory2/{category1Id}  GET
export const reqCategory2List = (category1Id) =>
  request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: "get",
  });

// 获取三级分类  /admin/product/getCategory1  GET
export const reqCategory3List = (category2Id) =>
  request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: "get",
  });

// 获取商品平台属性  GET
export const reqAttrList = (category1Id, category2Id, category3Id) =>
  request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });
