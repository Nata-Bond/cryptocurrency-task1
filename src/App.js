import React, { Component } from "react";
import apiCurr from "./services/currencyAPI";
import CurrTab from "./components/currTab/CurrTab";
import s from "./app.module.css";

export default class App extends Component {
  state = {
    currencies: [],
    error: null,
  };

  componentDidMount() {
    apiCurr
      .getCurrencies()
      .then((result) =>
        result.sort((a, b) => a.quote.USD.price - b.quote.USD.price)
      )
      .then((result) => this.setState({ currencies: result }))
      .catch((error) => {
        this.setState({ error: error });
      });
  }

  render() {
    console.log(this.state.currencies);

    const { currencies } = this.state;
    return (
      <section className={s.currSection}>
        <h1>OUR CURRENCIES</h1>
        {<CurrTab currencies={currencies} />}
      </section>
    );
  }
}
