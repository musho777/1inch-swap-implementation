import './styles.css'
import { CheckSvg } from '@/app/utils/svg'
export const SelectNetWork = ({ getTokens, networks, selectedNetwork, setSelectedNetwork }) => {
  return <div className='selectNetWork'>
    {networks.map((elm, i) => {
      return <div onClick={() => {
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