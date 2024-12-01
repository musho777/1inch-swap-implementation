"use client"
import './styles.css'
import { DownSvg, WalletSvg } from '../../utils/svg'
import { Tokeninput } from './components/Tokeninput/Tokeninput'
import { Header } from './components/Heade/Hearder'
import { useEffect, useState } from 'react'

const Swap = ({ setPage, handleClick, selectedToken, selectedToken1, setActive }) => {
  const [connected, setConnected] = useState()
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


  return <div className='main'>
    <Header />
    <div className='TokeninputWrapper'>
      <Tokeninput selectedToken={selectedToken[0]} setPage={(e) => {
        setPage(false)
        setActive(0)
      }} />
      <div className='swapDirectionArrow'>
        <DownSvg />
      </div>
      <Tokeninput selectedToken={selectedToken[1]} second={true} setPage={(e) => {
        setPage(false)
        setActive(1)
      }} />
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