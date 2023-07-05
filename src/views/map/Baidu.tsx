import { useEffect, type FC } from 'react';

interface BaiduMapProps {}

const BaiduMap: FC<BaiduMapProps> = () => {

  useEffect(() => {

    var map = new window.BMapGL.Map("container");
    map.centerAndZoom(new window.BMapGL.Point(116.404, 39.915), 11);

    var p1 = new window.BMapGL.Point(116.301934,39.977552);
    var p2 = new window.BMapGL.Point(116.508328,39.919141);

    var driving = new window.BMapGL.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
    driving.search(p1, p2);
  }, [])
  return (
    <div style={{ width: '100%', height: '100%'}}>
      百度地图
      {/* <div id="allmap" style={{ width: '100%', height: '100%'}}></div> */}
      <div id="container" style={{ width: '100%', height: '100%'}}></div>
      <div id='result'>根据起点和终点经纬度驾车导航路线</div>
    </div>
  );
}

export default BaiduMap;