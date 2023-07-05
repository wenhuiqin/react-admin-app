
import { MyMenuItem } from "@/router/menus";

export function getNewCheckedKeys (checkedKeys: string[]) {
  const arr: string[] = []
  checkedKeys.forEach(item => {
    const newArr = item.split('/')
    newArr.forEach((_, index) => {
      arr.push(`${newArr.slice(0, index + 1).join('/')}`)
    });
  
  })
  return Array.from(new Set(arr))
}


export function getNewMemus (menus: MyMenuItem[], checkedKeys: string[]) {
    const arr: MyMenuItem[] = []
    menus.forEach(item => {
      if (item.children) {
        if (checkedKeys.includes(String(item.key))) {
          arr.push({ ...item })
          if (item.children) {
            arr[arr.length - 1].children = getNewMemus(item.children, checkedKeys)
          }
        } 
      } else {
        if (checkedKeys.includes(String(item.key))) {
          arr.push({ ...item })
        }
       
      }
    });
    return arr
}

export function isContainMenus(menus:MyMenuItem[],pathname:string){
  let flag = menus.some(item=>{
    if(item.children){
      if(item.key === pathname){
        return true
      }else{
        return item.children.some(it=>it!.key===pathname)
      }
    }else{
      return item.key === pathname
    }
  })
  return flag
}
