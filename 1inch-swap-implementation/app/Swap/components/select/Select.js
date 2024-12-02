import { ArrowSvg } from '@/app/utils/svg'

export const Select = ({ setPage, img, name, second }) => {
  return <div onClick={() => setPage(false)} id={second ? 'selectWrapper' : ''} className='selectWrapper'>
    <div className='selectWrapperImg'>
      <img src={img} />
      <div className='network_logo'>
        <img src='https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png' />
      </div>
    </div>
    <div className='selectItem'>
      <div >
        <p>{name}</p>
        <ArrowSvg />
      </div>
      <p>on Ethereum</p>
    </div>
  </div>
}