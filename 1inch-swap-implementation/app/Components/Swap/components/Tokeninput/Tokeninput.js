"use client"
import { useCallback, useEffect, useState } from 'react';
import './styles.css'
import { Select } from '../select/Select'
import { ButtonArrow } from '@/app/utils/svg';

export const Tokeninput = ({ setPage, second, selectedToken }) => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("")
  let token2 = "0xDEf1CA1fb7FBcDC777520aa7f396b4E015F497aB"
  const [price, setPrice] = useState(0)
  const fetchData = useCallback(async (token) => {
    try {
      const response = await fetch(`/1inch.dev/price/v1.1/1/${token}?currency=USD`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer oYtJS37LUR9zy6jylTaeVKlpGZrRffE9',
        },
      });
      const result = await response.json();
      let value = Object.values(result)[0];
      setPrice(value)
    } catch (err) {
    } finally {
    }
  }, []);


  useEffect(() => {
    fetchData(token2)
  }, [])


  const handleInputChange = (event) => {
    const rawValue = event.target.value;
    const cleanedValue = rawValue.replace(/\D/g, '');
    if (cleanedValue !== '') {
      const number = Number(cleanedValue) * price;
      const formattedResult = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      setResult(formattedResult);
      const formattedInput = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      setInputValue(formattedInput);
    } else {
      setResult('');
      setInputValue('');
    }
  }

  return <div id={second ? "tokeninput" : ""} className='tokeninput'>
    {selectedToken && <p className='font13'>You pay</p>}
    <div className='inputwrapper'>
      {!selectedToken ?
        <div className='selectTokenDiv'>
          <button onClick={(e) => setPage(true)} className='selectButton'>
            Select a token
            <ButtonArrow />
          </button>
        </div> :
        <Select img={selectedToken?.logoURI} setPage={() => setPage(false)} />
      }
      <input
        disabled={second}
        maxLength={19}
        className='input'
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
    <div className='result'>
      <p id="selectedName">{selectedToken?.name}</p>
      {result && <p>~${result}</p>}
    </div>
  </div>
}