import { ArrowSvg } from "../svg"

export const Select = () => {
  return <div className='selectWrapper'>
    <div className='selectWrapperImg'>
      <img src='https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png' />
      <div className='network_logo'>
        <img src='https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png' />
      </div>
    </div>
    <div className='selectItem'>
      <div >
        <p>ETH</p>
        <ArrowSvg />
      </div>
      <p>on Ethereum</p>
    </div>
  </div>
}