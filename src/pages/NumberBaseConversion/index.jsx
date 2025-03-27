import "./index.scss";
import { Breadcrumb, Button, Form, Input, message } from "antd";
import React, { useState } from "react";

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

    setBinary(e.target.value.replace("2", "0"));
  };

  const onOctalChange = (e) => {
    if (
      e.target.value !== "" &&
      !containsOnlyAllowedChars(e.target.value, "01234567 ")
    ) {
      message.info("仅允许输入 0~7");
      return;
    }

    setOctal(e.target.value);
  };

  const onDecimalChange = (e) => {
    if (
      e.target.value !== "" &&
      !containsOnlyAllowedChars(e.target.value, "0123456789 ")
    ) {
      message.info("仅允许输入 0~9");
      return;
    }

    setDecimal(e.target.value);
  };

  const onHexadecimalChange = (e) => {
    if (
      e.target.value !== "" &&
      !containsOnlyAllowedChars(e.target.value, "0123456789abcdefABCDEF ")
    ) {
      message.info("仅允许输入 0~9 和 A-F");
      return;
    }

    setHexadecimal(
      e.target.value
        .replace("a", "A")
        .replace("b", "B")
        .replace("c", "C")
        .replace("d", "D")
        .replace("e", "E")
        .replace("f", "F"),
    );
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
