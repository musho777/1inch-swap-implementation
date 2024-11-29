import './styles.css'
import { DownSvg, FiltrSvg, WalletSvg } from '../Components/svg'
import { Refresh } from '../Components/svg'
import { Tokeninput } from './Tokeninput/Tokeninput'
import { SelectToken } from './SelectToken/SelectToken'
import { Select } from './select/Select'
const Swap = () => {
  return <div className='main'>
    <div className='header'>
      <div className='headerTabs'>
        <p className='swapP'>Swap</p>
        <p className='limitL' >Limit</p>
      </div>
      <div className='headerActions'>
        <Refresh />
        <FiltrSvg />
      </div>
    </div>
    <div className='TokeninputWrapper'>
      <Tokeninput />
      <div className='swapDirectionArrow'>
        <DownSvg />
      </div>
      <SelectToken />
    </div>
    <div>
      <button className='button'>
        <WalletSvg />
        Connect wallet
      </button>
    </div>
  </div>
}

export default Swap