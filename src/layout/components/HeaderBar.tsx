import type { FC } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined
} from '@ant-design/icons';
import { Layout, Button,theme, Breadcrumb,Dropdown,Space,MenuProps  } from 'antd';
import { useAppDispatch,useAppSelector } from '@/store/hook';
import { changeCollapsed } from '@/store/modules/app';
import menus, { MyMenuItem } from '@/router/menus';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import store2 from 'store2';
import { changeAdminname, changeToken } from '@/store/modules/admin';

const { Header } = Layout;

interface Props {}

let breadcrumbNameMap:Record<string,string> = {}

function getBreadcrumbNameMap(menus:MyMenuItem[]){
  menus.forEach(item=>{
    if(item.children){
      breadcrumbNameMap[item.key!]=item.label
      getBreadcrumbNameMap(item.children)
    }else{
      breadcrumbNameMap[item.key!]=item.label
    }
  })
}

getBreadcrumbNameMap(menus)

const HeaderBar: FC<Props> = () => {
  const navigate = useNavigate()
  const collapsed = useAppSelector(state=>state.app.collapsed)
  const dispatch = useAppDispatch()
  const { token: { colorBgContainer } } = theme.useToken();
  const location =useLocation();

  const pathSnippets = location.pathname.split('/').filter((i)=>i)
  console.log(pathSnippets);

  const extraBreadcrumbItems = pathSnippets.map((item,index)=>{
    const url = `/${pathSnippets.slice(0,index+1).join('/')}`
    console.log(index,url);
    return {
      key:url,
      title:<Link to={url}>{breadcrumbNameMap[url]}</Link>
    }
  })

  const breadcrumbItems = [
    {
      title:<Link to={'/'}>系统首页</Link>,
      key:'',
    }
  ].concat(extraBreadcrumbItems)

  const items:MenuProps['items'] = [
    {
      label:'个人中心',
      key:'user'
    },
    {
      type:'divider'
    },
    {
      label:'设置',
      key:'set'
    },
    {
      type:'divider'
    },
    {
      label:'退出',
      key:'logout'
    }
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    console.log(key);
    switch (key) {
      case 'user':
        break;
      case 'set':
        navigate('/set')
        break;
      case 'logout':
        dispatch(changeAdminname(''))
        dispatch(changeToken(''))
        store2.remove('adminname')
        store2.remove('token')
        store2.session('redirect',location.pathname)
        navigate('/login')   
        break 
      default:
        break;
    }
  };

  return (
    <Header style={{ padding: '0px 20px 0px 0px', background: colorBgContainer,display:'flex',alignItems:'center',justifyContent:'space-between' }}>
      {/* 按钮 */}
      <div style={{display:'flex',alignItems:'center'}}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={()=>{dispatch(changeCollapsed(!collapsed))}}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}/>
        {/* 面包屑 */}
        <Breadcrumb items={breadcrumbItems} />
      </div>
      {/* 头像&个人中心 */}
      <Dropdown menu={{ items,onClick }} trigger={['click']}>
        <span onClick={(e) => e.preventDefault()}>
          <Space>
            <img
              style={{width:40,height:40,borderRadius:10}}
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" alt=""
             />
            <DownOutlined />
          </Space>
        </span>
      </Dropdown>
    </Header>
  );
}

export default HeaderBar;
