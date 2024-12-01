import { ClearSvg, Logo, WalletSvg } from '@/app/utils/svg'
import './styles.css'
export const ConnetWallet = ({ handleClick }) => {
  return <div className='connetWallet'>
    <div className='connetWalletHeader'>
      <p>Connect wallet</p>
      <div onClick={() => handleClick()} className='connetWalletClose'>
        <ClearSvg color='white' size="30px" />
      </div>
    </div>
    <div className='walletItemWrapper'>
      <div className='walletItem'>
        <Logo />
        <p>1inch Wallet </p>
      </div>
      <div className='walletItem'>
        <Logo />
        <p>1inch Wallet </p>
      </div>
      <div className='walletItem'>
        <Logo />
        <p>1inch Wallet </p>
      </div>
      <div className='walletItem'>
        <Logo />
        <p>1inch Wallet </p>
      </div>
      <div className='walletItem'>
        <Logo />
        <p>1inch Wallet </p>
      </div>
      <div className='walletItem'>
        <Logo />
        <p>1inch Wallet </p>
      </div>
    </div>
    <div className='moreWallet'>
      <WalletSvg />
      <p>More wallets </p>
    </div>
    <div className='termsofuse'>
      <p>By connecting your wallet, you agree to our</p> <span>&nbsp;</span>
      <span>Terms of Use</span>
      <span>&nbsp;</span>
      and
      <span>&nbsp;</span>
      <span>Privacy Policy</span>
    </div>
  </div>
}