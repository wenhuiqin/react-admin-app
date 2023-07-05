import { getCategoryList, getProList, getSearchList } from '@/api/pro';
import { Table, Image, Button, Popconfirm, Space, Switch, Select, Input  } from 'antd';
import { useState, FC, useEffect } from 'react';

interface ProListProps {}
interface DataType {
  banners: string[]
  brand: string
  category: string
  desc: string
  discount: number
  img1: string
  img2: string
  img3: string
  img4: string
  isrecommend: number
  issale: number
  isseckill: number
  originprice: number
  proid: string
  proname: string
  sales: number
  stock: number
}
const ProList: FC<ProListProps> = () => {
  const [proList, setProList] = useState<DataType[]>([])
  const [category, setCategory] = useState('')
  const [categoryList, setCategoryList] = useState<string[]>([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    getProList().then(res => {
      // console.log(res.data.data)
      setProList(res.data.data)
    })
    getCategoryList().then(res => {
      console.log(res.data.data)
      setCategoryList(res.data.data)
    })
  }, [])
  
  // eslint-disable-next-line
  const searchFn = () => {
    const data = {
      category, search
    }

    getSearchList(data).then(res => {
      setProList(res.data.data)
    })
  }
  useEffect(() => {
    searchFn()
  }, [category, search, searchFn])

  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [height] = useState(document.body.offsetHeight) // 计算body的高度
  return (
    <Space direction='vertical' style={{ width: '100%'}}>
      <Space>
        {/* 筛选条件 */}
        <Select style={{width: 120}} value={ category } onChange={ (value) => {
          setCategory(value)
        }}>
          <Select.Option value="">全部</Select.Option>
          {
            categoryList && categoryList.map(item => {
              return <Select.Option key = { item } value = { item }>{item}</Select.Option>
            })
          }
        </Select>
        <Input placeholder='搜索关键词' value={search} onChange={ event => {
          setSearch(event.target.value)
        }}></Input>
        <Button type='primary' onClick={ searchFn }>搜索</Button>
      </Space>
      <Table 
        dataSource={ proList } 
        rowKey="proid"
        scroll={{ y: height - 330 }}
        pagination={{
          current, 
          pageSize,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 50],
          showQuickJumper: true,
          showTotal: (total) => `共有 ${total} 条数据`,
          onChange: (page, pageSize) => {
            setCurrent(page)
            setPageSize(pageSize)
          }
        }}
      >
        <Table.Column title="序号" width={ 60 } fixed="left" render = { (text: any, record: DataType, index: number) => {
          return <span>{ (current - 1) * pageSize + index + 1 }</span>
        }}></Table.Column>
        <Table.Column title="图片" width={ 120 } fixed="left" dataIndex="img1" render = { (text: string) => {
          return <Image src={text} style={ { height: 60 }}/>
        }}></Table.Column>
        <Table.Column title="产品名称" width={ 300 } fixed="left" dataIndex="proname" ellipsis={true}></Table.Column>
        <Table.Column title="产品分类" width={ 120 } dataIndex="category" ellipsis={true}></Table.Column>
        <Table.Column title="产品品牌" width={ 120 } dataIndex="brand" ellipsis={true}></Table.Column>
        <Table.Column title="产品价格" sorter= {(a: DataType, b: DataType) => a.originprice - b.originprice} width={ 150 } dataIndex="originprice"></Table.Column>
        <Table.Column title="产品销量" width={ 200 } dataIndex="sales"></Table.Column>
        <Table.Column title="产品库存" width={ 100 } dataIndex="stock"></Table.Column>
        <Table.Column title="受否售卖" width={ 100 } fixed="right" dataIndex="issale" render={(text: number) => {
          return <Switch defaultChecked={ text === 1}  />
        }}></Table.Column>
        <Table.Column title="受否秒杀" width={ 100 } fixed="right" dataIndex="isseckill" render={(text: number) => {
          return <Switch defaultChecked={ text === 1}  />
        }}></Table.Column>
        <Table.Column title="受否推荐" width={ 100 } fixed="right" dataIndex="isrecommend" render={(text: number) => {
          return <Switch defaultChecked={ text === 1}  />
        }}></Table.Column>
        <Table.Column title="操作" width={ 60 } fixed="right" render = { (text: any, record: DataType) => {
        return (
          <Space>
            <Popconfirm
              title="删除"
              description="确定删除吗?"
              onConfirm={ () => {
                
              }}
              onCancel={() => {}}
              okText="确定"
              cancelText="取消"
            >
              <Button danger>删除</Button>
            </Popconfirm>
          </Space>
        )
      }}></Table.Column>
      </Table>
    </Space>
  );
}

export default ProList;
