import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [currencyRates, setCurrencyRates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://api.forexrateapi.com/v1/latest?api_key=116a5b590c7d25d7e1ad8fd8220c2929&base=USD&currencies=EUR,INR,JPY,GBP,AUD,CAD,CHF');
        const data = await response.json();
        setCurrencyRates(Object.entries(data.rates));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  if (loading) {
    return (
      <h2 className="loading">Loading...</h2>
    );
  }


  return (
    <>
    <div className="App">
        <h1>Forex Exchange Rates</h1>
        <div className='curreny-table'>
          <table className="exchange-table">
            <thead>
              <tr>
                <th>Currency</th>
                <th>Exchange Rate</th>
              </tr>
            </thead>
            <tbody>
              {currencyRates.map(([currency, rate], index) => (
                <tr key={currency} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td>{currency}</td>
                  <td>{rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
