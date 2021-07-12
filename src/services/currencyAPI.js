import axios from 'axios';

const baseURL = "https://api.nomics.com/v1";
const keyAPI = "200b8026db2abd296f45150a2d5fe512232f7cec"


const getCurrencies = () => {
    return axios
    .get(`${baseURL}/currencies/ticker?key=${keyAPI}&ids=BTC,ETH,DOGE&interval=1d,30d&convert=USD&per-page=100&page=1`)
  .then(response =>  response.data)
}





export default {
    getCurrencies 
}