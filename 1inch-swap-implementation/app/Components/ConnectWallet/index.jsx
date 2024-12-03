import { ClearSvg, Logo, MetaMask, WalletSvg } from '@/app/utils/svg'
import './styles.css'
import { ethers } from "ethers";
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

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
  const { activate, account } = useWeb3React();

  console.error(account)

  const connectWallet = async () => {
    const injected = new InjectedConnector({
      supportedChainIds: [1, 3, 4, 5, 42],
    });
    try {
      console.log(account)
      await activate(injected); // Activates the injected provider (e.g., MetaMask)
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };


  return <div className='connetWallet'>
    <div className='connetWalletHeader'>
      <p>Connect wallet</p>
      <div onClick={() => handleClick()} className='connetWalletClose'>
        <ClearSvg color='white' size="30px" />
      </div>
    </div>
    <div className='walletItemWrapper'>
      <div onClick={() => connectWallet()} className='walletItem'>
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