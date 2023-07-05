// 快捷键：Rect ts rtfc
import type { FC } from 'react';
// 创建登录的路由
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from './store/hook';
import Index from '@/layout/index'
import Login from '@/views/login/index'               
import './App.css'
import store2 from 'store2';

interface Props {}

const App: FC<Props> = () => {
  const adminname = useAppSelector(state=>state.admin.adminname)
  const redirect = store2.session.get('redirect')
  return (
    <Routes>
      <Route path='/login' element={adminname?<Navigate to={redirect?redirect:'/'} />:<Login />} />
      <Route path='/*' element={adminname?<Index />:<Navigate to='/login' />} />
    </Routes>
  );
}

export default App;

