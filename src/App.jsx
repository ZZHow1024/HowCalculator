import { useMemo, useState } from "react";
import { Radio, Button, Input, Table, message } from "antd";
import Column from "antd/es/table/Column";
import "@/App.scss";
import {
  initializationX,
  initializationY,
  supplementOneDigitMultiplication,
} from "@/utils/calculator.js";

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

function App() {
  const [data, setData] = useState(defaultData);

  const [num1, setNum1] = useState("");
  const [symbol1, setSymbol1] = useState("0");
  const [num2, setNum2] = useState("");
  const [symbol2, setSymbol2] = useState("0");

  const [bNum1, setBNum1] = useState([]);
  const [fbNum1, setFBNum1] = useState([]);
  const [bNum2, setBNum2] = useState([]);

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

    initialization();
  };

  const onNumChange = (type, e) => {
    if (
      e.target.value !== "" &&
      !containsOnlyAllowedChars(e.target.value, "01 ")
    ) {
      message.info("仅允许输入 0 / 1");
      return;
    }

    if (type === 0) setNum1(e.target.value);
    else setNum2(e.target.value);
  };

  const initialization = () => {
    const { bNum, fbNum } = initializationX(symbol1, num1);
    setBNum1(bNum);
    setFBNum1(fbNum);

    const bNum2 = initializationY(symbol2, num2);
    setBNum2(bNum2);

    const ddata = { ...defaultData[0] };
    ddata.partialProduct = bNum.length <= 2 ? "暂无数据" : "00.";
    for (let i = 0; i < bNum.length - 2; i++) ddata.partialProduct += "0";
    ddata.multiplier =
      bNum2.length <= 1 ? "暂无数据" : (bNum2[0] === 0 ? "0" : "1") + ".";
    for (let i = 1; i < bNum2.length; i++) ddata.multiplier += bNum2[i];

    setData([ddata]);
  };

  const onCalculate = () => {
    initialization();
  };

  return (
    <div>
      <div id="App">
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
            placeholder="请输入小数部分（二进制）"
            value={num1}
            onChange={(e) => onNumChange(0, e)}
            onBlur={initialization}
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
            placeholder="请输入小数部分（二进制）"
            value={num2}
            onChange={(e) => onNumChange(1, e)}
            onBlur={initialization}
          />
        </div>

        <div>[X]补 = {xb}</div>
        <div>[-X]补 = {fxb}</div>
        <div>[Y]补 = {yb}</div>

        <Button type="primary" onClick={onCalculate}>
          计算
        </Button>
      </div>

      <Table dataSource={data} pagination={false}>
        <Column title="步数" dataIndex="step" key="step" />
        <Column title="操作" dataIndex="operate" key="operate" />
        <Column
          title="部分积"
          dataIndex="partialProduct"
          key="partialProduct"
        />
        <Column title="乘数" dataIndex="multiplier" key="multiplier" />
        <Column title="Yn+1" dataIndex="yny" key="yny" />
      </Table>
    </div>
  );
}

export default App;
