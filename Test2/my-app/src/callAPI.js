import axios from 'axios'

export default function callApi(endpoint, method = 'GET', body){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:4001');
    headers.append('Access-Control-Allow-Credentials', 'true');
   // headers.append('GET', 'POST', 'OPTIONS');
    let LINK = 'http://localhost:4001'
    try{
        return axios({
                    method: method,
                    url: `${LINK}/${endpoint}`,
                    data: body,
                    headers: headers
                }).catch(err =>{
                    console.log(err);
            });
    }catch(ex){
        console.log(ex)
    }
}