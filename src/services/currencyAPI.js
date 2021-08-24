import axios from "axios";
import { mergeByProperty } from "./mergeByProperty";

const baseURL = "https://cmc-api-proxy-lmvbixv5b-spean92.vercel.app";

const getCurrencies = async (list) => {
  try {
    const responsePrices = await axios.get(
      `${baseURL}/cryptocurrency/quotes/latest?symbol=${list.join()}`
    );

    const currPrices = Object.values(responsePrices.data.data);

    const responseImg = await axios.get(
      `${baseURL}/cryptocurrency/info?symbol=${list.join()}&aux=logo,urls`
    );

    const currImg = Object.values(responseImg.data.data);

    const responsePercChange = await axios.get(
      `${baseURL}/cryptocurrency/listings/latest`
    );

    const currPercChange = Object.values(responsePercChange.data.data).filter(
      ({ symbol }) => list.indexOf(symbol) !== -1
    );

    mergeByProperty(currPrices, currImg, "symbol");
    mergeByProperty(currPrices, currPercChange, "symbol");

    return currPrices;
  } catch (error) {
    console.log("error", { error });
    throw error;
  }
};

const getAdditionalCurrencies = async () => {
  try {
    const responseAdditCurr = await axios.get(
      `${baseURL}/cryptocurrency/map?limit=50`
    );
    const additCurr = Object.values(responseAdditCurr.data.data);
    return additCurr;
  } catch (error) {
    console.log("error", { error });
    throw error;
  }
};

// eslint-disable-next-line
export default {
  getCurrencies,
  getAdditionalCurrencies,
};
