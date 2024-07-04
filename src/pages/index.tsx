import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Button,
  Col,
  Form,
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
import ParamsForm from "@/containers/FIIS/Forms";
import { parse } from "path";
import Typography from "antd/es/typography/Typography";

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
  "Preço do m2"?: string;
  "Aluguel por m2"?: string;
  "Cap Rate"?: string;
  "Vacância Média"?: string;
  Endereço?: string;
}

type DataIndex = keyof DataType;

export default function Home() {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [dataTable, setDataTable] = useState<DataType[]>(dataSource);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState([
    {
      tableFii: false,
    },
  ]);

  useEffect(() => {
    async function fetchDataSource() {
      try {
        setLoading([{ tableFii: true }]);
        const { data } = await axios.get("/api/fii");
        setDataSource(data);
      } catch (error) {
        console.error(`Erro ao acessar a API: ${error}`);
        setDataSource([]);
      } finally {
        setLoading([{ tableFii: false }]);
      }
    }
    fetchDataSource();
  }, []);

  useEffect(() => {
    setDataTable(dataSource);
  }, [dataSource]);

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
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              handleSearch(selectedKeys as string[], confirm, dataIndex);
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
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
      } else {
        const dataIndexValue = record[dataIndex];
        const textValue =
          typeof dataIndexValue === "string"
            ? dataIndexValue.toUpperCase()
            : String(dataIndexValue);
        return textValue.includes((value as string).toUpperCase());
      }
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });

  const columns: TableColumnType<DataType>[] = [
    {
      title: "Papel",
      dataIndex: "Papel",
      key: "key",
      render: (text: string, record: DataType) => {
        return (
          <a
            href={`https://www.fundamentus.com.br/${record.Papel.href}`}
            target="_blank"
          >
            {`${record.Papel.text}`}
          </a>
        );
      },
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
      render: (text: string) => {
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
      title: "Dividend Yield",
      dataIndex: "Dividend Yield",
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
      render: (text: string) => {
        const numero = normalizeNumber(text);
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
      render: (text: string) => {
        const numero = normalizeNumber(text);
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
      render: (text: string) => {
        const numero = normalizeNumber(text);
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
  ];

  const parseDecimal = (str: string): number => {
    const strNumber = str.replace(",", ".");
    const number = parseFloat(strNumber);
    return number;
  };

  const normalizeNumber = (str: string) => {
    const isMilharNumber =
      str.includes(".") && parseFloat(str.replace(/\./g, "")) >= 1000;

    const isDecimalNumber = str.includes(",");

    if (isMilharNumber) {
      return parseInt(str.replace(/\./g, ""), 10);
    } else if (isDecimalNumber) {
      return parseFloat(str.replace(",", "."));
    } else {
      return parseInt(str, 10);
    }
  };

  const rankingConfig = [
    {
      atribut: "Dividend Yield",
      scoreMaior: 1,
      scoreMenor: -1,
    },
    {
      atribut: "P/VP",
      scoreMaior: -1,
      scoreMenor: 1,
    },
    {
      atribut: "Liquidez",
      scoreMaior: 0.3,
      scoreMenor: -0.3,
    },
    {
      atribut: "Valor de Mercado",
      scoreMaior: 0.1,
      scoreMenor: -0.1,
    },
  ];

  const handleFilter = () => {
    setDataTable(dataSource);
    const { pvpMin, pvpMax, liquidezMin, valorMercadoMin, dyMin, dyMax } =
      form.getFieldsValue();

    if (
      (!pvpMin && !pvpMax) ||
      (!dyMin && !dyMax) ||
      !liquidezMin ||
      !valorMercadoMin
    )
      return;

    const filtered = dataSource.filter((item) => {
      if (!item["P/VP"] || !item["Liquidez"] || !item["Valor de Mercado"])
        return;

      const pvp = parseDecimal(item["P/VP"]);
      const liquidez = normalizeNumber(item["Liquidez"]);
      const valorMercado = normalizeNumber(item["Valor de Mercado"]);
      const dy = parseDecimal(item["Dividend Yield"]);

      console.log(`${valorMercado}: ${valorMercado >= valorMercadoMin}`);

      const pvpCondition = pvp >= pvpMin && pvp <= pvpMax;
      const dyCondition = dy >= dyMin && dy <= dyMax;
      const liquidezCondition = liquidez >= liquidezMin;
      const valorMercadoCondition = valorMercado >= valorMercadoMin;

      return (
        pvpCondition &&
        liquidezCondition &&
        valorMercadoCondition &&
        dyCondition
      );
    });
    console.log(filtered);

    const rankLvl = rankLevel(filtered, rankingConfig);
    setDataTable(rankLvl);
  };

  interface RankingConfig {
    atribut: string;
    scoreMaior: number;
    scoreMenor: number;
  }
  // quero personalizar o raklevel com um array ordenando dinamicamente pelo array o que eu vou querer filtrar e pela ordem do array

  const rankLevel = (data: DataType[], rankingConfig: RankingConfig[]) => {
    const sortedData = data.sort((a: any, b: any) => {
      for (let config of rankingConfig) {
        const { atribut, scoreMaior, scoreMenor } = config;
        if (a[atribut] && b[atribut]) {
          if (a[atribut] > b[atribut]) return scoreMaior;
          if (a[atribut] < b[atribut]) return scoreMenor;
        }
      }
      return 0;
    });

    return sortedData;
  };

  // const rankLevel = (data: DataType[]) => {
  //   const sortedData = data.sort((a, b) => {
  //     if (a["Dividend Yield"] > b["Dividend Yield"]) return -1;
  //     if (a["Dividend Yield"] < b["Dividend Yield"]) return 1;
  //     if (a["P/VP"] < b["P/VP"]) return -1;
  //     if (a["P/VP"] > b["P/VP"]) return 1;
  //     if (a["Liquidez"] > b["Liquidez"]) return -1;
  //     if (a["Liquidez"] < b["Liquidez"]) return 1;
  //     if (a["Valor de Mercado"] > b["Valor de Mercado"]) return -1;
  //     if (a["Valor de Mercado"] < b["Valor de Mercado"]) return 1;
  //     return 0;
  //   });

  //   const rankedData = sortedData.map((item, index) => {
  //     return { ...item, rankLevel: index + 1 };
  //   });

  //   return rankedData;
  // };
  return (
    <Layout>
      <Header style={{ color: "#FFF" }}>
        <h1>{"Tabela de FII's"}</h1>
      </Header>
      <Content style={{ padding: "24px" }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <ParamsForm form={form} handleFilter={handleFilter} />
          </Col>
          <Col span={24}>
            <Table
              dataSource={dataTable}
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
