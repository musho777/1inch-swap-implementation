"use client";

import { buildTxForSwap1Inch } from "@/utils/1inch/api";
import { calculateGasMargin } from "@/utils/calculateGasMargin";
import { ROUTER_ADDRESSES_1INCH } from "@/utils/constants";
import { generate1InchSwapParmas, getSigner } from "@/utils/helpers";
import isZero from "@/utils/isZero";
import { BigNumber } from "@ethersproject/bignumber";
import { useEffect, useState } from "react";
import Web3 from 'web3';



export const useSwap1Inch = () => {
  const web3 = new Web3(Web3.givenProvider);
  const library = web3;
  const chainId = 1;
  const [accaunt, setAccaunt] = useState()


  useEffect(() => {
    getAccount()
  }, [])

  async function getAccount() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Connected account:', accounts[0]);
      setAccaunt(accounts[0])
      return accounts[0]; // First account
    } catch (error) {
      console.error('User denied account access:', error);
    }
  }

  // const { account, library, activate } = useWeb3React();



  const typedValue = 1; // TO DO: get from input
  const router1Inch = ROUTER_ADDRESSES_1INCH[chainId];
  if (!accaunt) return;

  const from = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"; // TO DO: set address from

  const to = "0x3ffeea07a27fab7ad1df5297fa75e77a43cb5790"; // TO DO: set address to
  const swap1Inch = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const swapParams = generate1InchSwapParmas(
      from,
      to,
      Number(typedValue),
      accaunt,
      1
    );

    const swapTransaction = await buildTxForSwap1Inch(swapParams, chainId);

    // TO DO: Remove when change DEV plan for 1Inch (1 Request per second)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const tx = {
        from: getAccount() ?? "",
        to: router1Inch,
        data: swapTransaction.data,
        ...(swapTransaction.value && !isZero(swapTransaction.value)
          ? { value: swapTransaction.value.toString(16) } // Convert to Hex.If not working use toHex() from @uniswap/v3-sdk 
          : {}),
      };
      const response = await getSigner(library, accaunt)
        .estimateGas(tx)
        .then((estimate: BigNumber) => {
          const newTxn = {
            ...tx,
            gasLimit: calculateGasMargin(estimate),
          };

          return getSigner(library, accaunt)
            .sendTransaction(newTxn)
            .then((response: { hash: any }) => {
              if (!response.hash) {
                throw new Error(
                  `Your swap was modified through your wallet. If this was a mistake, please cancel immediately or risk losing your funds.`
                );
              }
              return response;
            });
        });

      return response;
    } catch (err) {
      console.error(err);
      return;
    }
  };

  return { swap1Inch };
};