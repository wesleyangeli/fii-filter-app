// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const formData = new URLSearchParams();
  formData.append("ffo_y_min", "");
  formData.append("ffo_y_max", "");
  formData.append("divy_min", "");
  formData.append("divy_max", "");
  formData.append("pvp_min", "");
  formData.append("pvp_max", "");
  formData.append("mk_cap_min", "");
  formData.append("mk_cap_max", "");
  formData.append("qtd_imoveis_min", "");
  formData.append("qtd_imoveis_max", "");
  formData.append("preco_m2_min", "");
  formData.append("preco_m2_max", "");
  formData.append("aluguel_m2_min", "");
  formData.append("aluguel_m2_max", "");
  formData.append("cap_rate_min", "");
  formData.append("cap_rate_max", "");
  formData.append("vacancia_min", "");
  formData.append("vacancia_max", "");
  formData.append("segmento", "");
  formData.append("negociada", "ON");
  formData.append("x", "29");
  formData.append("y", "16");

  fetch("https://www.fundamentus.com.br/fii_resultado.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("Error:", error); // Handle any errors
    });
}
