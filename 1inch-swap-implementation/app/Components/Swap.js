"use client"
import './styles.css'
import { DownSvg, WalletSvg } from '../Components/svg'
import { Tokeninput } from './Tokeninput/Tokeninput'
import { SelectToken } from './SelectToken/SelectToken'
import { useState } from 'react'
import { Header } from './Heade/Hearder'
const Swap = () => {

  return <div className='main'>
    <Header />
    <div className='TokeninputWrapper'>
      <Tokeninput />
      <div className='swapDirectionArrow'>
        <DownSvg />
      </div>
      <SelectToken />
    </div>
    <div>
      <button className='button'>
        <WalletSvg /> Connect wallet
      </button>
    </div>
  </div>
}

export default Swap