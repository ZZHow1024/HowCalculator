import "./index.scss";
import { Breadcrumb, Button, Input, message, Radio, Table } from "antd";
import Column from "antd/es/table/Column";
import React, { useMemo, useState } from "react";
import {
  initializationX,
  initializationY,
  supplementOneDigitMultiplication,
} from "@/utils/multiplicationCalculator.js";
import { useNavigate } from "react-router-dom";

const option = [
  {
    label: "正",
    value: "0",
  },
  {
    label: "负",
    value: "1",
  },
];

const defaultData = [
  {
    step: "0",
    operate: "初始化",
    partialProduct: "暂无数据",
    multiplier: "暂无数据",
    yny: "0",
  },
];

const containsOnlyAllowedChars = (str, allowedChars) => {
  const regex = new RegExp(`^[${allowedChars}]+$`);
  return regex.test(str);
};

export default function Index() {
  const navigator = useNavigate();

  const [data, setData] = useState(defaultData);

  const [num1, setNum1] = useState("");
  const [symbol1, setSymbol1] = useState("0");
  const [num2, setNum2] = useState("");
  const [symbol2, setSymbol2] = useState("0");

  const [bNum1, setBNum1] = useState([]);
  const [fbNum1, setFBNum1] = useState([]);
  const [bNum2, setBNum2] = useState([]);

  const [result, setResult] = useState("");

  // [X]补
  const xb = useMemo(() => {
    if (bNum1.length <= 2) return "暂无数据";

    let str = (bNum1[0] ? "11" : "00") + ".";
    for (let i = 2; i < bNum1.length; i++) str += bNum1[i];

    return str;
  }, [bNum1]);

  // [-X]补
  const fxb = useMemo(() => {
    if (fbNum1.length <= 2) return "暂无数据";

    let str = (fbNum1[0] ? "11" : "00") + ".";
    for (let i = 2; i < fbNum1.length; i++) str += fbNum1[i];

    return str;
  }, [fbNum1]);

  // [X]补
  const yb = useMemo(() => {
    if (bNum2.length <= 1) return "暂无数据";

    let str = (bNum2[0] ? "1" : "0") + ".";
    for (let i = 1; i < bNum2.length; i++) str += bNum2[i];

    return str;
  }, [bNum2]);

  const onSymbolChange = (type, e) => {
    if (type === 0) setSymbol1(e.target.value);
    else setSymbol2(e.target.value);

    clear();
  };

  const onNumChange = (type, e) => {
    if (
      e.target.value !== "" &&
      !containsOnlyAllowedChars(e.target.value, "012 ")
    ) {
      message.info("仅允许输入 0 / 1");
      return;
    }

    if (type === 0) setNum1(e.target.value.replace("2", "0"));
    else setNum2(e.target.value.replace("2", "0"));
    clear();
  };

  const clear = () => {
    setBNum1([]);
    setFBNum1([]);
    setBNum2([]);
    setData(defaultData);
    setResult("");
  };

  const initialization = () => {
    const { bNum, fbNum } = initializationX(symbol1, num1);
    setBNum1(bNum);
    setFBNum1(fbNum);

    const bNum2 = initializationY(symbol2, num2);
    setBNum2(bNum2);

    const ddata = { ...defaultData[0] };
    ddata.partialProduct = bNum.length <= 2 ? "暂无数据" : "\u00A0\u00A000.";
    for (let i = 0; i < bNum.length - 2; i++) ddata.partialProduct += "0";

    ddata.multiplier =
      bNum2.length <= 1 ? "暂无数据" : (bNum2[0] === 0 ? "0" : "1") + ".";
    for (let i = 1; i < bNum2.length; i++) ddata.multiplier += bNum2[i];

    return {
      ddata,
      bNum1: bNum,
      fbNum1: fbNum,
      bNum2,
    };
  };

  const onClear = () => {
    setNum1("");
    setNum2("");
    clear();
  };

  const onCalculate = () => {
    const initRes = initialization();

    const { res, symbol1, num1, extendNum } = supplementOneDigitMultiplication(
      initRes.bNum1,
      initRes.fbNum1,
      initRes.bNum2,
    );

    setData([initRes.ddata, ...res]);

    let str = "";
    str += symbol1[0] + ".";
    for (let i = 0; i < num1.length; i++) str += num1[i];
    for (let i = 0; i < extendNum.length; i++) str += extendNum[i];
    setResult(str);
  };

  return (
    <div id="BoothMultiplicationCalculator">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item
          className="breadcrumb-item"
          onClick={() => navigator("/")}
        >
          首页
        </Breadcrumb.Item>
        <Breadcrumb.Item className="breadcrumb-item">
          补码一位乘法计算器
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="content-container">
        <div style={{ marginBottom: "3px" }}>
          提示：输入二进制数时，可以使用 2 代替 0 输入。
        </div>
        <div className="input-group">
          <Radio.Group
            className="radio"
            value={symbol1}
            onChange={(e) => onSymbolChange(0, e)}
            block
            options={option}
            defaultValue="0"
            optionType="button"
            buttonStyle="solid"
          />
          <div className="symbol">{symbol1 + "."}</div>
          <Input
            className="input"
            placeholder="请输入数值部分"
            value={num1}
            onChange={(e) => onNumChange(0, e)}
          />
        </div>
        <div className="input-group">
          <Radio.Group
            className="radio"
            value={symbol2}
            onChange={(e) => onSymbolChange(1, e)}
            block
            options={option}
            defaultValue="0"
            optionType="button"
            buttonStyle="solid"
          />
          <div className="symbol">{symbol2 + "."}</div>
          <Input
            className="input"
            placeholder="请输入数值部分"
            value={num2}
            onChange={(e) => onNumChange(1, e)}
          />
        </div>
        <div className="output-content">[X]补 = {xb}</div>
        <div className="output-content">[-X]补 = {fxb}</div>
        <div className="output-content">[Y]补 = {yb}</div>
        <Button
          type="primary"
          onClick={onClear}
          style={{ marginTop: "10px", marginRight: "5px" }}
        >
          清空
        </Button>
        <Button
          type="primary"
          onClick={onCalculate}
          style={{ marginLeft: "5px" }}
        >
          计算
        </Button>
      </div>

      <div className="table">
        <Table
          dataSource={data}
          pagination={false}
          scroll={{ x: "max-content" }}
        >
          <Column title="步数" dataIndex="step" key="step" align="left" />
          <Column
            title="操作"
            dataIndex="operate"
            key="operate"
            align="left"
            render={(item) => (
              <div style={{ "white-space": "pre-line" }}>{item}</div>
            )}
          />
          <Column
            title="部分积"
            dataIndex="partialProduct"
            key="partialProduct"
            align="left"
            render={(item) => (
              <div style={{ "white-space": "pre-line" }}>{item}</div>
            )}
          />
          <Column
            title="乘数"
            dataIndex="multiplier"
            key="multiplier"
            align="left"
            render={(item) => (
              <div style={{ "white-space": "pre-line" }}>{item}</div>
            )}
          />
          <Column
            title="Yn+1"
            dataIndex="yny"
            key="yny"
            align="left"
            render={(item) => (
              <div style={{ "white-space": "pre-line" }}>{item}</div>
            )}
          />
        </Table>
      </div>

      <h3>[XY]补 = {result ? result : "暂无数据"}</h3>
    </div>
  );
}
