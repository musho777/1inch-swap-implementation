import { ClearSvg, Logo, MetaMask, WalletSvg } from '@/app/utils/svg'
import './styles.css'
import { ethers } from "ethers";
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';

export const ConnetWallet = ({ handleClick, isVisible, setConnected }) => {

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // Define WalletConnect package
      options: {
        infuraId: 'YOUR_INFURA_PROJECT_ID', // Replace with your Infura Project ID
      },
    },
  };

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: false, // Optional: Cache provider for reconnecting later
        providerOptions, // WalletConnect options
      });

      // Open Web3Modal and wait for user to select a provider
      const instance = await web3Modal.connect();

      // Create a Web3 provider using ethers.js
      const ethersProvider = new ethers.providers.Web3Provider(instance);
      setProvider(ethersProvider);

      // Get user's wallet address
      const signer = ethersProvider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);

      console.log('Connected wallet:', address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  async function connectWallet1() {
    if (isVisible)
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          if (accounts) {
            handleClick()
            setConnected(true)
          }
          const networkId = await window.ethereum.request({
            method: "net_version",
          });


          window.ethereum.on("accountsChanged", (newAccounts) => {
            handleClick()
            setConnected(true)
          });

          window.ethereum.on("chainChanged", (chainId) => {
            handleClick()
            setConnected(true)
          });

        } catch (error) {
          setConnected(false)
          console.error("Connection failed:", error);
        }
      } else {
        setConnected(false)
        console.error("Metamask is not installed. Please install it to continue.");
      }
  }
  const { activate, account } = useWeb3React();

  const connectWalletConnect = async () => {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: false, // Optional: Cache provider for reconnecting later
        providerOptions, // WalletConnect options
      });

      // Open Web3Modal and wait for user to select WalletConnect provider
      const instance = await web3Modal.connect();
      const ethersProvider = new ethers.providers.Web3Provider(instance);
      setProvider(ethersProvider);

      // Get user's wallet address
      const signer = ethersProvider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);

      console.log('Connected with WalletConnect:', address);
    } catch (error) {
      console.error('Error connecting to WalletConnect:', error);
    }
  };


  const connectMetaMask = async () => {
    try {
      if (window.ethereum) {
        const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' }); // Prompt user to connect MetaMask
        const signer = ethersProvider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setProvider(ethersProvider);
        console.log('Connected to MetaMask:', address);
      } else {
        console.log('MetaMask is not installed');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };


  // const connectWallet = async () => {
  //   const injected = new InjectedConnector({
  //     supportedChainIds: [1, 3, 4, 5, 42],
  //   });
  //   try {
  //     await activate(injected);
  //     setConnected(true)
  //   } catch (error) {
  //     setConnected(false)
  //     console.error('Error connecting wallet:', error);
  //   }
  // };


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