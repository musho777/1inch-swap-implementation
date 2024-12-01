import './styles.css'
import '../Tokeninput/styles.css'
import { ButtonArrow } from '../../../../utils/svg'

interface SwapProps {
  setPage: (e: boolean) => void; // Define the type for setPage
}
export const SelectToken = ({ setPage }: SwapProps) => {
  return <div className="tokeninput selectToken">
    <div className='selectTokenDiv'>
      <div>
        <button onClick={(e) => setPage(true)} className='selectButton'>
          Select a token
          <ButtonArrow />
        </button>
      </div>
      <input
        maxLength={19}
        className='input'
        disabled
        value={0}
      />
    </div>
  </div>
} 