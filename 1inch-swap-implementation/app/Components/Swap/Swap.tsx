"use client"
import './styles.css'
import { DownSvg, WalletSvg } from '../../utils/svg'
import { Tokeninput } from './components/Tokeninput/Tokeninput'
import { Header } from './components/Heade/Hearder'
import { SelectToken } from './components/SelectToken/SelectToken'
interface SwapProps {
  setPage: (e: boolean) => void; // Define the type for setPage
}

const Swap = ({ setPage }: SwapProps) => {
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
      <button className='button'>
        <WalletSvg /> Connect wallet
      </button>
    </div>
  </div>
}

export default Swap