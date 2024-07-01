// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState("100");
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("INR");
  const [rate, setRate] = useState("");
  const [loading, setLoading] = useState(false);

  function handleInput(e) {
    setAmount(Number(e.target.value));
    console.log(amount);
  }

  const handleCurrencyChange1 = (e) => {
    setConvertFrom(e.target.value);
  };

  const handleCurrencyChange2 = (e) => {
    setConvertTo(e.target.value);
  };

  useEffect(() => {
    async function convert() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${convertFrom}&to=${convertTo}`
        );
        const data = await res.json();

        console.log(data);
        setRate(data.rates[convertTo]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    if (convertFrom === convertTo) return setRate(amount);

    convert();
    return () => setRate();
  }, [convertFrom, convertTo, amount]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={handleInput}
        disabled={loading}
      />
      <select
        value={convertFrom}
        onChange={handleCurrencyChange1}
        disabled={loading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="EGP">EGP</option>
      </select>
      <select
        value={convertTo}
        onChange={handleCurrencyChange2}
        disabled={loading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="EGP">EGP</option>
      </select>
      <p>OUTPUT</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>
          {rate} {convertTo}
        </p>
      )}
    </div>
  );
}
