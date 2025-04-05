import React from "react";
import "@/App.scss";
import { Outlet, useLocation } from "react-router-dom";
import { Content, Header, Footer } from "antd/es/layout/layout";
import { ConfigProvider, Layout } from "antd";
import GlobalHeader from "@/components/GlobalHeader/GlobalHeader.jsx";

function App() {
  const location = useLocation();

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
            <GlobalHeader selectedKey={location.pathname} />
          </Header>
          <Content className="content-container">
            <div className="title">HowCalculator</div>
            <div className="content">
              <Outlet />
            </div>
          </Content>
          <Footer className="footer">
            HowCalculator © {new Date().getFullYear()}
            <br />
            Designed by ZZHow
          </Footer>
        </Layout>
      </ConfigProvider>
    </div>
  );
}

export default App;
