"use client"
import { useState } from 'react';
import './styles.css'
import { Select } from '../select/Select'
import { ButtonArrow } from '@/app/utils/svg';

export const Tokeninput = ({ setPage, second, selectedToken, Change, price, res }) => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("")

  const handleInputChange = (event) => {
    const rawValue = event?.target?.value;
    const cleanedValue = rawValue.replace(/\D/g, '');
    Change(Number(cleanedValue))
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
        value={!second ? inputValue : res}
        onChange={handleInputChange}
      />
    </div>
    <div className='result'>
      <p id="selectedName">{selectedToken?.name}</p>
      {result && <p>~${result}</p>}
    </div>
  </div>
}