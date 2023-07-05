import request from '@/utils/request'

// 获取轮播图
export function getBannerList () {
  return request({
    url:'/banner/list',
  })
}

// 删除轮播图
export function deleteBannerList (data:{bannerid:string}){
  return request({
    url:'/banner/delete',
    method:"GET",
    data
  })
}

// 添加轮播图
export function addBannerList (data:{
  img:string,
  alt:string,
  link:string
}){
  return request({
    url:'/banner/add',
    method:"POST",
    data
  })
}