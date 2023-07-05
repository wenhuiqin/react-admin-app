import React from 'react';
import { Layout } from 'antd';
import {HeaderBar,ContentBar,AppTabs,SideBar} from '@/layout/components/index'
import './index.css'

const App: React.FC = () => {
  return (
    <Layout id='admin-app'>
      {/* 左侧菜单栏 */}
      <SideBar></SideBar>
      <Layout>
        {/* 头部区域 */}
        <HeaderBar></HeaderBar>
        {/* 快捷导航 */}
        <AppTabs></AppTabs>
        {/* 内容区域 */}
        <ContentBar></ContentBar>
      </Layout>
    </Layout>
  );
};

export default App;