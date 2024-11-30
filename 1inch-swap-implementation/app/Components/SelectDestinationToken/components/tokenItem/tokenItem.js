import './styles.css'
import { PinIcon } from '../../../../utils/svg'
export const TokenItem = () => {
  return <div className='tokenItem'>
    <div className='tokenItemImg'>
      <img src='https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png' />
      <div className='TokenInfo'>
        <p className='TokenInfoName'>Ether</p>
        <p className='TokenInfoP'>0 ETH  · 7 networks</p>
      </div>
    </div>
    <div className='tokenItemPrice'>
      <p>$0</p>
      <PinIcon />
    </div>
  </div>
}