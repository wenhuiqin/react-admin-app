import React,{ FC ,useEffect,useState} from 'react';
import { Layout,theme } from 'antd';
import menus,{MyMenuItem} from '@/router/menus';
import { Route,Navigate,Routes, useLocation } from 'react-router-dom';
import Page404 from '@/views/error/Page404';
import { getAdminDetail } from '@/api/admin';
import { useAppSelector } from '@/store/hook';
import { getNewCheckedKeys,getNewMemus,isContainMenus } from '@/utils/tools';
const { Content } = Layout;

interface Props {}

const ContentBar: FC<Props> = () => {
  const { token: { colorBgContainer } } = theme.useToken();
  const renderRoutes = (menus:MyMenuItem[])=>{
    return menus.map(item => {
      if(item.children){
        return(
          <React.Fragment key={item.key}>
            <Route path={item.path} element={<Navigate to={item.redirect!} />}/>
            {
              renderRoutes(item.children)
            }
          </React.Fragment>
        )
      }else {
        return <Route path={item.path} key={item.key} element={item.element} />
      }
    })
  }
  // 从本地存储中获取用户名,调用接口获取用户的权限数据
  const adminname = useAppSelector(state=>state.admin.adminname)
  const [checkedKeys,setCheckedKeys] = useState<string[]>([])
  const [newMenus,setNewMenus] = useState<MyMenuItem[]>([])

  console.log(newMenus);

  useEffect(()=>{
    getAdminDetail({adminname}).then(res=>{
      console.log(res.data.data);
      setCheckedKeys(res.data.data[0].checkedKeys)
    })
  },[adminname])

  useEffect(()=>{
    const newCheckedKeys = getNewCheckedKeys(checkedKeys)
    const showMenus =getNewMemus(menus,newCheckedKeys)
    console.log(showMenus);
    setNewMenus(adminname==='admin'?menus:showMenus)
  },[checkedKeys,adminname])

  const{pathname} = useLocation()

  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
      }}>
      <Routes>
        {
          renderRoutes(menus)
        }
        <Route path='*' element={
          isContainMenus(menus,pathname)?<>无权限</>:
          <Page404 />
        } />
      </Routes>
    </Content>
  );
}

export default ContentBar;
