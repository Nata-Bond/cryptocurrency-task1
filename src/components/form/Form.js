import React, { useState, useEffect } from "react";
import s from "./form.module.css";
import apiCurr from "./../../services/currencyAPI";
import { sortByName } from "./../../services/sortByName";
import Select from "react-select";

const Form = ({ onSubmit, selectedCurrencies }) => {
  const [error, setError] = useState(null);

  const [currenciesList, setCurrenciesList] = useState([]);
  useEffect(() => {
    apiCurr
      .getAdditionalCurrencies()
      .then((result) => sortByName(result))
      .then((result) =>
        setCurrenciesList(
          result.map((el) => ({ label: el.symbol, value: el.symbol }))
        )
      )
      .catch((error) => {
        setError(error);
      });
  }, []);

  return error ? (
    <h2 className={s.error}>No currencies today, sorry</h2>
  ) : (
    <div className={s.form}>
      <h3>CHOOSE ADDITIONAL CURRENCIES</h3>
      <Select
        isMulti
        options={currenciesList}
        defaultValue={selectedCurrencies.map((el) => ({
          label: el,
          value: el,
        }))}
        onChange={onSubmit}
      />
    </div>
  );
};

export default Form;
