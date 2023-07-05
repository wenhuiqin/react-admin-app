import { useState, type FC } from 'react';
import { Button, Table, Image, Switch, Popconfirm, Space} from 'antd'
import * as XLSX from 'xlsx';

interface ImportExcelProps {}
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
const ImportExcel: FC<ImportExcelProps> = () => {
  const [proList, setProList] = useState([])

  const importExcel = () => { 
    const file = (document.getElementById('fileRef') as HTMLInputElement).files![0]
    const reader = new FileReader()
    reader.readAsBinaryString(file!) 
    reader.onload = function () {
      const workbook = XLSX.read(this.result, { type: 'binary' });
      const t = workbook.Sheets['list'] 
      const r: any = XLSX.utils.sheet_to_json(t) 
      setProList(r)
    }
  }

  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [height] = useState(document.body.offsetHeight) 
  return (
    <div>
      <input type="file" hidden id='fileRef' onChange={ importExcel }/>
      <Button onClick={ () => {
        (document.getElementById('fileRef') as HTMLInputElement).click()
      } }>导入数据</Button>
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
              onConfirm={ () => {}}
              onCancel={() => {}}
              okText="确定"
              cancelText="取消">
              <Button danger>删除</Button>
            </Popconfirm>
          </Space>
        )
      }}></Table.Column>
      </Table>
    </div>
  );
}

export default ImportExcel;
