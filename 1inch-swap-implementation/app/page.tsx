"use client"
import Swap from './Components/Swap/Swap'
import SelectDestinationToken from './Components/SelectDestinationToken/index'
import { useState } from 'react';
import SwapComponent from './Components/SwapComponent'
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from 'web3'


export default function Home() {
  const getLibrary = (provider: any) => {
    if (!provider) {
      console.error("Provider is not available");
      return null;
    }
    console.log(provider, 'provider');
    return new Web3(provider);
  };
  const [page, setPage] = useState(true)
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className='page'>
        <SwapComponent />
        {page ?
          <Swap setPage={(e) => setPage(e)} /> :
          <SelectDestinationToken setPage={(e) => setPage(e)} />
        }
      </div>
    </Web3ReactProvider>
  );
}
