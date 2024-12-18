import axios from "axios";
import https from 'https'

export default async function cbmRs(login, pass) {

  const url = 'https://intranet.cbm.rs.gov.br/'
  const encodeLogin = btoa(`${login}:${pass}`)

   const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    'authorization': 'Basic '+encodeLogin,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  };
  
  const { data } = await axios({
    method: "GET",
    headers: headers,
    url: url,
    validateStatus: () => true,
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false 
      }),

  });

  if (data.includes('the credentials required.'))
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
