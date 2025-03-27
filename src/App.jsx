import React from "react";
import "@/App.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Content, Header, Footer } from "antd/es/layout/layout";
import { ConfigProvider, Layout, Menu } from "antd";

const items = [
  { key: "/", label: "首页" },
  { key: "/booth-multiplication-calculator", label: "补码一位乘法" },
  { key: "/number-base-conversion", label: "数制转换" },
];

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const switchRouter = (item) => {
    navigate(item.key);
  };
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
            <div className="logo" onClick={() => navigate("/")} />
            <Menu
              className="menu"
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={items}
              onClick={switchRouter}
            />
          </Header>
          <Content className="content-container">
            <div className="title">How Calculator</div>
            <div className="content">
              <Outlet />
            </div>
          </Content>
          <Footer className="footer">
            How Calculator © {new Date().getFullYear()}
            <br />
            Designed by ZZHow
          </Footer>
        </Layout>
      </ConfigProvider>
    </div>
  );
}

export default App;
