import React from "react";
import "@/App.scss";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.jsx";
import { Content, Header, Footer } from "antd/es/layout/layout";
import { ConfigProvider, Layout, Menu } from "antd";

const items = [{ key: 1, label: "补码一位乘法" }];

function App() {
  return (
    <div id="App">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "rgba(0,0,0,0.75)",
            borderRadius: 5,
          },
        }}
      >
        <Layout className="layout">
          <Header className="header">
            <div className="logo" />
            <Menu
              className="menu"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              items={items}
            />
          </Header>
          <Content className="content-container">
            <div className="title">How Calculator</div>
            <div className="content">
              <RouterProvider router={router} />
            </div>
          </Content>
          <Footer className="footer">
            How Calculator © 2023-{new Date().getFullYear()}
            <br />
            Designed by ZZHow
          </Footer>
        </Layout>
      </ConfigProvider>
    </div>
  );
}

export default App;
