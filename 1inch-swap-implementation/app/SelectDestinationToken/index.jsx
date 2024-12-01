import './styles.css';
import { FavouriteToken } from './components/favouriteToken/favouriteToken';
import { TokenItem } from './components/tokenItem/tokenItem';
import { BackSvg, ButtonArrow, ClearSvg, SearchSvg } from '@/app/utils/svg';
import { useState, useMemo } from 'react';



const SelectDestinationToken = ({ setPage, setSelectedToken, data }) => {
  const [value, setValue] = useState("");

  const tokenItems = useMemo(
    () =>
      data.map((elm, index) => {
        const { name = 'Unnamed Token', logoURI = 'default-logo.png' } = elm || {};
        return <div onClick={() => setSelectedToken(elm)}>
          <TokenItem key={`token-${index}`} name={name} logo={logoURI} />
        </div>
      }),
    [data]
  );

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
          {Array(7)
            .fill(null)
            .map((_, index) => (
              <FavouriteToken key={index} />
            ))}
        </div>
      </div>
      <div className="TokenItemWrapper">
        {tokenItems}
      </div>
    </div>
  );
};

export default SelectDestinationToken;
