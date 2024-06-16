import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as cheerio from "cheerio";
import * as iconv from "iconv-lite";
// import { data } from "../../../utils/segmentos";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = "https://www.fundamentus.com.br/fii_resultado.php";

  // const segmentos: { [key: string]: string } = data;

  try {
    const { data } = await axios.get(url, { responseType: "arraybuffer" });
    const decodedData = iconv.decode(Buffer.from(data, "binary"), "iso-8859-1");
    const $ = cheerio.load(decodedData);
    const table = $("table");

    if (table.length) {
      const headers: string[] = [];
      const rows: any[] = [];

      table.find("thead tr th").each((index, element) => {
        headers.push($(element).text().trim());
      });

      table.find("tbody tr").each((index, element) => {
        const row: any = { key: Math.random().toString(36).substr(2, 9) }; // Chave aleatória
        $(element)
          .find("td")
          .each((i, el) => {
            const cell = $(el);
            const link = cell.find("a");
            if (link.length) {
              row[headers[i]] = {
                text: link.text().trim(),
                href: link.attr("href"),
              };
            } else {
              row[headers[i]] = cell.text().trim();
            }
          });

        // const fiiCode = row["Papel"]?.text;
        // if (fiiCode && segmentos[fiiCode]) {
        //   row["segmento_sistema"] = segmentos[fiiCode];
        // } else {
        //   row["segmento_sistema"] = "";
        // }

        rows.push(row);
      });

      res.status(200).json(rows);
    } else {
      res.status(404).json({ message: "Tabela não encontrada." });
    }
  } catch (error) {
    console.error(`Erro ao acessar a página: ${error}`);
    res.status(500).json({ message: "Erro ao acessar a página." });
  }
};

export default handler;
