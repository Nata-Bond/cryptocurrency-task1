import React, { Component } from "react";
import apiCurr from "./services/currencyAPI";
import CurrTab from "./components/currTab/CurrTab";
import s from "./app.module.css";
import _ from "lodash";

export default class App extends Component {
  state = {
    currencies: [],
    error: null,
    sort: "asc",
    sortField: "quote.USD.price",
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

  sortedData = (sortField) => {
    const sortType = this.state.sort === "asc" ? "desc" : "asc";
    const orderedData = _.orderBy(this.state.currencies, sortField, sortType);
    this.setState({
      currencies: orderedData,
      sort: sortType,
      sortField,
    });
  };

  render() {
    const { currencies, sort, sortField } = this.state;
    return (
      <section className={s.currSection}>
        <h1>OUR CURRENCIES</h1>
        {
          <CurrTab
            currencies={currencies}
            onSort={this.sortedData}
            sort={sort}
            sortField={sortField}
          />
        }
      </section>
    );
  }
}
