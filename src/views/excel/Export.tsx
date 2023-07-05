import { getProList } from '@/api/pro';
import { Table, Image, Button, Popconfirm, Space, Switch  } from 'antd';
import { useState, FC, useEffect } from 'react';

import ExportJsonExcel from 'js-export-excel' 

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
  useEffect(() => {
    getProList().then(res => {
      console.log(res.data.data)
      setProList(res.data.data)
    })
  }, [])

  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [height] = useState(document.body.offsetHeight) // 计算body的高度
  return (
    <>
      <Button onClick={() => {
        let option: {
          fileName: string
          datas: {
            sheetData: DataType[],
            sheetName: string,
            sheetFilter: string[],
            sheetHeader: string[],
            columnWidths: number[]
          }[]
        };
        option = {
          fileName: "产品列表", // 导出的文件的名称
          datas: [
            {
              sheetData: proList, // 表格数据
              sheetName: "产品列表1", // excel表格中表格的名字
              sheetFilter: ["proname", "img1", "category"], // 需要导出的数据的字段
              sheetHeader: ["产品名称", "图片", "分类"], // 表头的值
              columnWidths: [20, 20],
            },
            {
              sheetData: proList, // 表格数据
              sheetName: "产品列表2", // excel表格中表格的名字
              sheetFilter: ["proname", "img1", "category", 'originprice', 'brand'], // 需要导出的数据的字段
              sheetHeader: ["产品名称", "图片", "分类", '价格', '品牌'], // 表头的值
              columnWidths: [20, 20],
            },
          ]
        }

        var toExcel = new ExportJsonExcel(option); //new
        toExcel.saveExcel(); //保存
      }}>导出数据</Button>
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
        <Table.Column title="产品价格" width={ 150 } dataIndex="originprice"></Table.Column>
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
    </>
  );
}

export default ProList;
