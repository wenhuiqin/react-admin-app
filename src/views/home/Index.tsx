import { LineOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import {useEffect, useState, FC} from 'react';
import { getTotal, getShopTotal } from '@/api/home'
import CountUp from 'react-countup';
interface HomeProps { }
const formatter: any = (value: number) => <CountUp end={value} separator="," />;
const Home: FC<HomeProps> = () => {
  const [userNum, setUserNum] = useState(0)
  const [shopNum, setShopNum] = useState(0)
  useEffect(() => {
    getTotal().then(res => {
      setUserNum(res.data.data)
    })
    getShopTotal().then(res => {
      setShopNum(res.data.data)
    })
  }, [])
  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="用户总数"
              value={userNum}
              formatter={ formatter }
              valueStyle={{ color: '#3f8600' }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="商品总数"
              value={shopNum}
              formatter={formatter}
              valueStyle={{ color: '#cf1322' }}
              prefix={<LineOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Home;
