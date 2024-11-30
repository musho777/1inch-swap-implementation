"use client"
import { useState } from 'react';
import './styles.css'
import { Select } from '../select/Select'
interface SwapProps {
  setPage: (e: boolean) => void; // Define the type for setPage
}
export const Tokeninput = ({ setPage }) => {

  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("")

  const handleInputChange = (event) => {
    const rawValue = event.target.value;
    const cleanedValue = rawValue.replace(/\D/g, '');
    if (cleanedValue !== '') {
      const number = Number(cleanedValue) * 4;
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
      <Select setPage={(e) => setPage(false)} />
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