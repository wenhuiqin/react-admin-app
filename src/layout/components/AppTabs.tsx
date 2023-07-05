import menus, { MyMenuItem } from '@/router/menus';
import { Tag, TagProps } from 'antd';
import { useState, FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';

interface AppTabsProps {}

const MyTag: FC<TagProps> = (props) => {
  return (
    <Tag {...props} onClick={ props.onClick } style={{ borderRadius: 0,  height: 26, lineHeight: '26px', cursor: 'pointer' }}>{ props.children }</Tag >
  )
}
const tabArr: Array<{ key: string, label: string}> = [] 
const getTabArr = (menus: MyMenuItem[]) => { 
  menus.forEach(item => {
    if (item.children) {
      getTabArr(item.children)
    } else {
      tabArr.push({ key: item.key as string, label: item.label })
    }
  })
}
getTabArr(menus) 
const AppTabs: FC<AppTabsProps> = () => {

  const [arr, setArr] = useState<Array<{key: string, label: string}>>([{ key: '/', label: '系统首页' }])
  const [current, setCurrent] = useState(0)
  const [num, setNum] = useState(0)
  const { pathname } = useLocation()

  useEffect(() => {
    const index = arr.findIndex(item => item.key === pathname) 
    if (index !== -1) {
      setCurrent(index)
    } else {
      const item = tabArr.find(item => item.key === pathname)
      item && arr.push(item)
      setArr(arr)
      setCurrent(arr.length - 1)

    }
  }, [pathname, arr, num])

  const navigate = useNavigate()
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: 32, backgroundColor: '#fff', boxShadow: '0px 0px 5px #ccc', padding: '0 16px'}}>
      <Scrollbars style={{ width: '100%', height: 32, whiteSpace: 'nowrap' }}>
        {
          arr.map((item, index) => {
            return (
              <MyTag 
                closable = { index !== 0 } 
                key = { item.key }
                color = { current === index ? '#42b983': '#ccc'}
                onClick={ () => {
                  navigate(item.key)
                } }
                onClose={ (event) => {
                  event.preventDefault()
                  if (current === index) {
                    console.log(1)
                    if (current === arr.length - 1) {
                      console.log('最后')
                      navigate(arr[index - 1].key)
                      setCurrent(index - 1)
                    } else {
                      console.log('中间')
                      navigate(arr[arr.length  - 1].key)
                      setCurrent(arr.length  - 1)
                    }
                  } else {
                    console.log(2)
                    if (index < current) {
                      setCurrent(current  - 1)
                    } else {
                      console.log(6666)
                      setNum(Math.random())
                    }
                  }
                  const newArr = arr
                  newArr.splice(index, 1)
                  setArr(newArr)
                } }
              >{ item.label }</MyTag>
            )
          })
        }
      </Scrollbars>
    </div>
  );
}

export default AppTabs;