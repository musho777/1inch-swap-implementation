"use client"
import Swap from './Components/Swap/Swap'
import SelectDestinationToken from './Components/SelectDestinationToken/index'
import { useState } from 'react';
import SwapComponent from './Components/SwapComponent'
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from 'web3'
import { ConnetWallet } from './Components/ConnectWallet/index'
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";

export default function Home() {
  const getLibrary = (provider: any) => {
    if (!provider) {
      console.error("Provider is not available");
      return null;
    }
    return new Web3(provider);
  };



  const [page, setPage] = useState(true)
  const [isVisible, setIsVisible] = useState(false);


  const handleClick = () => {
    console.log("-2993")
    setIsVisible(!isVisible)
  };
  async function connectWallet() {
    // Initialize WalletConnect provider
    const provider = new WalletConnectProvider({
      rpc: {
        1: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID", // Replace with your Infura project ID
      },
    });
    try {
      await provider.enable();
      const accounts = provider.accounts;
      console.log("Connected accounts:", accounts);
    } catch (error) {
      console.error("Connection failed:", error);
    }
  }

  async function connectWallet1() {
    // Check if Metamask is installed
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request accounts from Metamask
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log("Connected accounts:", accounts);

        // Optional: Get the currently selected network
        const networkId = await window.ethereum.request({
          method: "net_version",
        });

        console.log("Connected network ID:", networkId);

        // Optional: Add a listener for account or network changes
        window.ethereum.on("accountsChanged", (newAccounts) => {
          console.log("Accounts changed:", newAccounts);
        });

        window.ethereum.on("chainChanged", (chainId) => {
          console.log("Network changed:", chainId);
        });
      } catch (error) {
        console.error("Connection failed:", error);
      }
    } else {
      console.error("Metamask is not installed. Please install it to continue.");
    }
  }

  async function connect1inchWallet() {
    // Initialize WalletConnect provider
    const provider = new WalletConnectProvider({
      rpc: {
        1: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID", // Replace with your Infura project ID
      },
      qrcodeModalOptions: {
        mobileLinks: ["1inch"], // Ensures the 1inch Wallet is prioritized
      },
    });

    try {
      // Enable session (triggers QR Code modal)
      await provider.enable();

      // Create Web3 instance
      const web3 = new Web3(provider);

      // Get connected accounts
      const accounts = await web3.eth.getAccounts();
      console.log("Connected accounts:", accounts);

      // Get the chain ID (network)
      const chainId = await web3.eth.getChainId();
      console.log("Connected chain ID:", chainId);

      // Optional: Add listeners for session events
      provider.on("accountsChanged", (accounts) => {
        console.log("Accounts changed:", accounts);
      });

      provider.on("chainChanged", (chainId) => {
        console.log("Chain changed:", chainId);
      });

      provider.on("disconnect", (code, reason) => {
        console.log("Wallet disconnected:", code, reason);
      });

      // Example transaction
      // Uncomment the following code to send a transaction
      /*
      const txHash = await web3.eth.sendTransaction({
        from: accounts[0],
        to: "0xRecipientAddress",
        value: web3.utils.toWei("0.01", "ether"),
        gas: 21000,
      });
      console.log("Transaction sent:", txHash);
      */
    } catch (error) {
      console.error("Connection failed:", error);
    }
  }






  const [connected, setConnected] = useState(false);
  const [connectedAccnt, setConAcnt] = useState("");
  const connectToWallet = async () => {
    //ProviderOptions to give give different wallet options.
    const providerOptions = {
      //For metamask wallet
      injected: {
        display: {
          name: "MetaMask",
          description: "Connect with metamask from Browser",
        },
      },
      //For walletconnect with mobile qr code scan
      walletconnect: {
        display: {
          name: "WalletConnect",
          description: "Scan QR code with mobile wallet",
        },
        package: WalletConnectProvider,
        options: {
          rpc: {
            //Provide chain id, network rpc url
            5: "https://goerli.infura.io/v3/",
          },
        },
      },
    };

    const web3ModalConnect = new Web3Modal({
      cacheProvider: false, // optional
      providerOptions, // required
      theme: "dark",
    });

    const instance = await web3ModalConnect.connect(); // To connect with selected provider from browser
    //Optional for now
    const providerInstance = new ethers.providers.Web3Provider(instance);
    const signer = providerInstance.getSigner(); //Get signer object
    const currentAccount = await signer.getAddress(); //Get connected account address

    await walletEventHandler(instance);
    setConAcnt(currentAccount);
    setConnected(true);
  };
  const walletEventHandler = async (instance: any) => {
    await instance.on("accountsChanged", () => {
      // Your implementation here...
      alert("account changed");
      setConnected(false);
    });
    await instance.on("disconnect", () => {
      // Your implementation here...
      alert("disconnected");
      setConnected(false);
    });
    await instance.on("chainChanged", () => {
      // Your implementation here...
      alert("chain changed");
      setConnected(false);
    });
  };


  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <button onClick={() => connect1inchWallet()}>Connect Wallet</button>
      <div className='connetWalletWrapper' id={isVisible ? "connetWallet" : ''}>
        <ConnetWallet handleClick={() => handleClick()} />
      </div>
      <div className='page'>
        {/* <SwapComponent /> */}
        {page ?
          <Swap handleClick={() => handleClick()} setPage={(e) => setPage(e)} /> :
          <SelectDestinationToken setPage={(e) => setPage(e)} />
        }
      </div>
    </Web3ReactProvider>
  );
}
