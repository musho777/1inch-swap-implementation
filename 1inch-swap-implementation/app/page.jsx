"use client"
import Swap from './Components/Swap/Swap'
import SelectDestinationToken from './Components/SelectDestinationToken/index'
import { useState } from 'react';
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from 'web3'
import { ConnetWallet } from './Components/ConnectWallet/index'

export default function Home() {
  const getLibrary = (provider) => {
    if (!provider) {
      return null;
    }
    return new Web3(provider);
  };

  const [selectedToken, setSelectedToken] = useState([
    {
      address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      chainId: 324,
      decimals: 18,
      eip2612: false,
      isFoT: false,
      logoURI: "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
      name: "Ether",
      providers: [
        "1inch",
        "Curve Token List"
      ],
      symbol: "ETH",
      tags: [
        "GROUP:ETH",
        "native",
        "PEG:ETH"
      ]
    }],
    {}
  )
  const [active, setActive] = useState(0)
  const [page, setPage] = useState(true)
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible)
  };

  const Select = (e) => {
    let item = [...selectedToken]
    item[active] = e
    setSelectedToken(item)
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className='connetWalletWrapper' id={isVisible ? "connetWallet" : ''}>
        <ConnetWallet handleClick={() => handleClick()} />
      </div>
      <div className='page'>
        {page ?
          <Swap setActive={(e) => setActive(e)} selectedToken={selectedToken} handleClick={() => handleClick()} setPage={(e) => setPage(e)} /> :
          <SelectDestinationToken setSelectedToken={(e) => {
            Select(e)
            setPage(true)
          }} setPage={(e) => setPage(e)} />
        }
      </div>
    </Web3ReactProvider>
  );
}
