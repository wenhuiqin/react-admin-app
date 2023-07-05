import '@/polyfill'; // 去除touch事件谷歌提示
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import reportWebVitals from './reportWebVitals';
// 自定义主题
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'antd/dist/reset.css';
import {Provider} from 'react-redux'
import store from './store'
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);

reportWebVitals();

