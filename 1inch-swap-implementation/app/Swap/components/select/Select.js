import { ArrowSvg } from '@/app/utils/svg'

export const Select = ({ setPage, img, name, second, selectedNetwork }) => {
  return <div onClick={() => setPage(false)} id={second ? 'selectWrapper' : ''} className='selectWrapper'>
    <div className='selectWrapperImg'>
      <img src={img} />
      <div className='network_logo'>
        <img src={selectedNetwork?.img} />
      </div>
    </div>
    <div className='selectItem'>
      <div >
        <p>{name}</p>
        <ArrowSvg />
      </div>
      <p>on {selectedNetwork?.name}</p>
    </div>
  </div>
}