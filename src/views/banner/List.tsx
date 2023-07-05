import { deleteBannerList, getBannerList } from '@/api/banner';
import { Button, Image, Popconfirm, Space, Table } from 'antd';
import { useState, FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

interface BannerListProps {}
interface DataType {
  bannerid: string
  img: string
  link: string
  alt: string
}
const BannerList: FC<BannerListProps> = () => {
  const navigate = useNavigate()
  const [bannerList, setBannerList] = useState<DataType[]>([])
  useEffect(() => {
    getBannerList().then(res => {
      console.log(res.data.data)
      setBannerList(res.data.data)
    })
  }, [])
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [height] = useState(document.body.offsetHeight) // 计算body的高度
  const columns: ColumnsType<DataType>= [
    {
      title: '序号',
      render (text: any, record: DataType, index: number) {
        return <span>{ (current - 1) * pageSize + index + 1 }</span>
      }
    },
    {
      title: '图片',
      dataIndex: 'img',
      render (text: string) {
        return <Image src={text} style={ { height: 60 }}/>
      }
    },
    {
      title: '提示',
      dataIndex: 'alt'
    },
    {
      title: '链接',
      width: 200,
      dataIndex: 'link',
      ellipsis: true
    },
    {
      title: '操作',
      render: (text: any, record: DataType) => {
        return (
          <Space>
            <Popconfirm
              title="删除"
              description="确定删除吗?"
              onConfirm={ () => {
                deleteBannerList({ bannerid: record.bannerid }).then(() => {
                  getBannerList().then(res => {
                    console.log(res.data.data)
                    setBannerList(res.data.data)
                  })
                })
              }}
              onCancel={() => {}}
              okText="确定"
              cancelText="取消">
              <Button danger>删除</Button>
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  return (
    <Space direction='vertical' style={{ width: '100%'}}>
      <Button type='primary' onClick={ () => navigate('/banner/add') }>添加轮播图</Button>
      <Table 
        dataSource={ bannerList }
        columns={ columns }
        rowKey="bannerid"
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
      />
    </Space>
  );
}

export default BannerList;

