import axios from "axios";
import { mergeByProperty } from "./mergeByProperty";

const baseURL = "https://cmc-api-proxy-lmvbixv5b-spean92.vercel.app";

const getCurrencies = async () => {
  try {
    const responsePrices = await axios.get(
      `${baseURL}/cryptocurrency/quotes/latest?symbol=BTC,DOGE,ETH`
    );
    const currPrices = Object.values(responsePrices.data.data);

    const responseImg = await axios.get(
      `${baseURL}/cryptocurrency/info?symbol=BTC,DOGE,ETH&aux=logo`
    );

    const currImg = Object.values(responseImg.data.data);

    mergeByProperty(currPrices, currImg, "symbol");

    return currPrices;
  } catch (error) {
    console.log("error", { error });
    throw error;
  }
};

// eslint-disable-next-line
export default {
  getCurrencies,
};
