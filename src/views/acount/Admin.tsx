import { useState, type FC, useEffect } from 'react';
import { Button,Table,Drawer,Input,Form,Tree,Select,Popconfirm,Modal} from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import FormItem from 'antd/es/form/FormItem';
import menus,{MyMenuItem} from '@/router/menus';
import { addAdmin, deleteAdmin, getAdminList,getAdminDetail,updateAdmin } from '@/api/admin';
import store2 from 'store2'

interface AccountAdminProps{}

interface DataType {
  adminid:string,
  adminname:string,
  role:number,
  checkedKeys:string[]
}

// 获取树形控件的数据
function getTreeData(menus:MyMenuItem[]){
  const arr:DataNode[] = []
  menus.forEach(item=>{
    let obj:DataNode;
    if(item.children){
      const childrArr = getTreeData(item.children)
      obj = {
        key:item.key!,
        title:item.label,
        children:childrArr!
      }
    }else {
      obj = {
        key:item.key!,
        title:item.label
      }
    }
    arr.push(obj) 
  })
  return arr
}

const AccountAdmin: FC<AccountAdminProps> = () => {
  const columns:any[] = [
    {
        title: '序号',
        width: 100,
        dataIndex: 'index',
        render:(text:any,record:DataType,index:number)=>{
          return <span>{index+1}</span>
        }
    },
    {
      title:'管理员账户',
      dataIndex:'adminname',
    },
    {
      title:'角色',
      dataIndex:'role',
      render:(text:number)=>{
        return (<span>{text===2?'超级管理员':'管理员'}</span>)
      },
    },
    {
      title:'操作',
      render:(text:any,record:DataType)=>{
        return(
          <>
            <Button type="primary"
              onClick={()=>{
                getAdminDetail({adminname:record.adminname}).then(res=>{
                  setAdminname(res.data.data[0].adminname)
                  setRole(res.data.data[0].role)
                  setCheckedKeys(res.data.data[0].checkedKeys)
                 }
                )
                setIsModalOpen(true)
              }}>操作</Button>
            &emsp;
            <Popconfirm 
              title="删除"
              description='你确定要删除该条数据吗?'
              onConfirm={()=>{
                deleteAdmin({adminid:record.adminid}).then((res)=>{
                  getAdminListDataFn()
                })
              }}
              okText='确定'
              cancelText='取消'>
              <Button danger>删除</Button>
            </Popconfirm>
          </>
        )
      },
    },
  ]

  // 默认关闭添加管理员的抽屉
  const [open,setOpen] = useState(false)
  // 点击时展开抽屉
  const showDrawer = ()=>{
    setOpen(true)
  }
  // 点击时关闭抽屉
  const onClose =()=>{
    setOpen(false)
  }

  // 设计表单
  // 获取表单的值
  const [adminname,setAdminname] = useState('')
  const [password,setPassword] = useState('')
  const [role,setRole] = useState(1)
  const [adminList,setAdminList]=useState([])

  // 更改表单的值
  const changeAdminnameValue = ({target}:{target:HTMLInputElement})=>{
    setAdminname(target.value)
  }

  const changePasswordValue= ({target}:{target:HTMLInputElement})=>{
    setPassword(target.value)
  }

  const changeRoleValue = (value:number)=>{
    setRole(value)
  }

  // 获取树形控件的数据
  const [treeData,setTreeData] = useState<DataNode[]>([])

  // 初始化时,渲染树形控件
  useEffect(()=>{
    setTreeData(getTreeData(menus))
    getAdminListDataFn()
  },[])

  // 选中树形控件
  const [checkedKeys,setCheckedKeys] = useState<string[]>(['/','/set'])

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
    setCheckedKeys(checkedKeys as string[])
  };

  // 点击添加管理员按钮后发送请求,重新渲染数据
  const adminLoginFn = ()=>{
    const data = {
      adminname,password,role,checkedKeys
    }
    addAdmin(data).then(res=>{
      console.log(res);
      setAdminname('')
      setPassword('')
      setRole(1)
      setCheckedKeys(['/','/set'])
      onClose()
      getAdminListDataFn()
    })
  }

  const getAdminListDataFn =()=>{
    getAdminList().then(res=>{
      setAdminList(res.data.data)
    })
  }

  // 优化滚动,计算body的高度并减去上下两侧的值
  const [height] = useState(document.body.offsetHeight)

  // 修改对话框
  // 编辑框的数据

  const [isModalOpen,setIsModalOpen] = useState(false)

  // 分页器
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const onChange = (page: number, pageSize: number) => {
    setCurrent(page)
    setPageSize(pageSize)
  }

  // 是否显示批量删除按钮
  const adminStr = store2.get('adminname')

  const [selectedRowKeys,setSelectedRowKeys] = useState([])

  
  // 点击选中的值,并把选中的数组改造成{adminid:adminid}形式
  const selectAction = (newSelectedRowKeys:any)=>{
    console.log(newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys)
  }

  // 点击批量删除按钮后执行删除
  const deleteMany = ()=>{
    const deleteArr:any[] = []
    selectedRowKeys.forEach(item=>{
      deleteArr.push(deleteAdmin({adminid:item}))
      return deleteArr
    })
    Promise.all(deleteArr).then((res)=>{
      getAdminListDataFn()
    })
    
  }


  return (
    <div>
      {/* 添加管理员按钮 */}
      <Button 
        type='primary'
        style={{margin:'0px 0px 20px 0px'}}
        onClick={showDrawer}>
        添加管理员
      </Button>
      {/* 批量删除 */}
      &emsp;
      {
        adminStr === 'admin' && selectedRowKeys.length>0?
        <Popconfirm
          title="批量删除"
          description="您确定要批量删除管理员的数据吗?"
          onConfirm={deleteMany}
          okText="确定"
          cancelText="取消">
          <Button type='primary'>批量删除</Button>
        </Popconfirm>
        :null
      }
      {/* 添加管理员的对话框 */}
      <Drawer title="添加管理员" placement="right" onClose={onClose} open={open}>
        <Form>
          <FormItem rules={[{required:true,message:'请输入管理员账号'}]}>
            <Input placeholder='管理员账号' value={adminname} onChange={changeAdminnameValue} />
          </FormItem>
          <FormItem rules={[{required:true,message:'请输入密码'}]}>
            <Input placeholder='管理员密码' value={password} onChange={changePasswordValue} />
          </FormItem> 
          <FormItem>
            <Select
              value={role}
              style={{ width: '100%',marginBottom:20 }}
              defaultValue={role} 
              onChange={changeRoleValue}
              options={[
                { value: 1, label: '管理员' },
                { value: 2, label: '超级管理员' }
              ]}>
            </Select>
          </FormItem>
          {/* 树形控件 */}   
          <FormItem>
            <Tree
              checkable
              checkedKeys={checkedKeys}
              onCheck={onCheck}
              treeData={treeData}/>
          </FormItem>
          <Button 
            type='primary'
            style={{margin:'10px  auto',height:40}}
            onClick={adminLoginFn}>
            添加管理员
          </Button>
        </Form>
      </Drawer>
      {/* 表单渲染数据 */}
      <Table 
        columns={columns} 
        dataSource={adminList} 
        scroll={{ y: height-350,x:1300 }} 
        rowKey='adminid' 
        style={{width:'100%',height:'100%'}}
        rowSelection = {adminStr === 'admin'?{
          selectedRowKeys,
          onChange:selectAction,
          type:'checkbox'}
        :undefined}
        pagination={{
          hideOnSinglePage:true,
          showSizeChanger:true,
          pageSize,
          current,
          total:adminList.length,showTitle:true,
          showTotal:(total)=>`共有${total}条数据`,
          onChange,
          pageSizeOptions:[2,4,6,8,10],
          showQuickJumper:true
          }}/>
      {/* 修改管理员信息的对话框 */}
      <Modal title="修改管理员"
      // 控制对话框是否开启 
      open={isModalOpen}
      // 发送修改的请求 
      onOk={()=>{
        const data = {
          adminname,role,checkedKeys
        }
        updateAdmin(data).then(()=>{
          getAdminListDataFn()
          setIsModalOpen(false)
        })
      }} 
      // 取消修改请求
      onCancel={()=>{
        setIsModalOpen(false)
        setAdminname('')
        setRole(1)
        setCheckedKeys(['/','/set'])
      }
      }>
        <Form>
          <FormItem>
            <Input value={adminname} disabled />
          </FormItem>
          <FormItem>
            <Select
              value={role}
              style={{ width: '100%',marginBottom:20 }}
              defaultValue={role} 
              onChange={changeRoleValue}
              options={[
                { value: 1, label: '管理员' },
                { value: 2, label: '超级管理员' }
              ]}>
            </Select>
          </FormItem>
          {/* 树形控件 */}   
          <FormItem>
            <Tree
              checkable
              checkedKeys={checkedKeys}
              onCheck={onCheck}
              treeData={treeData}/>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default AccountAdmin;
