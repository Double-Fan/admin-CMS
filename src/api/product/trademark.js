// 品牌管理
// Swagger 接口地址：http://39.98.123.211:8216/swagger-ui.html#/base45trademark45controller
import request from "@/utils/request";

// 获取品牌列表  /admin/product/baseTrademark/{page}/{limit}
export const reqTrademarkList = (page, limit) =>
  request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: "get",
  });

// 处理添加品牌  /admin/product/baseTrademark/save
// 处理品牌修改  /admin/product/baseTrademark/update
export const reqAddOrUpdateTrademark = (trademark) => {
  if (trademark.id) {
    // 携带ID -- 修改
    return request({
      url: `/admin/product/baseTrademark/update`,
      method: "put",
      data: trademark,
    });
  } else {
    // 未携带ID -- 添加
    return request({
      url: `/admin/product/baseTrademark/save`,
      method: "post",
      data: trademark,
    });
  }
};

// 处理商品删除  /admin/product/baseTrademark/remove/{id}
export const reqDeleteTrademark = (id) =>
  request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: "delete",
  });
