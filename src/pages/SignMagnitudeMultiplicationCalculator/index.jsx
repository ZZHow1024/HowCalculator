import "./index.scss";
import { Breadcrumb, Button, Input, message, Radio, Table } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useMemo, useState } from "react";
import Column from "antd/es/table/Column.js";
import { originalCodeOneDigitMultiplication } from "@/utils/multiplicationCalculator.js";

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

  const [yNum1, setYNum1] = useState([]); // |X| 的原码
  const [yNum2, setYNum2] = useState([]); // |Y| 的原码

  const [result, setResult] = useState("");

  // |X|
  const xy = useMemo(() => {
    if (yNum1.length <= 2) return "暂无数据";

    let str = (yNum1[0] ? "11" : "00") + ".";
    for (let i = 2; i < yNum1.length; i++) str += yNum1[i];

    return str;
  }, [yNum1]);

  // |Y|
  const yy = useMemo(() => {
    if (yNum2.length <= 1) return "暂无数据";

    let str = ".";
    for (let i = 1; i < yNum2.length; i++) str += yNum2[i];

    return str;
  }, [yNum2]);

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
    setYNum1([]);
    setYNum2([]);
    setData(defaultData);
    setResult("");
  };

  const initialization = () => {
    const yNum1 = [];
    yNum1.push(0);
    yNum1.push(0);
    for (let i = 0; i < num1.length; i++) yNum1.push(parseInt(num1[i]));
    setYNum1(yNum1);

    const yNum2 = [];
    yNum2.push(0);
    for (let i = 0; i < num2.length; i++) yNum2.push(parseInt(num2[i]));
    setYNum2(yNum2);

    const ddata = { ...defaultData[0] };
    ddata.partialProduct = yNum1.length <= 2 ? "暂无数据" : "\u00A0\u00A000.";
    for (let i = 0; i < yNum1.length - 2; i++) ddata.partialProduct += "0";

    ddata.multiplier = yNum2.length <= 1 ? "暂无数据" : ".";
    for (let i = 1; i < yNum2.length; i++) ddata.multiplier += yNum2[i];

    return {
      ddata,
      yNum1,
      yNum2,
    };
  };

  const onClear = () => {
    setNum1("");
    setNum2("");
    clear();
  };

  const onCalculate = () => {
    const initRes = initialization();

    const { res, num1, extendNum } = originalCodeOneDigitMultiplication(
      initRes.yNum1,
      initRes.yNum2,
    );

    setData([initRes.ddata, ...res]);

    let str = "";
    str += (symbol1 === symbol2 ? 0 : 1) + ".";
    for (let i = 0; i < num1.length; i++) str += num1[i];
    for (let i = 0; i < extendNum.length; i++) str += extendNum[i];
    setResult(str);
  };

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
        <div className="output-content">|X|原 = {xy}</div>
        <div className="output-content">|Y|原 = {yy}</div>
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
            title="部分积A"
            dataIndex="partialProduct"
            key="partialProduct"
            align="left"
            render={(item) => (
              <div style={{ "white-space": "pre-line" }}>{item}</div>
            )}
          />
          <Column
            title="乘数|Y|"
            dataIndex="multiplier"
            key="multiplier"
            align="left"
            render={(item) => (
              <div style={{ "white-space": "pre-line" }}>{item}</div>
            )}
          />
        </Table>
      </div>

      <h3>再加上符号位，∴ [XY]原 = {result ? result : "暂无数据"}</h3>
      <h3>
        XY＝
        {result
          ? (result[0] === "0" ? "+" : "-") +
            "0." +
            result.substring(2, result.length)
          : "暂无数据"}
      </h3>
    </div>
  );
}
