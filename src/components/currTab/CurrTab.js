import React from "react";
import s from "./currTab.module.css";

const CurrTab = ({ currencies, onSort, sort, sortField }) => {
  const TrendDirection = (number) => {
    switch (Math.sign(number)) {
      case 1:
        return s.price_go_up;
      case -1:
        return s.price_go_down;
      case 0:
      default:
        return s.price_same;
    }
  };
  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th>#</th>
          <th>icon</th>
          <th>name</th>
          <th onClick={() => onSort("quote.USD.price")}>
            price
            {sortField === "quote.USD.price" ? <small>{sort}</small> : null}
          </th>
          <th onClick={() => onSort("quote.USD.percent_change_1h")}>
            changes 1h
            {sortField === "quote.USD.percent_change_1h" ? (
              <small>{sort}</small>
            ) : null}
          </th>
          <th onClick={() => onSort("quote.USD.percent_change_24h")}>
            changes 24h
            {sortField === "quote.USD.percent_change_24h" ? (
              <small>{sort}</small>
            ) : null}
          </th>
          <th onClick={() => onSort("quote.USD.percent_change_7d")}>
            changes 7d
            {sortField === "quote.USD.percent_change_7d" ? (
              <small>{sort}</small>
            ) : null}
          </th>
        </tr>
      </thead>
      <tbody>
        {currencies.map((curr, index) => (
          <tr key={curr.id}>
            <td>{index + 1}</td>
            <td>
              <img src={curr.logo} alt={curr.name} width={20} height={20} />
            </td>
            <td>
              <a
                className={s.link_to_curr}
                href={curr.urls.website[0]}
                target="_blank"
                rel="noreferrer noopener"
                title="website of currency"
              >
                {curr.name}
              </a>
            </td>
            <td>{curr.quote.USD.price}</td>
            <td className={TrendDirection(curr.quote.USD.percent_change_1h)}>
              {curr.quote.USD.percent_change_1h.toFixed(2)} %
            </td>
            <td className={TrendDirection(curr.quote.USD.percent_change_24h)}>
              {curr.quote.USD.percent_change_24h.toFixed(2)} %
            </td>
            <td className={TrendDirection(curr.quote.USD.percent_change_7d)}>
              {curr.quote.USD.percent_change_7d.toFixed(2)} %
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CurrTab;
