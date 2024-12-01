"use client"
import { useCallback, useEffect, useState } from 'react';
import './styles.css'
import { Select } from '../select/Select'
import { SetPage } from '@/app/types/types';

interface TokeninputProps {
  setPage: SetPage;
}
export const Tokeninput: React.FC<TokeninputProps> = ({ setPage }) => {

  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("")
  let token1 = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
  let token2 = "0xDEf1CA1fb7FBcDC777520aa7f396b4E015F497aB"
  const [price, setPrice] = useState(0)
  const fetchData = useCallback(async (token: any) => {
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
    // fetchData(token1)
    fetchData(token2)
  }, [])


  const handleInputChange = (event: any) => {
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

  return <div className='tokeninput'>
    <p className='font13'>You pay</p>
    <div className='inputwrapper'>
      <Select setPage={() => setPage(false)} />
      <input
        maxLength={19}
        className='input'
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
    <div className='result'>
      <p id="selectedName">Ether</p>
      {result && <p>~${result}</p>}
    </div>
  </div>
}