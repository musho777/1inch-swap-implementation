"use client"
import './styles.css'
import { DownSvg, WalletSvg } from '../../utils/svg'
import { Tokeninput } from './components/Tokeninput/Tokeninput'
import { Header } from './components/Heade/Hearder'
import { SelectToken } from './components/SelectToken/SelectToken'
import { useEffect, useState } from 'react'
import { useSwap1Inch } from '@/hooks/one-inch'

const Swap = ({ setPage, handleClick }) => {

  const { swap1Inch } = useSwap1Inch() || {};

  const handleSwap = async () => {
    try {
      const response = await swap1Inch();
      // Handle the response, e.g., show the transaction hash or success message to the user
    } catch (error) {
      console.error("Swap failed:", error);
      // Handle error, e.g., show error message to the user
    }
  };

  useEffect(() => {
    handleSwap()
  }, [])


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
      <Tokeninput setPage={(e) => setPage(false)} />
      <div className='swapDirectionArrow'>
        <DownSvg />
      </div>
      <Tokeninput setPage={(e) => setPage(false)} />
      {/* <SelectToken setPage={(e) => setPage(false)} /> */}
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