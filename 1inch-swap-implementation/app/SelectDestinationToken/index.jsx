import './styles.css';
import { FavouriteToken } from './components/favouriteToken/favouriteToken';
import { TokenItem } from './components/tokenItem/tokenItem';
import { BackSvg, ButtonArrow, ClearSvg, SearchSvg } from '@/app/utils/svg';
import { useState } from 'react';



const SelectDestinationToken = ({ setPage, setSelectedToken, data }) => {
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

  return (
    <div className="main" id="selectDestinationToken">
      <div className="selectTokenHeader">
        <div onClick={() => setPage(true)} className="selectTokenHeaderBack">
          <BackSvg />
        </div>
        <div className="allNetworks">
          <img src="https://app.1inch.io/assets/images/network-logos/all-networks.svg" alt="All networks" />
          <p>All networks</p>
          <ButtonArrow color="#fff" />
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
          data.map((elm, index) => {
            if (index == 2) {
              console.log(elm)
            }
            const { name = 'Unnamed Token', logoURI = 'default-logo.png' } = elm || {};
            if (elm.isFoT)
              return <div key={`token-${index}`} onClick={() => setSelectedToken(elm)}>
                <TokenItem name={name} logo={logoURI} />
              </div>
          })}
      </div>
    </div>
  );
};

export default SelectDestinationToken;
