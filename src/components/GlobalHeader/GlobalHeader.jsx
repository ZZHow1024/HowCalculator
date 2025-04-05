import "./GlobalHeader.scss";
import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const items = [
  { key: "/", label: "首页" },
  { key: "/sign-magnitude-multiplication-calculator", label: "原码一位乘法" },
  { key: "/booth-multiplication-calculator", label: "补码一位乘法" },
  { key: "/number-base-conversion", label: "数制转换" },
];

export default function GlobalHeader(props) {
  const navigate = useNavigate();

  const switchRouter = (item) => {
    navigate(item.key);
  };

  return (
    <div id="GlobalHeader">
      <div className="logo" onClick={() => navigate("/")} />
      <Menu
        className="menu"
        mode="horizontal"
        selectedKeys={[props.selectedKey]}
        items={items}
        onClick={switchRouter}
      />
    </div>
  );
}
