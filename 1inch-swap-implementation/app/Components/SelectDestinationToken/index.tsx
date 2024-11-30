import './styles.css'
import { SearchInput } from './components/searchInput/searchInput'
import { FavouriteToken } from './components/favouriteToken/favouriteToken'
import { TokenItem } from './components/tokenItem/tokenItem'
import { BackSvg, ButtonArrow } from '@/app/utils/svg'

interface SwapProps {
  setPage: (e: boolean) => void; // Define the type for setPage
}

const SelectDestinationToken = ({ setPage }: SwapProps) => {
  return <div className="main" id="selectDestinationToken">
    <div className='selectTokenHeader'>
      <div onClick={() => setPage(true)} className='selectTokenHeaderBack'>
        <BackSvg />
      </div>
      <div className='allNetworks'>
        <img src='https://app.1inch.io/assets/images/network-logos/all-networks.svg' />
        <p>All networks</p>
        <ButtonArrow color={"#fff"} />
      </div>
    </div>
    <div className='selectDestinationToken'>
      <SearchInput />
      <div className='favouriteTokenWrapper'>
        <FavouriteToken />
        <FavouriteToken />
        <FavouriteToken />
        <FavouriteToken />
        <FavouriteToken />
        <FavouriteToken />
        <FavouriteToken />
      </div>
    </div>
    <div className='TokenItemWrapper'>
      <TokenItem />
      <TokenItem />
      <TokenItem />
      <TokenItem />
      <TokenItem />
      <TokenItem />
      <TokenItem />
      <TokenItem />
      <TokenItem />
      <TokenItem />
      <TokenItem />
      <TokenItem />
      <TokenItem />
      <TokenItem />
    </div>
  </div>
}


export default SelectDestinationToken 
