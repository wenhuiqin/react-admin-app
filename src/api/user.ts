// 导入封装请求的工具包
import request from "@/utils/request";

// 获取用户的列表
export function getUserList(){
  return request({
    url:'/user/list'
  })
}

