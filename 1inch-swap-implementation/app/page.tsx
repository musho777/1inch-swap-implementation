"use client"
import Swap from './Components/Swap/Swap'
import SelectDestinationToken from './Components/SelectDestinationToken/index'
import { useState } from 'react';
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from 'web3'
import { ConnetWallet } from './Components/ConnectWallet/index'

export default function Home() {
  const getLibrary = (provider: any) => {
    if (!provider) {
      return null;
    }
    return new Web3(provider);
  };
  const [SelectedToken, setSelectedToken] = useState()


  const [page, setPage] = useState(true)
  const [isVisible, setIsVisible] = useState(false);


  const handleClick = () => {
    setIsVisible(!isVisible)
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className='connetWalletWrapper' id={isVisible ? "connetWallet" : ''}>
        <ConnetWallet handleClick={() => handleClick()} />
      </div>
      <div className='page'>
        {page ?
          <Swap handleClick={() => handleClick()} setPage={(e) => setPage(e)} /> :
          <SelectDestinationToken setSelectedToken={(e) => setSelectedToken(e)} setPage={(e) => setPage(e)} />
        }
      </div>
    </Web3ReactProvider>
  );
}
