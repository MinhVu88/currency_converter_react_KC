import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";
import Currency from "./components/Currency";

function App() {
  const [currencies, setCurrencies] = useState([]),
    [firstOption, setFirstOption] = useState(),
    [secondOption, setSecondOption] = useState(),
    [isFirstOptionSelected, setIsFirstOptionSelected] = useState(true),
    [exchangeRate, setExchangeRate] = useState(),
    [defaultAmount, setDefaultAmount] = useState(1);

  let firstAmount, secondAmount;

  if (isFirstOptionSelected) {
    firstAmount = defaultAmount;

    secondAmount = firstAmount * exchangeRate;
  } else {
    secondAmount = defaultAmount;

    firstAmount = defaultAmount / exchangeRate;
  }

  const change1stAmount = e => {
    setDefaultAmount(e.target.value);

    setIsFirstOptionSelected(true);
  };

  const change2ndAmount = e => {
    setDefaultAmount(e.target.value);

    setIsFirstOptionSelected(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.get("https://api.exchangeratesapi.io/latest");

        console.log(response.data);

        setCurrencies([...Object.keys(response.data.rates), response.data.base]);

        setFirstOption(response.data.base);

        setSecondOption(Object.keys(response.data.rates)[0]);

        setExchangeRate(response.data.rates[Object.keys(response.data.rates)[0]]);
      } catch (error) {
        console.log(error.response.data);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        if (firstOption !== undefined && secondOption !== undefined) {
          const response = await Axios.get(`https://api.exchangeratesapi.io/latest?base=${firstOption}&symbols=${secondOption}`);

          setExchangeRate(response.data.rates[secondOption]);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    }

    fetchData();
  }, [firstOption, secondOption]);

  return (
    <>
      <h1>Currency Convert | 08/07/2020</h1>
      <Currency currencies={currencies} selectedCurrency={firstOption} changeCurrency={e => setFirstOption(e.target.value)} changeAmount={change1stAmount} amount={isNaN(firstAmount) ? "" : firstAmount} />
      <div className="equal">=</div>
      <Currency currencies={currencies} selectedCurrency={secondOption} changeCurrency={e => setSecondOption(e.target.value)} changeAmount={change2ndAmount} amount={isNaN(secondAmount) ? "" : secondAmount} />
    </>
  );
}

export default App;
