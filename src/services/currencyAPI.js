import axios from "axios";

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

    const mergeByProperty = (target, source, prop) => {
      source.forEach((sourceElement) => {
        let targetElement = target.find((targetElement) => {
          return sourceElement[prop] === targetElement[prop];
        });
        targetElement
          ? Object.assign(targetElement, sourceElement)
          : target.push(sourceElement);
      });
    };

    mergeByProperty(currPrices, currImg, "symbol");

    return currPrices;
  } catch (error) {
    console.log("error", { error });
    throw error;
  }
};

export default {
  getCurrencies,
};
