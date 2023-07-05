import React from 'react';
import { loginFn } from '@/api/admin';
import { Button, Form, Input,message } from 'antd';
import { changeAdminname,changeToken } from '@/store/modules/admin';
import { useAppDispatch } from '@/store/hook';
import { useNavigate } from 'react-router-dom';
import store2 from 'store2';

const Com: React.FC = () => {
  const [form] = Form.useForm();
  const [messageApi,contextHolder] = message.useMessage()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const onFinish = (values: {adminname:string,password:string}) => {
    loginFn(values).then(res=>{
      if(res.data.code ==='10005'){
        messageApi.open({
          type: 'warning',
          content: '账户未注册',
        });
      }else if(res.data.code ==='10003'){
        messageApi.open({
          type: 'error',
          content: '密码错误'
        });
      }else{
        messageApi.open({
          type:'success',
          content:'登陆成功'
        })
        dispatch(changeAdminname(res.data.data.adminname))
        dispatch(changeToken(res.data.data.token))
        store2.set('token',res.data.data.token)
        store2.set('adminname',res.data.data.adminname)
        navigate('/')
      }
    })
  };

  return (
    <div className='login-form-box'>
      {contextHolder}
      <h1 className='login-form-title'>嗨购后台管理系统</h1>
      <Form
        className='login-form'
        form={form}
        name="control-hooks"
        onFinish={onFinish}>
        <Form.Item name="adminname" rules={[{ required: true,message:'请输入管理员账户!' }]}>
          <Input placeholder='管理员账户'/>
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true,message:'请输入管理员密码!' }]}>
          <Input placeholder='密码'/>
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Com;