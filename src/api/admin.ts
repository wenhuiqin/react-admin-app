import request from "@/utils/request";

// 定义接口
interface IAdminLoginParams {
  adminname: string,
  password: string
}

interface AddAdminData {
  adminname:string,
  password:string,
  role:number,
  checkedKeys:any[]
}

interface UpdataAdmin {
  adminname:string,
  role:number,
  checkedKeys:any[]
}

// 管理员登录
export function loginFn (params: IAdminLoginParams) {
  return request({
    url:'/admin/login',
    method: 'POST',
    data: params
  })
}

// 添加管理员
export function addAdmin(data:AddAdminData){
  return request({
    url:'/admin/add',
    method:'POST',
    data
  })
}

// 删除管理员
export function deleteAdmin(data:{adminid:string}){
 return request({
  url:'/admin/delete',
  method:"POST",
  data
 })
}

// 编辑管理员
export function updateAdmin(data:UpdataAdmin){
  return request({
    url:"/admin/update",
    method:"POST",
    data
  })
}

// 获取管理员的详细信息
export function getAdminDetail(data:{adminname:string}){
  return request({
    url:'/admin/detail',
    data
  })
}

// 获取管理员列表
export function getAdminList(){
  return request({
    url:'/admin/list'
  })
}

