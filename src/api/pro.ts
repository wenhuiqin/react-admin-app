import request from '@/utils/request'

// 获取产品列表
export function getProList () {
  return request({
    url: '/pro/list'
  })
}

// 获取搜索列表
export function getSearchList (params?: { category?: string, search?: string}) {
  return request({
    url: '/pro/searchPro',
    method: 'POST',
    data: params
  })
}

// 获取分类列表
export function getCategoryList () {
  return request({
    url: '/pro/getCategory'
  })
}