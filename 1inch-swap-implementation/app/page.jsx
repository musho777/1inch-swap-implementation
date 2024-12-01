"use client"
import Swap from './Swap'
import SelectDestinationToken from './SelectDestinationToken/index'
import { useCallback, useEffect, useState } from 'react';
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
  const [active, setActive] = useState(1)
  const [page, setPage] = useState(true)
  const [data, setData] = useState([]);
  const [prices, setPrices] = useState(0)

  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible)
  };

  const Select = (e) => {
    let item = [...selectedToken]
    item[active] = e
    setSelectedToken(item)
  }




  const GetPrice = async (token, type) => {
    try {
      const response = await fetch(`/1inch.dev/price/v1.1/1?currency=USD`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer oYtJS37LUR9zy6jylTaeVKlpGZrRffE9',
        },
      });
      const result = await response.json();
      setPrices(result)
    } catch (err) {
    } finally {
    }
  };


  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("/1inch.dev/token/v1.2/multi-chain", {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer oYtJS37LUR9zy6jylTaeVKlpGZrRffE9',
        },
      });
      const result = await response.json();
      setData(result || []);
    } catch (err) {
    } finally {
    }
  }, []);

  useEffect(() => {
    GetPrice()
    fetchData();
  }, []);


  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className='connetWalletWrapper' id={isVisible ? "connetWallet" : ''}>
        <ConnetWallet handleClick={() => handleClick()} />
      </div>
      <div className='page'>
        <Swap
          price1={prices[selectedToken[0]?.address]}
          price2={prices[selectedToken[1]?.address] ? prices[selectedToken[1]?.address] : 0}
          setActive={(e) => setActive(e)}
          selectedToken={selectedToken}
          handleClick={() => handleClick()}
          setPage={(e) => setPage(e)}
        />
        <SelectDestinationToken
          data={data}
          setSelectedToken={(e) => {
            Select(e)
            setPage(true)
          }} setPage={(e) => setPage(e)} />
      </div>
    </Web3ReactProvider>
  );
}
