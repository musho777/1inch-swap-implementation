import './styles.css';
import { FavouriteToken } from './components/favouriteToken/favouriteToken';
import { TokenItem } from './components/tokenItem/tokenItem';
import { BackSvg, ButtonArrow, ClearSvg, SearchSvg } from '@/app/utils/svg';
import { useState } from 'react';
import { SelectNetWork } from '../Components/SelectNetwork/index'


const SelectDestinationToken = ({ setPage, setSelectedToken, data, getTokens, networks, selectedNetwork, setSelectedNetwork }) => {
  const [value, setValue] = useState("");

  const [arr, setArr] = useState([
    { name: "ETH" },
    { name: "WETH" },
    { name: "USDC" },
    { name: "DAI" },
    { name: "USDT" },
    { name: "WBTC" },
    { name: "1INCH" },
    { name: "BNB" },
  ])

  const [openSelect, setOpenSelect] = useState(false)
  return (
    <div className="main" id="selectDestinationToken">
      <div className="selectTokenHeader">
        <div onClick={() => setPage(true)} className="selectTokenHeaderBack">
          <BackSvg />
        </div>
        <div onClick={() => setOpenSelect(!openSelect)} className="allNetworks">
          <img src={selectedNetwork.img} alt="All networks" />
          <p>{selectedNetwork.name}</p>
          <ButtonArrow color="#fff" />
          <div className={!openSelect ? 'openSelect' : 'openSelect1'}>
            <SelectNetWork setSelectedNetwork={(e) => setSelectedNetwork(e)} selectedNetwork={selectedNetwork} networks={networks} getTokens={(e) => getTokens(e)} />
          </div>
        </div>
      </div>
      <div className="selectDestinationToken">
        <div className="searchInput">
          <div className="searchSvg">
            <SearchSvg />
          </div>
          {value && (
            <div onClick={() => searchData("")} className="clearSvg">
              <ClearSvg />
            </div>
          )}
          <input
            value={value}
            onChange={(e) => searchData(e.target.value)}
            placeholder="Search by name or paste address"
          />
        </div>
        <div className="favouriteTokenWrapper">
          {arr.map((elm, index) => (
            <FavouriteToken name={elm.name} key={index} />
          ))}
        </div>
      </div>
      <div key={1} className="TokenItemWrapper">
        {
          Object.entries(data).map(([address, elm]) => {
            const { name = 'Unnamed Token', logoURI = 'default-logo.png' } = elm || {};
            return <div key={`token-${address}`} onClick={() => setSelectedToken(elm)}>
              <TokenItem name={name} logo={logoURI} />
            </div>
          })}
      </div>
    </div>
  );
};

export default SelectDestinationToken;
