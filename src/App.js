import React, { useState, useEffect } from "react";
import apiCurr from "./services/currencyAPI";
import CurrTab from "./components/currTab/CurrTab";
import Form from "./components/form/Form";
import s from "./app.module.css";
import { CRYPTO_LIST } from "./services/variables";

const App = () => {

  const [data, setData] = useState({
    currencies: [],
    selectedCurrencies: CRYPTO_LIST,
    error: null,
    sort: "asc",
    sortField: "quote.USD.price"
    });



  useEffect(() => {
    apiCurr
      .getCurrencies(data.selectedCurrencies)
      .then((result) =>
        result.sort((a, b) => a.quote.USD.price - b.quote.USD.price)
      )
      .then((result) => setData((prevData) => ({
        ...prevData,
        currencies: result
      })))
      .catch((error) => {
        setData((prevData) => ({
          ...prevData,
          error
        }))
      });
  }, [data.selectedCurrencies]);

  const deepFind = (obj, path) => {
    return path.reduce((currentLayer, p) => {
      return (currentLayer || {})[p];
    }, obj);
  };

  const sortedData = (sortField) => {
    const sortType = sort === "asc" ? "desc" : "asc";
    const path = sortField.split(".");

    if (sort === "desc") {
      currencies.sort((a, b) => {
        if (deepFind(a, path) > deepFind(b, path)) {
          return 1;
        }
        if (deepFind(a, path) < deepFind(b, path)) {
          return -1;
        }
        return 0;
      });
    } else {
      currencies.sort((a, b) => {
        if (deepFind(a, path) < deepFind(b, path)) {
          return 1;
        }
        if (deepFind(a, path) > deepFind(b, path)) {
          return -1;
        }
        return 0;
      });
    }
    setData((prevState) => ({
      ...prevState,
      sortField,
      sort: sortType,
      currencies
    }))
  };

  const AdditionalCurrency = (newCurr) => {
    setData((prevData) => ({
      ...prevData,
      selectedCurrencies: newCurr.map((el) => el.value)
    }))
  };

  return error ? (
    <h2 className={s.error}>SORRY, SOMETHING WENT WRONG! PLEASE TRY LATER</h2>
  ) : (
    <section className={s.currSection}>
      <Form
        onSubmit={AdditionalCurrency}
        selectedCurrencies={data.selectedCurrencies}
      />
      <h1>CURRENCIES</h1>
      {
        <CurrTab
          currencies={data.currencies}
          onSort={sortedData}
          sort={data.sort}
          sortField={data.sortField}
        />
      }
    </section>
  );
};

export default App;
