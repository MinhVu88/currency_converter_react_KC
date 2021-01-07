import React from "react";

export default function Currency({ currencies, selectedCurrency, changeCurrency, changeAmount, amount }) {
  return (
    <div>
      <input type="number" className="input" value={amount.toString()} onChange={changeAmount} />
      <select value={selectedCurrency} onChange={changeCurrency}>
        {currencies.map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}
