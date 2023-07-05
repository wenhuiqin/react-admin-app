import { useState, type FC, useEffect } from 'react';
import { Table, Button, Space, Popconfirm, Modal, DatePicker } from 'antd';
import { getUserList } from '@/api/user';
import moment from 'moment';

interface accountListProps {}

interface DataType {
  avatar:string,
  birthday:string,
  createTime:string,
  nickname:string,
  sex:number,
  tel:string,
  userid:string,
  username:string
}

const AccountList: FC<accountListProps> = () => {
  const [userList,setUserList]= useState<DataType[]>([])

  const getUserListData = ()=>{
    getUserList().then(res=>{
      setUserList(res.data.data)
      console.log(res.data.data);
    })
  }

  useEffect(()=>{
    getUserListData()
  },[])

  const [height] = useState(document.body.offsetHeight)

  const [isModalOpen,setIsModalOpen] = useState(false)
  const columns:any[]=[
    {
      title:'序号',
      dataIndex: 'index',
      fixed:'left',
      width:70,
      render:(text:any,record:any,index:number)=>{
        return <span>{index+1}</span>
      }
    },
    {
      title:'头像',
      dataIndex:'avatar',
      fixed:'left',
      width:300,
      render:(text:any,record:DataType,index:number)=>{
        return (
          <span>{text}</span>
        )
      }
    },
    {
      title:'昵称',
      width:100,
      fixed:'left',
      dataIndex:'nickname',
    },
    {
      title:'手机号',
      width:200,
      dataIndex:'tel',
      render(text:any,record:DataType,index:number){
        return (
          text?<span>{text}</span>:<span>未填</span>
        )

      }
    },
    {
      title:'注册时间',
      dataIndex:'createTime',
      width:200,
      render(text:any,record:DataType,index:number){
        return (
          text?<span>{moment(Number(text)).format('YYYY/MM/DD HH:mm')}</span>:<span>——</span>
        )
      }
    },
    {
      title:'操作',
      render(text:any,record:DataType,index:number){
        return (
          <Space>
            <Button type='primary' onClick={()=>{setIsModalOpen(true)}}>编辑</Button>
            <Modal title="编辑用户数据" open={isModalOpen} onOk={()=>{
              console.log('发送请求修改成功');
              setIsModalOpen(false)
              }} onCancel={()=>{
                console.log('取消修改');
                setIsModalOpen(false)
              }}>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
            <Popconfirm 
              title="删除"
              description='你确定要删除该条数据吗?'
              onConfirm={()=>{console.log('删除成功!');}}
              okText='确定'
              cancelText='取消'>
              <Button danger>删除</Button>
            </Popconfirm>
          </Space>
        )
      }
    }

  ]

  const [searchDate,setSearchDate]= useState<String[]>([])

  return (
    <Space direction="vertical">
      <Space>
        <DatePicker.RangePicker 
          status="error" 
          style={{ width: '100%' }} 
          allowClear 
          autoFocus
          format='YYYY/MM/DD HH:mm'
          onChange={(date,dateString)=>{
            console.log(date);
            setSearchDate(dateString)
          }}/>
        <Button type='primary'>筛选</Button>
      </Space>
      <Table columns={columns} 
      dataSource={userList} 
      scroll={{ y: height-350,x:1300 }} 
      rowKey='userid' 
      style={{width:'100%',height:'100%'}}
      pagination={{
        hideOnSinglePage:true,
        showSizeChanger:true,
        total:userList.length,showTitle:true,
        showTotal:(total)=>`共有${total}条数据`,
        pageSizeOptions:[2,4,6,8,10],
        showQuickJumper:true
        }}/>
    </Space>
  );
}

export default AccountList;

