import { ClearSvg, Logo, MetaMask, WalletSvg } from '@/app/utils/svg'
import './styles.css'
import { ethers } from "ethers";

export const ConnetWallet = ({ handleClick, isVisible }) => {


  async function connectWallet1() {
    if (isVisible)
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          if (accounts) {
            handleClick()
          }
          const networkId = await window.ethereum.request({
            method: "net_version",
          });


          window.ethereum.on("accountsChanged", (newAccounts) => {
            handleClick()
          });

          window.ethereum.on("chainChanged", (chainId) => {
            handleClick()
          });

        } catch (error) {
          console.error("Connection failed:", error);
        }
      } else {
        console.error("Metamask is not installed. Please install it to continue.");
      }
  }


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
      <div onClick={() => connectWallet1()} className='walletItem'>
        <MetaMask />
        <p>Meta Mask</p>
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