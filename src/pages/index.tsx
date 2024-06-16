import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Button,
  Col,
  Input,
  InputRef,
  Layout,
  Row,
  Space,
  Table,
  TableColumnType,
} from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

interface DataType {
  key: string;
  Papel: {
    text: string;
    href: string;
  };
  Segmento: string;
  Cotação: string;
  "FFO Yield": string;
  "Dividend Yield": string;
  "P/VP": string;
  "Valor de Mercado": string;
  Liquidez: string;
  "Qtd de imóveis": string;
  "Preço do m2": string;
  "Aluguel por m2": string;
  "Cap Rate": string;
  "Vacância Média": string;
  Endereço: string;
}

type DataIndex = keyof DataType;

export default function Home() {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [loading, setLoading] = useState([
    {
      tableFii: false,
    },
  ]);

  useEffect(() => {
    const fetchDataSource = async () => {
      try {
        setLoading([{ tableFii: true }]);
        const { data } = await axios.get("/api/fii");
        console.log(data);
        setDataSource(data);
      } catch (error) {
        console.error(`Erro ao acessar a API: ${error}`);
        setDataSource([]);
      } finally {
        setLoading([{ tableFii: false }]);
      }
    };

    fetchDataSource();
  }, []);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) => {
      if (dataIndex === "Papel") {
        const dataIndexValue = record[dataIndex].text;
        const textValue =
          typeof dataIndexValue === "string"
            ? dataIndexValue.toUpperCase()
            : String(dataIndexValue);
        return textValue.includes((value as string).toUpperCase());
      }
      const dataIndexValue = record[dataIndex];
      const textValue =
        typeof dataIndexValue === "string"
          ? dataIndexValue.toUpperCase()
          : String(dataIndexValue);
      return textValue.includes((value as string).toUpperCase());
    },
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text: any) =>
      searchedColumn === dataIndex ? (text ? text.toString() : "") : text,
  });

  const columns = [
    {
      title: "Papel",
      dataIndex: "Papel",
      key: "key",
      ...getColumnSearchProps("Papel"),
      render: (papel: any, record: any) => {
        return (
          <a
            href={`https://www.fundamentus.com.br/${papel.href}`}
            target="_blank"
          >
            {`${papel.text}`}
          </a>
        );
      },
    },
    {
      title: "Segmento",
      dataIndex: "Segmento",
      key: "key",
      ...getColumnSearchProps("Segmento"),
    },
    {
      title: "Cotação",
      dataIndex: "Cotação",
      key: "key",
      render: (text: string, record: object) => {
        record;
        const numero = parseFloat(text.replace(",", "."));
        const numeroFormatado = numero.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        return <>{numeroFormatado}</>;
      },
    },
    {
      title: "FOO Yield",
      dataIndex: "FFO Yield",
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
      render: (text: string, record: object) => {
        record;
        const numero = parseFloat(text) * 1000;
        const numeroFormatado = numero.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        return <>{numeroFormatado}</>;
      },
    },
    {
      title: "Liquidez",
      dataIndex: "Liquidez",
      key: "key",
      render: (text: string, record: object) => {
        record;
        const numero = parseFloat(text) * 1000;
        const numeroFormatado = numero.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        return <>{numeroFormatado}</>;
      },
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
      render: (text: string, record: object) => {
        record;
        const numero = parseFloat(text) * 1000;
        const numeroFormatado = numero.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        return <>{numeroFormatado}</>;
      },
    },
    {
      title: "Aluguel por m2",
      dataIndex: "Aluguel por m2",
      key: "key",
      render: (text: string, record: object) => {
        record;
        const numero = parseFloat(text) * 1000;
        const numeroFormatado = numero.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        return <>{numeroFormatado}</>;
      },
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
    // {
    //   title: "Segmento sistema",
    //   dataIndex: "segmento_sistema",
    //   key: "key",
    // },
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
              dataSource={dataSource}
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
