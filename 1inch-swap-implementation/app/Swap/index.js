"use client"
import './styles.css'
import { Tokeninput } from './components/Tokeninput/Tokeninput'
import { Header } from './components/Heade/Hearder'
import { useEffect, useState } from 'react'
import { ArrowIcon, DownSvg, Gasolin, WalletSvg } from '../utils/svg'

const Swap = ({
  setPage,
  handleClick,
  selectedToken,
  setActive,
  price1,
  price2,
  loading,
  GetPrice,
  ChangeDirection
}) => {
  const [connected, setConnected] = useState()
  const [inputValue, setInputValue] = useState("");
  const [res, setRes] = useState(0)
  const [value, setValue] = useState(1)
  const [isRotated, setIsRotated] = useState(false);

  async function connectWallet1() {
    if (typeof window.ethereum !== "undefined") {
      try {
        window.ethereum.request({ method: 'eth_requestAccounts' })
          .then(accounts => {
            if (accounts.length > 0) {
              setConnected(true)
            } else {
            }
          })
          .catch(error => {
          });
      } catch (error) {
        setConnected(false)
      }
    } else {
      setConnected(false)
    }
  }





  useEffect(() => {
    connectWallet1()
  }, [])

  useEffect(() => {
    if (price2 == 0) {
      setRes(0)
    }
    else {
      setRes(value * price1 / price2)
    }
  }, [price1, price2])

  const Change = (e) => {
    setValue(e)
    setRes(price1 / price2 * e)
  }
  return <div className='main'>
    <Header GetPrice={() => GetPrice()} />
    <div className='TokeninputWrapper'>
      <Tokeninput
        inputValue={inputValue}
        setInputValue={(e) => setInputValue(e)}
        price={price1}
        length={false}
        Change={(e) => Change(e)}
        selectedToken={selectedToken[0]}
        setPage={(e) => {
          setPage(false)
          setActive(0)
        }} />
      <div
        style={{
          display: "inline-block",
          cursor: "pointer",
          transform: isRotated ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease",
        }}
        onClick={() => {
          ChangeDirection()
          setInputValue(res)
          setRes(res * 3)
          setIsRotated(!isRotated)
        }}
        className='swapDirectionArrow'
      >
        <DownSvg />
      </div>
      <Tokeninput
        res={(res && res != 'Infinity') ? res : ""}
        inputValue={inputValue}
        setInputValue={(e) => setInputValue(e)}
        selectedToken={selectedToken[1]}
        loading={loading}
        price2={price2}
        Change={(e) => Change(e)}
        second={true}
        setPage={(e) => {
          setPage(false)
          setActive(1)
        }} />
    </div>
    <div className='accardion'>
      <div className='accardionItem'>
        <div className='valuesWrapper'>
          <p>1 Baby Doge <span>=</span> 0.000000000000770732  <span>~$0</span> </p>
        </div>
        <div className='valuesWrapper'>
          <Gasolin />
          <p><span>~$16.26</span></p>
          <ArrowIcon />
        </div>
      </div>
    </div>
    <div>
      {connected ?
        <button disabled id='connectedButton' className='button'>
          Swap
        </button> :
        <button onClick={() => handleClick()} className='button'>
          <WalletSvg /> Connect wallet
        </button>
      }
    </div>
  </div>
}

export default Swap