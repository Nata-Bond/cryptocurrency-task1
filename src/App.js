import React, { useState, useEffect } from "react";
import apiCurr from "./services/currencyAPI";
import CurrTab from "./components/currTab/CurrTab";
import Form from "./components/form/Form";
import s from "./app.module.css";
import { CRYPTO_LIST } from "./services/variables";

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("asc");
  const [sortField, setsortField] = useState("quote.USD.price");

  const [selectedCurrencies, setSelectedCurrencies] = useState(CRYPTO_LIST);

  useEffect(() => {
    apiCurr
      .getCurrencies(selectedCurrencies)
      .then((result) =>
        result.sort((a, b) => a.quote.USD.price - b.quote.USD.price)
      )
      .then((result) => setCurrencies(result))
      .catch((error) => {
        setError(error);
      });
  }, [selectedCurrencies]);

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
    setCurrencies(currencies);
    setSort(sortType);
    setsortField(sortField);
  };

  const AdditionalCurrency = (newCurr) => {
    setSelectedCurrencies(newCurr.map((el) => el.value));
  };

  return error ? (
    <h2 className={s.error}>SORRY, SOMETHING WENT WRONG! PLEASE TRY LATER</h2>
  ) : (
    <section className={s.currSection}>
      <Form
        onSubmit={AdditionalCurrency}
        selectedCurrencies={selectedCurrencies}
      />
      <h1>CURRENCIES</h1>
      {
        <CurrTab
          currencies={currencies}
          onSort={sortedData}
          sort={sort}
          sortField={sortField}
        />
      }
    </section>
  );
};

export default App;
