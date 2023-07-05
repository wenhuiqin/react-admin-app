import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Home from '@/views/home/Index';
import BannerList from '@/views/banner/List';
import BannerAdd from '@/views/banner/Add';

import ProList from '@/views/pro/List';
import ProSearch from '@/views/pro/Search';

import AccountList from '@/views/acount/List';
import AccountAdmin from '@/views/acount/Admin';
import Set from '@/views/set/Index';
import Echarts from '@/views/data/Echarts';
import HighCharts from '@/views/data/HighCharts';
import Braft from '@/views/edit/Braft';
import Md from '@/views/edit/MD';
import ImportExcel from '@/views/excel/Import';
import ExportExcel from '@/views/excel/Export';

import BaiduMap from '@/views/map/Baidu';
import GaodeMap from '@/views/map/Gaode';


type MenuItem = Required<MenuProps>['items'][number]
export type MyMenuItem = MenuItem & {
  path:string,
  label:string,
  redirect?:string,
  children?:MyMenuItem[],
  element?:React.ReactNode,
  hidden?:boolean
}

const menus: MyMenuItem[] = [
  {
    path:"/",
    key: '/',
    label: '系统首页',
    icon: <MailOutlined />,
    element:<Home />
  },
  {
    path:"/banner",
    key: '/banner',
    label: '轮播图管理',
    icon: <SettingOutlined />,
    redirect:'/banner/list',
    children:[
      {
        path:'/banner/list',
        key:'/banner/list',
        label:'轮播图列表',
        icon:<MailOutlined />,
        element:<BannerList />
      },
      {
        path:'/banner/add',
        key:'/banner/add',
        label:'添加轮播图',
        icon:<MailOutlined />,
        element:<BannerAdd />,
        hidden:true
      }
    ]
  },
  {
    path:"/pro",
    label: '商品管理',
    key: '/pro',
    redirect:'/pro/list',
    icon: <AppstoreOutlined />,
    children:[
      {
        path:'/pro/list',
        key:'/pro/list',
        label:'商品列表',
        icon: <MailOutlined />,
        element:<ProList />
      },
      {
        path:'/pro/search',
        key:'/pro/search',
        label:'筛选列表',
        icon: <MailOutlined />,
        element:<ProSearch />
      }
    ]
  },
  {
    path:'/account',
    key:'/account',
    label:'账户管理',
    redirect:'/account/users',
    icon: <MailOutlined />,
    children:[
      {
        path:'/account/users',
        key:'/account/users',
        label:'用户列表',
        icon: <MailOutlined />,
        element:<AccountList />
      },
      {
        path:'/account/admin',
        key:'/account/admin',
        label:'管理员列表',
        icon: <MailOutlined />,
        element:<AccountAdmin />
      }
    ]
  },
  {
    path:'/set',
    key:'/set',
    label:'设置',
    icon:<MailOutlined />,
    element:<Set />,
    hidden:true
  },
  {
    path:'/data',
    key:'/data',
    label:'数据可视化',
    redirect:'/data/echarts',
    icon:<MailOutlined />,
    children:[
      {
        path:'/data/echarts',
        key:'data/echarts',
        label:'Echarts',
        icon:<MailOutlined />,
        element:<Echarts />
      },
      {
        path:'/data/highcharts',
        key:'data/highcharts',
        label:'highcharts',
        icon:<MailOutlined />,
        element:<HighCharts />
      }
    ]
  },
  {
    path:'/edit',
    key:'/edit',
    label:'编辑器',
    redirect:'/edit/braft',
    icon:<MailOutlined />,
    children:[
      {
        path:'/edit/braft',
        key:'/edit/braft',
        label:'富文本编辑器',
        icon:<MailOutlined />,
        element:<Braft />
      },
      {
        path:'/edit/md',
        key:'/edit/md',
        label:'markdown编辑器',
        icon:<MailOutlined />,
        element:<Md />
      }
    ]
  },
  {
    path:'/excel',
    key:'/excel',
    label:'导入与导出',
    redirect:'/excel/import',
    icon:<MailOutlined />,
    children:[
      {
        path:'/excel/import',
        key:'/excel/import',
        label:'导入',
        icon:<MailOutlined />,
        element:<ImportExcel />
      },
      {
        path:'/excel/export',
        key:'/excel/export',
        label:'导出',
        icon:<MailOutlined />,
        element:<ExportExcel />
      }
    ]
  },
  {
    path:'/map',
    key:'/map',
    label:'地图',
    redirect:'/map/baidu',
    icon:<MailOutlined />,
    children:[
      {
        path:'/map/baidu',
        key:'/map/baidu',
        label:'百度地图',
        icon:<MailOutlined />,
        element:<BaiduMap />
      },
      {
        path:'/map/gaode',
        key:'/map/gaode',
        label:'高德地图',
        icon:<MailOutlined />,
        element:<GaodeMap />
      }
    ]
  }
];

export default menus;