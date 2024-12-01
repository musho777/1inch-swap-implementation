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
    },
    {
      address: "0x3ffeea07a27fab7ad1df5297fa75e77a43cb5790",
      chainId: 1,
      decimals: 18,
      eip2612: false,
      isFoT: true,
      logoURI: "https://tokens-data.1inch.io/images/1/0x3ffeea07a27fab7ad1df5297fa75e77a43cb5790.png",
      name: "PeiPei",
      providers: [
        "1inch",
        "CoinGecko",
        "Kleros Tokens"
      ],
      symbol: "PEIPEI",
      tags: [
        "tokens"
      ]
    }
  ])
  const [active, setActive] = useState(1)
  const [page, setPage] = useState(true)
  const [data, setData] = useState([]);
  const [prices, setPrices] = useState(1)
  const [price1, setPrice1] = useState()
  const [price2, setPrice2] = useState()

  const [loading, setLoading] = useState(false)

  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible)
  };

  const Select = (e) => {
    let item = [...selectedToken]
    item[active] = e
    setSelectedToken(item)
  }


  console.log(selectedToken[1])

  const GetPrice = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/1inch.dev/price/v1.1/1?currency=USD`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer oYtJS37LUR9zy6jylTaeVKlpGZrRffE9',
        },
      });
      const result = await response.json();
      console.log(result, 'result')
      setLoading(false)
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

  useEffect(() => {
    console.log("++++++++++++")
    setPrice1(prices[selectedToken[0]?.address])
    setPrice2(prices[selectedToken[1]?.address])
  }, [prices, selectedToken[1]?.address])

  const ChangeDirection = () => {
    let item = [
      selectedToken[1],
      selectedToken[0]
    ]
    setSelectedToken(item)
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className='connetWalletWrapper' id={isVisible ? "connetWallet" : ''}>
        <ConnetWallet handleClick={() => handleClick()} />
      </div>
      <div className='page'>
        <Swap
          GetPrice={() => GetPrice()}
          loading={loading}
          price1={price1}
          price2={price2 ? price2 : 0}
          setActive={(e) => setActive(e)}
          selectedToken={selectedToken}
          handleClick={() => handleClick()}
          setPage={(e) => setPage(e)}
          ChangeDirection={() => ChangeDirection()}
        />
        {/* <SelectDestinationToken
          data={data}
          setSelectedToken={(e) => {
            Select(e)
            setPage(true)
          }} setPage={(e) => setPage(e)} /> */}
      </div>
    </Web3ReactProvider>
  );
}
