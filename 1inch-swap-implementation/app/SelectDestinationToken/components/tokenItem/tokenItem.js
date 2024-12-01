import { PinIcon } from '@/app/utils/svg'
import './styles.css'
export const TokenItem = ({ logo, name }) => {
  return <div className='tokenItem'>
    <div className='tokenItemImg'>
      <img src={logo} />
      <div className='TokenInfo'>
        <p className='TokenInfoName'>{name}</p>
        <p className='TokenInfoP'>0 ETH  · 7 networks</p>
      </div>
    </div>
    <div className='tokenItemPrice'>
      <p>$0</p>
      <PinIcon />
    </div>
  </div>
}