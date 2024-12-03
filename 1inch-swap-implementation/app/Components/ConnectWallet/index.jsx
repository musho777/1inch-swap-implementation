import { ClearSvg, Logo, MetaMask, WalletSvg } from '@/app/utils/svg'
import './styles.css'
import { ethers } from "ethers";
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import { Connect } from '@/config/Connect';
import { useAccount } from 'wagmi';

export const ConnetWallet = ({ handleClick, setConnected }) => {

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // Define WalletConnect package
      options: {
        infuraId: process.env.NEXT_PUBLIC_API_INFURAID, // Replace with your Infura Project ID
      },
    },
  };

  const { isConnected } = useAccount();
  console.log(isConnected, '10000000')

  const connectAllWallet = async () => {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: false, // Optional: Cache provider for reconnecting later
        providerOptions, // WalletConnect options
      });

      // Open Web3Modal and wait for user to select a provider
      const instance = await web3Modal.connect();

      // Create a Web3 provider using ethers.js
      const ethersProvider = new ethers.providers.Web3Provider(instance);
      const signer = ethersProvider.getSigner();
      const address = await signer.getAddress();

      console.log('Connected wallet:', address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const { activate, account } = useWeb3React();

  const connectWallet = async () => {
    const injected = new InjectedConnector({
      supportedChainIds: [1, 3, 4, 5, 42],
    });
    try {
      await activate(injected);
      setConnected(true)
    } catch (error) {
      setConnected(false)
      console.error('Error connecting wallet:', error);
    }
  };


  return <div className='connetWallet'>
    <div className='connetWalletHeader'>
      <Connect />
      <p>Connect wallet</p>
      <div onClick={() => handleClick()} className='connetWalletClose'>
        <ClearSvg color='white' size="30px" />
      </div>
    </div>
    <div className='walletItemWrapper'>
      <div onClick={() => connectAllWallet()} className='walletItem'>
        <Logo />
        <p>1inch Wallet </p>
      </div>
      <div onClick={() => connectWallet()} className='walletItem'>
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