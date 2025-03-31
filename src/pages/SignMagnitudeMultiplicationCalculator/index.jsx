import "./index.scss";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigator = useNavigate();

  return (
    <div id="SignMagnitudeMultiplicationCalculator">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item
          className="breadcrumb-item"
          onClick={() => navigator("/")}
        >
          首页
        </Breadcrumb.Item>
        <Breadcrumb.Item className="breadcrumb-item">
          原码一位乘法计算器
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
