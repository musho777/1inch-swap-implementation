import './styles.css'
import { CheckSvg } from '@/app/utils/svg'
export const SelectNetWork = ({ openSelect, getTokens, networks, selectedNetwork, setSelectedNetwork }) => {
  return <div className='selectNetWork'>
    {openSelect && networks.map((elm, i) => {
      return <div key={i} onClick={() => {
        setSelectedNetwork(elm)
        getTokens(elm.id)
      }} className='selectNetWorkItemWrapper'>
        <div className='selectNetWorkItem'>
          <img src={elm.img} />
          <p>{elm.name}</p>
        </div>
        {elm.id == selectedNetwork.id && <CheckSvg />}
      </div>
    })}
  </div>
}