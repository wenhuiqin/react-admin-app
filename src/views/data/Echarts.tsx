import { getData } from "@/api/data";
import { useEffect, type FC, useState } from "react";
import { Space,Row,Col } from "antd";
import * as echarts from 'echarts'

interface EchartsProps {}

const Echarts: FC<EchartsProps> = ()=>{
  const [height] =useState(document.body.offsetHeight)
  const [data1,setData1] = useState<any>()

  const [option1] = useState<any>({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    tooltip: {},
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  })

  useEffect(()=>{
    setData1(echarts.init(document.getElementById('main1') as HTMLElement))
  },[])

  useEffect(()=>{
    data1 && data1.setOption(option1)
  },[data1,option1])

  const [data2,setData2] = useState<any>()
  const [option2] = useState<any>({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  })

  useEffect(() => {
    setData2(echarts.init(document.getElementById('main2') as HTMLElement))
  }, [])
  useEffect(() => {
    data2 && data2.setOption(option2)
  }, [data2, option2])

  const [data3, setData3] = useState<any>()
  const [option3] = useState<any>({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center',
      selectedMode: false
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '70%'],
        startAngle: 180,
        label: {
          show: true,
          formatter(param: { name: string; percent: number; }) {
            return param.name + ' (' + param.percent * 2 + '%)';
          }
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
          {
            value: 1048 + 735 + 580 + 484 + 300,
            itemStyle: {
              color: 'none',
              decal: {
                symbol: 'none'
              }
            },
            label: {
              show: false
            }
          }
        ]
      }
    ]
  })
  useEffect(() => {
    setData3(echarts.init(document.getElementById('main3') as HTMLElement))
  }, [])
  useEffect(() => {
    data3 && data3.setOption(option3)
  }, [data3, option3])

  const [data4, setData4] = useState<any>()
  const [option4, setOption4] = useState<any>({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  })
  useEffect(() => {
    setData4(echarts.init(document.getElementById('main4') as HTMLElement))
  }, [])
  useEffect(() => {
    data4 && data4.setOption(option4)
  }, [data4, option4])

  useEffect(() => {
    getData().then(res => {
      const arr = res.data.data
      console.log(arr)
      const xArr: string[] = []
      const yData: number[] = []
      arr.forEach((item: any) => {
        xArr.push(item.x)
        yData.push(item.val)
      })
      setOption4({
        xAxis: {
          type: 'category',
          data: xArr
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: yData,
            type: 'line'
          }
        ]
      })
    })
  }, [])

  useEffect(() => {
    window.onresize = function () {
      data1.resize()
      data2.resize()
      data3.resize()
      data4.resize()
    }
  }, [data1, data2, data3, data4])

  return (
    <Space direction="vertical" style={{width:'100%',height:'100%',display:'felx',flexDirection:'column'}}>
      <div style={{flex:1}}>
        <Row gutter={24}>
          <Col span={11} style={{height:(height-195)/2}}>
            <div id="main1" style={{width:'100%',height:'100%'}}></div>
          </Col>
          <Col offset={2} span={11} style={{height:(height-195)/2}}>
            <div id="main2" style={{width:'100%',height:'100%'}}></div>
          </Col>
        </Row>
      </div>
      <div style={{flex:1}}>
        <Row gutter={24}>
          <Col span={11} style={{height:(height-195)/2}}>
            <div id="main3" style={{width:'100%',height:'100%'}}></div>
          </Col>
          <Col offset={2} span={11} style={{height:(height-195)/2}}>
            <div id="main4" style={{width:'100%',height:'100%'}}></div>
          </Col>
        </Row>
      </div>
    </Space>
  )
}

export default Echarts