import React from "react";
import "@/App.scss";
import {
  matchRoutes,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Content, Header, Footer } from "antd/es/layout/layout";
import { ConfigProvider, Layout, Menu } from "antd";

const items = [
  { key: "/", label: "补码一位乘法" },
  { key: "/number-base-conversion", label: "数制转换" },
];

const routes = [{ path: "/" }, { path: "/number-base-conversion" }];

function App() {
  const navigate = useNavigate();

  const switchRouter = (item) => {
    navigate(item.key);
  };

  const location = useLocation();
  const [{ route }] = matchRoutes(routes, location);

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
              defaultSelectedKeys={[route.path]}
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
