import './styles.css'
import '../Tokeninput/styles.css'
import { ButtonArrow } from '../../../../utils/svg'
export const SelectToken = () => {
  return <div className="tokeninput selectToken">
    <div className='selectTokenDiv'>
      <div>
        <button className='selectButton'>
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