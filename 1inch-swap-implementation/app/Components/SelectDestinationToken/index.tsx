import './styles.css';
import { FavouriteToken } from './components/favouriteToken/favouriteToken';
import { TokenItem } from './components/tokenItem/tokenItem';
import { BackSvg, ButtonArrow, ClearSvg, SearchSvg } from '@/app/utils/svg';
import { useEffect, useState, useCallback, useMemo } from 'react';

interface SwapProps {
  setPage: (e: boolean) => void;
}

const SelectDestinationToken = ({ setPage }: SwapProps) => {
  const [data, setData] = useState<any[]>([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/1inch.dev/token/v1.2/multi-chain", {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer oYtJS37LUR9zy6jylTaeVKlpGZrRffE9',
        },
      });
      const result = await response.json();
      setData(result || []);
    } catch (err) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  }, []);

  const searchData = useCallback(
    async (query: string) => {
      setValue(query);
      // if (!query) {
      //   fetchData();
      //   return;
      // }

      // setLoading(true);
      // setError(null);

      // try {
      //   const response = await fetch(
      //     `/1inch.dev/token/v1.2/search?limit=20&only_positive_rating=true&query=${query}`,
      //     {
      //       method: 'GET',
      //       headers: {
      //         accept: 'application/json',
      //         Authorization: 'Bearer oYtJS37LUR9zy6jylTaeVKlpGZrRffE9',
      //       },
      //     }
      //   );
      //   const result = await response.json();
      //   setData(result || []);
      // } catch (err) {
      //   // setError("Failed to search tokens.");
      // } finally {
      //   // setLoading(false);
      // }
    },
    [fetchData]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const tokenItems = useMemo(
    () =>
      data.map((elm: any, index: number) => {
        const { name = 'Unnamed Token', logoURI = 'default-logo.png' } = elm || {};
        return <TokenItem key={`token-${index}`} name={name} logo={logoURI} />;
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
