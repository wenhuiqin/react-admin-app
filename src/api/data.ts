import request from "@/utils/request";

// 数据可视化数据
export function getData (){
  return request({
    url:'/data/simpleData'
  })
}