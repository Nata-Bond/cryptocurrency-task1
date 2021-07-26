import axios from "axios";
import { mergeByProperty } from "./mergeByProperty";

const baseURL = "https://cmc-api-proxy-lmvbixv5b-spean92.vercel.app";
const CRYPTO_LIST = ["BTC", "DOGE", "ETH"];

const getCurrencies = async () => {
  try {
    const responsePrices = await axios.get(
      `${baseURL}/cryptocurrency/quotes/latest?symbol=${CRYPTO_LIST.join()}`
    );
    const currPrices = Object.values(responsePrices.data.data);

    const responseImg = await axios.get(
      `${baseURL}/cryptocurrency/info?symbol=${CRYPTO_LIST.join()}&aux=logo,urls`
    );

    const currImg = Object.values(responseImg.data.data);

    const responsePercChange = await axios.get(
      `${baseURL}/cryptocurrency/listings/latest`
    );
    const currPercChange = Object.values(responsePercChange.data.data).filter(
      ({ symbol }) => CRYPTO_LIST.indexOf(symbol) !== -1
    );

    mergeByProperty(currPrices, currImg, "symbol");
    mergeByProperty(currPrices, currPercChange, "symbol");

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
