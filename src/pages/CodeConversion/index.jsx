import "./index.scss";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Breadcrumb, Button, Form, Input, Radio, message } from "antd";
import {
  getCodesFromOriginal,
  getCodesFromOnesComplement,
  getCodesFromTwosComplement,
  getOriginalCode,
} from "@/utils/codeConversion.js";

export default function Index() {
  const navigator = useNavigate();

  // 统一存储符号位和数值部分
  const [symbol, setSymbol] = useState("0"); // "0"正 "1"负
  const [input, setInput] = useState(""); // 数值部分
  const [codes, setCodes] = useState({
    original: "",
    onesComplement: "",
    twosComplement: "",
  });

  // 数值部分输入变化时自动联动
  const onInputChange = (e) => {
    const val = e.target.value.replace("2", "0");
    if (val !== "" && /[^01]/.test(val)) {
      message.info("仅允许输入 0 / 1");
      return;
    }
    setInput(val);
    const originalCode = getOriginalCode(symbol, val);
    setCodes(getCodesFromOriginal(originalCode));
  };

  // 符号位变化时自动联动
  const onSymbolChange = (e) => {
    setSymbol(e.target.value.replace("2", "0"));
    const originalCode = getOriginalCode(e.target.value, input);
    setCodes(getCodesFromOriginal(originalCode));
  };

  // 原码变化时联动
  const onOriginalChange = (e) => {
    const val = e.target.value.replace("2", "0");
    if (val !== "" && /[^01]/.test(val)) {
      message.info("仅允许输入 0 / 1");
      return;
    }
    // 更新符号位和数值部分
    if (val.length > 0) {
      setSymbol(val.charAt(0));
      setInput(val.slice(1));
    }
    setCodes(getCodesFromOriginal(val));
  };

  // 反码变化时联动
  const onOnesComplementChange = (e) => {
    const val = e.target.value.replace("2", "0");
    if (val !== "" && /[^01]/.test(val)) {
      message.info("仅允许输入 0 / 1");
      return;
    }
    const result = getCodesFromOnesComplement(val);
    setCodes(result);
    // 更新符号位和数值部分
    if (val.length > 0) {
      setSymbol(val.charAt(0));
      setInput(result.original.slice(1));
    }
  };

  // 补码变化时联动
  const onTwosComplementChange = (e) => {
    const val = e.target.value.replace("2", "0");
    if (val !== "" && /[^01]/.test(val)) {
      message.info("仅允许输入 0 / 1");
      return;
    }
    const result = getCodesFromTwosComplement(val);
    setCodes(result);
    // 更新符号位和数值部分
    if (val.length > 0) {
      setSymbol(val.charAt(0));
      setInput(result.original.slice(1));
    }
  };

  // 清空所有输入
  const onClear = () => {
    setInput("");
    setCodes({
      original: "",
      onesComplement: "",
      twosComplement: "",
    });
  };

  return (
    <div id="CodeConversion">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item
          className="breadcrumb-item"
          onClick={() => navigator("/")}
        >
          首页
        </Breadcrumb.Item>
        <Breadcrumb.Item className="breadcrumb-item">码制转换</Breadcrumb.Item>
      </Breadcrumb>
      <div className="content-container">
        <div style={{ marginBottom: "3px" }}>
          提示：输入二进制数时，可以使用 2 代替 0 输入。
        </div>
        <div className="symbol-btn">
          <Radio.Group
            value={symbol}
            onChange={onSymbolChange}
            optionType="button"
            buttonStyle="solid"
          >
            <Radio.Button value="0">正</Radio.Button>
            <Radio.Button value="1">负</Radio.Button>
          </Radio.Group>
        </div>
        <Form
          className="form"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
          }}
          autoComplete="off"
        >
          <Form.Item label="数值部分">
            <Input.TextArea
              value={input}
              onChange={onInputChange}
              placeholder="请输入数值部分"
            />
          </Form.Item>

          <Form.Item label="原码">
            <Input.TextArea
              value={codes.original}
              onChange={onOriginalChange}
              placeholder="请输入原码"
            />
          </Form.Item>

          <Form.Item label="反码">
            <Input.TextArea
              value={codes.onesComplement}
              onChange={onOnesComplementChange}
              placeholder="请输入反码"
            />
          </Form.Item>

          <Form.Item label="补码">
            <Input.TextArea
              value={codes.twosComplement}
              onChange={onTwosComplementChange}
              placeholder="请输入补码"
            />
          </Form.Item>

          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button type="primary" onClick={onClear}>
              清空
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
