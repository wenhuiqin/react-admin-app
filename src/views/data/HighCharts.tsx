import { useState,useEffect,FC } from 'react';
import Highcharts from 'highcharts/highstock'
import { Button } from 'antd';

interface HighChartsProps {}

const HighCharts: FC<HighChartsProps> = () => {
  const [option,setOption] =useState<any>({
    chart:{
      type:'bar'
    },
    title:{
      text:'我的第一个图表'
    },
    xAxis:{
      categories:['苹果','香蕉','橙子']
    },
    yAxis:{
      title:{
        text:'吃水果个数'
      }
    },
    series:[{
      name:'小明',
      data:[1,0,4]
    },
    {
      name:'小红',
      data:[5,7,3]
    }]
  })
  useEffect(()=>{
    Highcharts.chart('main1',option)
  })

  const changeData = ()=>{
    setOption({
      chart:{
        type:'line'
      },
      title:{
        text:'月平均气温'
      },
      subtitle:{
        text:'底部'
      },
      xAxis:{
        categories:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
      },
      yAxis:{
        title:{
          text:'气温(°C)'
        }
      },
      plotOptions:{
        line:{
          dataLabels:{
            enabled:true
          },
          enableMouseTracking:false
        }
      },
      series:[{
        name:'东京',
        data:[
          7.0,6.9,9.5,14.5,18.4,21.5,25.2,26.5,23.3,18.3,13.9,9.6
        ]
      },{
        name:'伦敦',
        data:[
          3.9,4.2,5.7,8.5,11.9,15.2,17.0,16.6,14.2,10.3,6.6,4.8
        ]
      }]
    })
  }
  return (
    <div>
      <Button type='primary' onClick={changeData}>改变数据</Button>
      <div id='main1' style={{width:500,height:500}}></div>
    </div>
  );
}

export default HighCharts;
