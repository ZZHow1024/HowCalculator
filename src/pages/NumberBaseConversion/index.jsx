import "./index.scss";
import { Breadcrumb } from "antd";
import React from "react";

export default function Index() {
  return (
    <div id="NumberBaseConversion">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>数制转换</Breadcrumb.Item>
      </Breadcrumb>
      <div className="content-container"></div>
    </div>
  );
}
