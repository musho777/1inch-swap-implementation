"use client"
import { useState } from 'react';
import './styles.css'
import { Select } from '../select/Select'
import { SetPage } from '@/app/types/types';

interface TokeninputProps {
  setPage: SetPage;
}
export const Tokeninput: React.FC<TokeninputProps> = ({ setPage }) => {

  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("")

  const handleInputChange = (event: any) => {
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