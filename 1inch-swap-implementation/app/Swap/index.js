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
  ChangeDirection,
  active,
  networks
}) => {

  const [connected, setConnected] = useState()
  const [value1, setValue1] = useState(1)
  const [value2, setValue2] = useState()
  const [kayf, setKayf] = useState(2)

  const [isRotated, setIsRotated] = useState(false);

  useEffect(() => {
    let kayficent = price1 / price2
    setKayf(kayficent)
    setValue2(value1 * kayficent)
  }, [price1, price2])



  const Change = (e) => {
    setValue1(e)
    setValue2(e * kayf)
  }

  return <div className='main'>
    <Header GetPrice={() => GetPrice()} />
    <div className='TokeninputWrapper'>
      <Tokeninput
        inputValue={value1}
        price={price1}
        result={value1 * price1}
        Change={(e) => Change(e)}
        selectedNetwork={networks.find(item => item.id === selectedToken[0].chainId)}
        active={active}
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
          setKayf(1 / kayf)
          ChangeDirection()
          setValue1(value2)
          setValue2(value1)
          setIsRotated(!isRotated)
        }}
        className='swapDirectionArrow'
      >
        <DownSvg />
      </div>
      <Tokeninput
        inputValue={value2 || ""}
        selectedToken={selectedToken[1]}
        loading={loading}
        selectedNetwork={networks.find(item => item.id === selectedToken[0].chainId)}
        result={value2 * price2}
        price2={price2}
        active={active}
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