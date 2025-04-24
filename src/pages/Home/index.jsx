import "./index.scss";
import { Breadcrumb, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div id="BoothMultiplicationCalculator">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item className="breadcrumb-item">首页</Breadcrumb.Item>
      </Breadcrumb>
      <div className="content-container">
        <div className="logo" />
        <div className="content-text">HowCalculator</div>
        <div className="content-text">Version: 0.3.1（公测版）</div>
        <div>
          <span className="content-text-small">GitHub 仓库：</span>
          <a
            className="content-text-small"
            href="https://github.com/ZZHow1024/HowCalculator"
            target="_blank"
          >
            https://github.com/ZZHow1024/HowCalculator
          </a>
        </div>
        <div className="content-text-small">
          开源许可证：GNU General Public License v3.0
        </div>

        <Row>
          <Col span={12}>
            <div className="button-container">
              <div
                className="button"
                onClick={() =>
                  navigate("/sign-magnitude-multiplication-calculator")
                }
              >
                <h1>原码一位乘法</h1>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className="button-container">
              <div
                className="button"
                onClick={() => navigate("/booth-multiplication-calculator")}
              >
                <h1>补码一位乘法</h1>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="button-container">
              <div
                className="button"
                onClick={() => navigate("/number-base-conversion")}
              >
                <h1>数制转换</h1>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
