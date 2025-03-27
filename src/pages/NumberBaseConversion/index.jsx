import "./index.scss";
import { Breadcrumb, Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import {
  binaryToDecimal,
  decimalToBinary,
  decimalToHexadecimal,
  decimalToOctal,
  hexadecimalToDecimal,
  octalToDecimal,
} from "@/utils/numberBaseConversion.js";

const containsOnlyAllowedChars = (str, allowedChars) => {
  const regex = new RegExp(`^[${allowedChars}]+$`);
  return regex.test(str);
};

export default function Index() {
  const [binary, setBinary] = useState(""); // 二进制
  const [octal, setOctal] = useState(""); // 八进制
  const [decimal, setDecimal] = useState(""); // 十进制
  const [hexadecimal, setHexadecimal] = useState(""); // 十六进制

  const onBinaryChange = (e) => {
    if (
      e.target.value !== "" &&
      !containsOnlyAllowedChars(e.target.value, "012 ")
    ) {
      message.info("仅允许输入 0 / 1");
      return;
    }

    const bBinary = e.target.value.replace("2", "0");
    if (bBinary === "") {
      onClear();
      return;
    }

    setBinary(bBinary);

    const dDecimal = binaryToDecimal(bBinary);
    setDecimal(dDecimal);
    setOctal(decimalToOctal(dDecimal));
    setHexadecimal(decimalToHexadecimal(dDecimal));
  };

  const onOctalChange = (e) => {
    if (
      e.target.value !== "" &&
      !containsOnlyAllowedChars(e.target.value, "01234567 ")
    ) {
      message.info("仅允许输入 0~7");
      return;
    }

    const oOctal = e.target.value;
    if (oOctal === "") {
      onClear();
      return;
    }

    setOctal(oOctal);

    const dDecimal = octalToDecimal(oOctal);
    setDecimal(dDecimal);
    setBinary(decimalToBinary(dDecimal));
    setHexadecimal(decimalToHexadecimal(dDecimal));
  };

  const onDecimalChange = (e) => {
    if (
      e.target.value !== "" &&
      !containsOnlyAllowedChars(e.target.value, "0123456789 ")
    ) {
      message.info("仅允许输入 0~9");
      return;
    }

    const dDecimal = e.target.value;
    if (dDecimal === "") {
      onClear();
      return;
    }

    setDecimal(dDecimal);

    setBinary(decimalToBinary(dDecimal));
    setOctal(decimalToOctal(dDecimal));
    setHexadecimal(decimalToHexadecimal(dDecimal));
  };

  const onHexadecimalChange = (e) => {
    if (
      e.target.value !== "" &&
      !containsOnlyAllowedChars(e.target.value, "0123456789abcdefABCDEF ")
    ) {
      message.info("仅允许输入 0~9 和 A-F");
      return;
    }

    const hHexadecimal = e.target.value.toUpperCase();
    if (hHexadecimal === "") {
      onClear();
      return;
    }

    setHexadecimal(hHexadecimal);

    const dDecimal = hexadecimalToDecimal(hHexadecimal);
    setDecimal(dDecimal);
    setBinary(decimalToBinary(dDecimal));
    setOctal(decimalToOctal(dDecimal));
  };

  const onClear = () => {
    setBinary("");
    setOctal("");
    setDecimal("");
    setHexadecimal("");
  };

  return (
    <div id="NumberBaseConversion">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>数制转换</Breadcrumb.Item>
      </Breadcrumb>
      <div className="content-container">
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
          <Form.Item label="二进制">
            <Input.TextArea value={binary} onChange={onBinaryChange} />
          </Form.Item>

          <Form.Item label="八进制">
            <Input.TextArea value={octal} onChange={onOctalChange} />
          </Form.Item>

          <Form.Item label="十进制">
            <Input.TextArea value={decimal} onChange={onDecimalChange} />
          </Form.Item>

          <Form.Item label="十六进制">
            <Input.TextArea
              value={hexadecimal}
              onChange={onHexadecimalChange}
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
