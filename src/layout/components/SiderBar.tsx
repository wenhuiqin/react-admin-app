import { useState ,useEffect,type FC } from 'react';
// 引入logo
import Logo from "@/logo.svg"
import { Layout, Menu, type MenuProps} from 'antd';
import { useAppSelector } from '@/store/hook';
import menus, { MyMenuItem } from '@/router/menus';
import { useLocation,useNavigate } from 'react-router-dom';
import { getAdminDetail } from '@/api/admin';
import { getNewCheckedKeys, getNewMemus } from '@/utils/tools';

const {Sider} = Layout;

const rootSubmenuKeys:string[]=[]
menus.forEach(item=>{
  if(item.children){
    rootSubmenuKeys.push(item.key as string)
  }
})

interface Props {}

const SideBar: FC<Props> = () => {
  const collapsed = useAppSelector(state=>state.app.collapsed)
  const adminname = useAppSelector(state => state.admin.adminname)
  const [checkedKeys,setCheckedKeys] = useState<string[]>([])
  const [newMenus,setNewMenus] = useState<MyMenuItem[]>([])

  useEffect(()=>{
    getAdminDetail({adminname}).then(res=>{
      console.log(111,res.data.data[0].checkedKeys);
      setCheckedKeys(res.data.data[0].checkedKeys)
    })
  },[adminname])

  useEffect(()=>{
    const newCheckedKeys = getNewCheckedKeys(checkedKeys)

    const showMenus = getNewMemus(menus,newCheckedKeys)

    console.log(showMenus);

    setNewMenus(adminname === 'admin'?menus:showMenus)

  },[checkedKeys,adminname])

  const [openKeys,setOpenKeys]=useState(['']);
  const onOpenChange: MenuProps['onOpenChange'] = (keys:string[])=>{
    const latestOpenKey = keys.find((key)=>openKeys.indexOf(key)===-1);
    if(rootSubmenuKeys.indexOf(latestOpenKey!)===-1){
      setOpenKeys(keys)
    }else{
      setOpenKeys(latestOpenKey?[latestOpenKey]:[])
    }
  }
  const navigate = useNavigate()
  const changeUrl = ({key}:{key:string})=>{
    console.log(key);
    navigate(key)
  }
  const {pathname} =useLocation()
  const[selectedKeys,setSelectedKeys] = useState([pathname])

  useEffect(()=>{
    setOpenKeys(['/'+pathname.split('/')[1]])
    setSelectedKeys([pathname])
  },[pathname])
  return (
    <Sider 
      trigger={null} 
      collapsible 
      collapsed={collapsed}
      className='side-box'>
        <div className="demo-logo-vertical">
          <img src={Logo} alt="" />
          {collapsed?null:<span>嗨购管理平台</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          items={newMenus}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={changeUrl}
        />
      </Sider>
  );
}

export default SideBar;
