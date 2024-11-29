"use client"
import './styles.css'
import { DownSvg, WalletSvg } from '../../utils/svg'
import { Tokeninput } from './components/Tokeninput/Tokeninput'
import { Header } from './components/Heade/Hearder'
import { SelectToken } from './components/SelectToken/SelectToken'
const Swap = () => {

  return <div className='main'>
    <Header />
    <div className='TokeninputWrapper'>
      <Tokeninput />
      <div className='swapDirectionArrow'>
        <DownSvg />
      </div>
      <SelectToken />
    </div>
    <div>
      <button className='button'>
        <WalletSvg /> Connect wallet
      </button>
    </div>
  </div>
}

export default Swap