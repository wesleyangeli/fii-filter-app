import { Button, Col, Form, Input, InputNumber, Row, Typography } from "antd";

export default function ParamsForm({ form, handleFilter }: any) {
  return (
    <Row>
      <Col span={24}>
        <Form
          form={form}
          name="complex-form"
          onFinish={(values) => console.log(values)}
          layout="vertical"
          initialValues={{
            pvpMin: 0.5,
            pvpMax: 1.5,
            liquidezMin: 500000,
            valorMercadoMin: 1000000000,
            dyMin: 6.0,
            dyMax: 15.0,
          }}
        >
          <Row gutter={[0, 0]}>
            <Col span={24}>
              <Typography.Text>P/VP (min / max)</Typography.Text>
              <Row gutter={[8, 0]}>
                <Col span={2}>
                  <Form.Item name="pvpMin">
                    <InputNumber<number>
                      min={0}
                      step="0.1"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) =>
                        value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                      }
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Form.Item name="pvpMax">
                    <InputNumber<number>
                      min={0}
                      step="0.1"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) =>
                        value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                      }
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Typography.Text>Dividend Yeld (min / max) %</Typography.Text>
              <Row gutter={[8, 0]}>
                <Col span={2}>
                  <Form.Item name="dyMin">
                    <InputNumber<number>
                      min={0}
                      step="0.1"
                      suffix="%"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) =>
                        value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                      }
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Form.Item name="dyMax">
                    <InputNumber<number>
                      min={0}
                      step="0.1"
                      suffix="%"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) =>
                        value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                      }
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={0}>
                <Col span={3}>
                  <Form.Item label="Liquidez" name="liquidezMin">
                    <InputNumber<number>
                      min={0}
                      step={100000}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) =>
                        value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                      }
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={0}>
                <Col span={3}>
                  <Form.Item name="valorMercadoMin" label={"Valor de mercado"}>
                    <InputNumber<number>
                      min={100000}
                      step={100000000}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) =>
                        value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                      }
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={handleFilter}>Buscar</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}
