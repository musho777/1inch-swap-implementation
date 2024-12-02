"use client"
import Swap from './Swap'
import SelectDestinationToken from './SelectDestinationToken/index'
import { useEffect, useState } from 'react';
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { ConnetWallet } from './Components/ConnectWallet/index'
export default function Home() {
  function getLibrary(provider) {
    return new Web3Provider(provider);
  }

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
  const [active, setActive] = useState(0)
  const [page, setPage] = useState(true)
  const [data, setData] = useState([]);
  const [price1, setPrice1] = useState()
  const [price2, setPrice2] = useState()

  const [loading, setLoading] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState([
    {
      img: 'https://app.1inch.io/assets/images/network-logos/ethereum.svg',
      id: 1,
      name: 'Ethereum',
    },
    {
      img: 'https://app.1inch.io/assets/images/network-logos/ethereum.svg',
      id: 1,
      name: 'Ethereum',
    }
  ])
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible)
  };

  const Select = (e) => {
    let item = [...selectedToken]
    item[active] = e
    GetPrice(selectedNetwork[active].id, e.address, active)
    setSelectedToken(item)
  }



  const GetPrice = async (network, token, type) => {
    setLoading(true)
    try {
      const response = await fetch(`/1inch.dev/price/v1.1/${network}/${token}?currency=USD`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer oYtJS37LUR9zy6jylTaeVKlpGZrRffE9',
        },
      });
      const result = await response.json();
      setLoading(false)
      if (type == 0) {
        setPrice1(Object.values(result))
      }
      else {
        setPrice2(Object.values(result))
      }
    } catch (err) {
    } finally {
    }
  };


  const getTokens = async (id = 1) => {
    try {
      const response = await fetch(`/1inch.dev/token/v1.2/${id}`, {
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
  };

  const networks = [
    {
      img: 'https://app.1inch.io/assets/images/network-logos/ethereum.svg',
      id: 1,
      name: 'Ethereum',
    },
    {
      img: 'https://app.1inch.io/assets/images/network-logos/bsc_2.svg',
      id: 56,
      name: 'BNB Chain',

    },
    {
      img: 'https://app.1inch.io/assets/images/network-logos/polygon_1.svg',
      id: 137,
      name: 'Polygon',

    },
    {
      img: 'https://app.1inch.io/assets/images/network-logos/gnosis.svg',
      id: 100,
      name: 'Gnosis Chain',

    },
    {
      img: 'https://app.1inch.io/assets/images/network-logos/avalanche.svg',
      id: 43114,
      name: 'Avalanche',

    },
    {
      img: 'https://app.1inch.io/assets/images/network-logos/fantom.svg',
      id: 250,
      name: 'Fantom',

    },
    {
      img: 'https://app.1inch.io/assets/images/network-logos/aurora.svg',
      id: 1313161554,
      name: 'Aurora',

    },
    {
      img: 'https://app.1inch.io/assets/images/network-logos/kaia.svg',
      id: 42161,
      name: 'Kaia',
    },
  ]


  useEffect(() => {
    const timeout = setTimeout(() => {
      GetPrice(selectedNetwork[0].id, selectedToken[0]?.address, 0)
    }, 1000);
    const timeout2 = setTimeout(() => {
      if (selectedToken[1]?.address) {
        GetPrice(selectedNetwork[1].id, selectedToken[1]?.address, 1)
      }
    }, 3000);
    const timeout3 = setTimeout(() => {
      getTokens(1);
    }, 5000);
    return () => {
      clearTimeout(timeout)
      clearTimeout(timeout2)
      clearTimeout(timeout3)
    };
  }, []);



  const ChangeDirection = () => {
    let item = [selectedToken[1], selectedToken[0]]
    setSelectedToken(item)
  }

  const SelectNetwork = (e) => {
    let item = [...selectedNetwork]
    item[active] = e
    setSelectedNetwork(item)
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className='connetWalletWrapper' id={isVisible ? "connetWallet" : ''}>
        <ConnetWallet isVisible={isVisible} handleClick={() => handleClick()} />
      </div>
      <div >
        {/* <SwapComponent /> */}
      </div>
      <div className='page'>
        {page ?
          <Swap
            GetPrice={() => GetPrice()}
            loading={loading}
            price1={price1}
            price2={price2 ? price2 : 0}
            setActive={(e) => setActive(e)}
            selectedToken={selectedToken}
            selectedNetwork={selectedNetwork}
            handleClick={() => handleClick()}
            setPage={(e) => setPage(e)}
            ChangeDirection={() => ChangeDirection()}
          /> :
          <SelectDestinationToken
            networks={networks}
            getTokens={(e) => getTokens(e)}
            selectedNetwork={selectedNetwork[active]}
            data={data}
            setSelectedNetwork={(e) => SelectNetwork(e)}
            setSelectedToken={(e) => {
              Select(e)
              setPage(true)
            }}
            setPage={(e) => setPage(e)}
          />
        }
      </div>
    </Web3ReactProvider>
  );
}
