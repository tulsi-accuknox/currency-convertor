import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Convert.css";
  
function Convert() {
  const [clicked,setClicked]= useState(1)
  const [state, setState] = useState({
    currencies: [
      "INR",
      "AUD",
      "BGN",
      "BRL",
      "CAD",
      "CHF",
      "CNY",
      "CZK",
      "DKK",
      "DZD",
      "EUR",
      "USD",
      "HKD",
      "JPY",
      "IDR",
      "NZD",
      "RUB",
      "TWD",
      "KRW",
      "SGD",
    ],
    base: "USD",
    amount: "",
    target: "INR",
    exchange_rates: "",
    last_updated: ""
  });

  const { currencies, base, amount, target, exchange_rates, last_updated } = state;
  const Api_Key = "431f8da0d43e4f65a744856bf538c2d4";
  useEffect(() => {
    if (amount === isNaN) {
      return;
    } else {

      const getCurrency = async () => {
        
      };
      getCurrency();
    }
  }, [clicked,base,target]);



  const handleOnchangeInput = (e) => {
    setState({
      ...state,
      amount: e.target.value,
      exchange_rates:null,
      last_updated:null,
    })
  };

  const handleOnchangeSelect = (e) => {
    setState({
      ...state,
      [e.target.name] : e.target.value,
      exchange_rates: null,
    })
  };

  const handleSwap = (e) => {
    setState({
      ...state,
      target:base,
      base:target,
    exchange_rates:null,
    })
  };

  const handleClick = async() => {
    const response = await fetch(
      `https://exchange-rates.abstractapi.com/v1/live?api_key=${Api_Key}&base=${base}&target=${target}` 
    );

    const data = await response.json();
    
    const promiseHandler = await data;
    console.log("response :", promiseHandler);
    const exchange_rates = (promiseHandler?.exchange_rates[target] * amount)?.toFixed(3);
    const last_updated = (promiseHandler.last_updated)
    setState({
      ...state,
      exchange_rates,
      last_updated,
    })
  };

  const handleDate = (val) => {
    const newDate = new Date(parseInt(val)* 1000);
    const month = newDate.getMonth("default", {month: "short"})+1;
    const currentDate = newDate.getDate();
    const currentYear = newDate.getFullYear();

    return `${currentDate}-${month}-${currentYear}`
  }

  // handleDate(last_updated);
  return (
    <div>
      <div className="container">
        {/* //////////////////title////////////////////// */}

        <div className="convert_title">
          <img src="/exchange.png" alt="" />
          <h2 className="convert_head">Currency Convertor</h2>
        </div>

        {/* ///////////////////display and date ////////////////////// */}

        <div className="convert_display">
          <p className="convert_para">
            {amount} {base} equals{" "}
            {amount === ""
              ? "0"
              : exchange_rates === null
              ? "Calculating..."
              : exchange_rates}{" "}
            {target}
          </p>
          <h3 className="convert_date">
            {/* As of {handleDate(last_updated)} */}
            As of {amount === "" ? "" : handleDate(last_updated) === null ? "" : handleDate(last_updated)}
          </h3>
        </div>

        {/* ////////////////// inputs and dropdowns ///////////////////   */}

        <div className="convert_content">
          <input
            type="number"
            className="convert_input"
            value={amount}
            onChange={handleOnchangeInput}
            placeholder="0"
          />
          <select name="base" value={base} onChange={handleOnchangeSelect}>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>

          <img
            onClick={handleSwap}
            src="/arrows.png"
            alt="img-convert"
            className="convert_arrows"
          />

          <input
            disabled={true}
            value={
              amount === ""
                ? "0"
                : exchange_rates === null
                ? "Calculating..."
                : exchange_rates
            }
            type="number"
            className="convert_input"
            
          />
          <select
            name="target"
            value={target}
            onChange={handleOnchangeSelect}
            
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {/* /////////////////// convert button //////////////////////////////   */}
        <div>
          <button className="convert_btn" onClick={handleClick}>Convert</button>
        </div>
      </div>
    </div>
  );
}

export default Convert;
