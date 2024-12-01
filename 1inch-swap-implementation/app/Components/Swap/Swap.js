"use client"
import './styles.css'
import { DownSvg, WalletSvg } from '../../utils/svg'
import { Tokeninput } from './components/Tokeninput/Tokeninput'
import { Header } from './components/Heade/Hearder'
import { SelectToken } from './components/SelectToken/SelectToken'
import { useEffect, useState } from 'react'

const Swap = ({ setPage, handleClick }) => {
  const [connected, setConnected] = useState()
  async function connectWallet1() {
    if (typeof window.ethereum !== "undefined") {
      try {
        window.ethereum.request({ method: 'eth_requestAccounts' })
          .then(accounts => {
            console.log(accounts, '20000-')
            if (accounts.length > 0) {
              setConnected(true)
            } else {
            }
          })
          .catch(error => {
            console.log(accounts, '20000-')
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
      <Tokeninput setPage={(e) => setPage(false)} />
      <div className='swapDirectionArrow'>
        <DownSvg />
      </div>
      <SelectToken setPage={(e) => setPage(false)} />
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