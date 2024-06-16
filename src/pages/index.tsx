import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Layout, Row, Table } from "antd";

const { Header, Content } = Layout;

export default function Home() {
  const [tableHtml, setTableHtml] = useState<[]>([]);
  const [loading, setLoading] = useState([
    {
      tableFii: false,
    },
  ]);

  useEffect(() => {
    const fetchTableHtml = async () => {
      try {
        setLoading([{ tableFii: true }]);
        const { data } = await axios.get("/api/fii");
        console.log(data);
        setTableHtml(data);
      } catch (error) {
        console.error(`Erro ao acessar a API: ${error}`);
        setTableHtml([]);
      } finally {
        setLoading([{ tableFii: false }]);
      }
    };

    fetchTableHtml();
  }, []);

  const columns = [
    {
      title: "Papel",
      dataIndex: "Papel",
      key: "key",
    },
    {
      title: "Segmento",
      dataIndex: "Segmento",
      key: "key",
    },
    {
      title: "Cotação",
      dataIndex: "Cotação",
      key: "key",
    },
    {
      title: "FOO Yield",
      dataIndex: "FOO Yield",
      key: "key",
    },
    {
      title: "P/VP",
      dataIndex: "P/VP",
      key: "key",
    },
    {
      title: "Valor de Mercado",
      dataIndex: "Valor de Mercado",
      key: "key",
    },
    {
      title: "Liquidez",
      dataIndex: "Liquidez",
      key: "key",
    },
    {
      title: "Qtd de imóveis",
      dataIndex: "Qtd de imóveis",
      key: "key",
    },
    {
      title: "Preço do m2",
      dataIndex: "Preço do m2",
      key: "key",
    },
    {
      title: "Aluguel por m2",
      dataIndex: "Aluguel por m2",
      key: "key",
    },
    {
      title: "Cap Rate",
      dataIndex: "Cap Rate",
      key: "key",
    },
    {
      title: "Vacância Média",
      dataIndex: "Vacância Média",
      key: "key",
    },
  ];

  return (
    <Layout>
      <Header style={{ color: "#FFF" }}>
        <h1>{"Tabela de FII's"}</h1>
      </Header>
      <Content style={{ padding: "24px" }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Table
              dataSource={tableHtml}
              columns={columns}
              pagination={false}
              size={"small"}
              loading={loading[0].tableFii}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
