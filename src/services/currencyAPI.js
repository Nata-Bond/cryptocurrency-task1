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
      `${baseURL}/cryptocurrency/info?symbol=BTC,DOGE,ETH&aux=logo,urls`
    );

    const currImg = Object.values(responseImg.data.data);

    const responsePercChange = await axios.get(
      `${baseURL}/cryptocurrency/listings/latest`
    );
    const currPercChange = Object.values(responsePercChange.data.data).filter(
      (el) => el.symbol === "BTC" || el.symbol === "DOGE" || el.symbol === "ETH"
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
