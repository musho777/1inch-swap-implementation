import Swap from './Components/Swap/Swap'
import SelectDestinationToken from './Components/SelectDestinationToken/index'

export default function Home() {
  return (
    <div className='page'>
      {/* <Swap /> */}
      <SelectDestinationToken />
    </div>
  );
}
