import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Form, Input, message, Select } from "antd";
import { useNavigate } from "react-router-dom";
import {
  calculateAddressLines,
  calculateDataLines,
  validateCapacity,
  validateWordLength,
} from "@/utils/memoryCalculator";
import "./index.scss";

export default function MemoryAddressDataCalculator() {
  const navigator = useNavigate();
  const [capacity, setCapacity] = useState("2");
  const [unit, setUnit] = useState("");
  const [wordLength, setWordLength] = useState("1");
  const [addressLines, setAddressLines] = useState(0);
  const [dataLines, setDataLines] = useState(0);
  const [addressCalcProcess, setAddressCalcProcess] = useState("");
  const [dataCalcProcess, setDataCalcProcess] = useState("");

  const updateAddressLines = () => {
    const result = calculateAddressLines(capacity, unit);
    setAddressLines(result);
    
    // 更新地址线计算过程文本
    const unitMultiplier =
      unit === "K"
        ? 1024
        : unit === "M"
          ? 1024 * 1024
          : unit === "G"
            ? 1024 * 1024 * 1024
            : 1;
    const totalBytes = capacity * unitMultiplier;
    const process = `计算过程：地址线数量 = log2(字数) = log2(${capacity}${unit ? ` × ${unitMultiplier}` : ""}) = log2(${totalBytes}) = ${result}`;
    setAddressCalcProcess(process);
  };

  const updateDataLines = () => {
    const result = calculateDataLines(wordLength);
    setDataLines(result);
    
    // 更新数据线计算过程文本
    const process = `计算过程：数据线数量 = 每个字的位数 = ${wordLength}`;
    setDataCalcProcess(process);
  };

  const handleCapacityChange = (e) => {
    const value = e.target.value;
    setCapacity(value);
  };

  const handleWordLengthChange = (e) => {
    const value = e.target.value;
    setWordLength(value);
  };

  const handleUnitChange = (value) => {
    setUnit(value);
    if (validateCapacityInput()) {
      updateAddressLines();
    }
  };

  const validateCapacityInput = () => {
    // 调用工具函数验证容量
    if (!validateCapacity(Number(capacity), unit)) {
      message.info("字数必须为2的幂次方");
      setAddressLines("错误：字数必须为2的幂次方");
      setAddressCalcProcess("错误：字数必须为2的幂次方");
      return false;
    }
    return true;
  };

  const validateWordLengthInput = () => {
    // 调用工具函数验证字长
    if (!validateWordLength(Number(wordLength))) {
      message.info("字的位数必须大于等于1");
      setDataLines("错误：字的位数必须大于等于1");
      setDataCalcProcess("错误：字的位数必须大于等于1");
      return false;
    }
    return true;
  };

  const handleCapacityBlur = () => {
    if (validateCapacityInput()) {
      updateAddressLines();
    }
  };

  const handleWordLengthBlur = () => {
    if (validateWordLengthInput()) {
      updateDataLines();
    }
  };

  const onClear = () => {
    setCapacity("2");
    setUnit("");
    setWordLength("1");
    // 重置后需要更新计算过程
    setTimeout(() => {
      if (validateCapacityInput()) {
        updateAddressLines();
      }
      if (validateWordLengthInput()) {
        updateDataLines();
      }
    }, 0);
  };

  useEffect(() => {
    if (validateCapacityInput()) {
      updateAddressLines();
    }
  }, [unit, capacity]);

  useEffect(() => {
    if (validateWordLengthInput()) {
      updateDataLines();
    }
  }, [wordLength]);

  return (
    <div id="MemoryAddressDataCalculator">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item
          className="breadcrumb-item"
          onClick={() => navigator("/")}
        >
          首页
        </Breadcrumb.Item>
        <Breadcrumb.Item className="breadcrumb-item">
          存储器计算器
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="content-container">
        <div>存储器芯片的容量通常用 a×b 表示</div>
        <div>a 为字数，即单元数；b 为每个字的位数</div>
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
          <Form.Item label="存储器规格" className="form-item">
            <div className="specification-container">
              <Input
                onChange={handleCapacityChange}
                onBlur={handleCapacityBlur}
                value={capacity}
              />
              <Select
                defaultValue=""
                value={unit}
                style={{ width: 120 }}
                onChange={handleUnitChange}
                options={[
                  { value: "", label: "" },
                  { value: "K", label: "K" },
                  { value: "M", label: "M" },
                  { value: "G", label: "G" },
                ]}
              />
              <span className="multiplication-sign"> × </span>
              <Input
                onChange={handleWordLengthChange}
                onBlur={handleWordLengthBlur}
                value={wordLength}
              />
            </div>
          </Form.Item>
          <Form.Item label="地址线数量">
            <Input value={addressLines} readOnly />
            <div>{addressCalcProcess}</div>
          </Form.Item>
          <Form.Item label="数据线数量">
            <Input value={dataLines} readOnly />
            <div>{dataCalcProcess}</div>
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
