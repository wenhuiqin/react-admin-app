import request from "@/utils/request";

// 获取用户总数
export function getTotal(){
  return request({
    url:'/statistic/user'
  })
}

// 获取产品总数
export function getShopTotal(){
  return request({
    url:'/statistic/product'
  })
}