// const baseUrl = {
//   Sector: "",
//   SubSector: "",
//   Segment: "",
//   my_range: "-20;100",
//   forecast: {
//     upsidedownside: { Item1: null, Item2: null },
//     estimatesnumber: { Item1: null, Item2: null },
//     revisedup: true,
//     reviseddown: true,
//     consensus: [],
//   },
//   dy: { Item1: null, Item2: null },
//   p_l: { Item1: null, Item2: null },
//   peg_ratio: { Item1: null, Item2: null },
//   p_vp: { Item1: null, Item2: null },
//   p_ativo: { Item1: null, Item2: null },
//   margembruta: { Item1: null, Item2: null },
//   margemebit: { Item1: null, Item2: null },
//   margemliquida: { Item1: null, Item2: null },
//   p_ebit: { Item1: null, Item2: null },
//   ev_ebit: { Item1: null, Item2: null },
//   dividaliquidaebit: { Item1: null, Item2: null },
//   dividaliquidapatrimonioliquido: { Item1: null, Item2: null },
//   p_sr: { Item1: null, Item2: null },
//   p_capitalgiro: { Item1: null, Item2: null },
//   p_ativocirculante: { Item1: null, Item2: null },
//   roe: { Item1: null, Item2: null },
//   roic: { Item1: null, Item2: null },
//   roa: { Item1: null, Item2: null },
//   liquidezcorrente: { Item1: null, Item2: null },
//   pl_ativo: { Item1: null, Item2: null },
//   passivo_ativo: { Item1: null, Item2: null },
//   giroativos: { Item1: null, Item2: null },
//   receitas_cagr5: { Item1: null, Item2: null },
//   lucros_cagr5: { Item1: null, Item2: null },
//   liquidezmediadiaria: { Item1: null, Item2: null },
//   vpa: { Item1: null, Item2: null },
//   lpa: { Item1: null, Item2: null },
//   valormercado: { Item1: null, Item2: null },
// };

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const url =
    "https://statusinvest.com.br/category/advancedsearchresultpaginated?search=%7B%22Sector%22%3A%22%22%2C%22SubSector%22%3A%22%22%2C%22Segment%22%3A%22%22%2C%22my_range%22%3A%22-20%3B100%22%2C%22forecast%22%3A%7B%22upsidedownside%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22estimatesnumber%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22revisedup%22%3Atrue%2C%22reviseddown%22%3Atrue%2C%22consensus%22%3A%5B%5D%7D%2C%22dy%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_l%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22peg_ratio%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_vp%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_ativo%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22margembruta%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22margemebit%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22margemliquida%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_ebit%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22ev_ebit%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22dividaliquidaebit%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22dividaliquidapatrimonioliquido%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_sr%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_capitalgiro%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_ativocirculante%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22roe%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22roic%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22roa%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22liquidezcorrente%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22pl_ativo%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22passivo_ativo%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22giroativos%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22receitas_cagr5%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22lucros_cagr5%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22liquidezmediadiaria%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22vpa%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22lpa%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22valormercado%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%7D&orderColumn=&isAsc=&page=0&take=15&CategoryType=1";

  try {
    const { data } = await axios.get(url, {
      method: "GET",
      headers: {
        Accept: "application/json, text/javascript, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36",
      },
    });
    console.log(data);

    res.status(200).json(data);
  } catch (error) {
    console.error(`Erro ao acessar a página: ${error}`);
    res.status(500).json({ message: "Erro ao acessar a página." });
  }
};

export default handler;
