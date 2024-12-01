import { I1InchSwapParams } from "../helpers";
import axios1Inch from "./axiosInstance";

const oneInchBaseUrl = '/1inch.dev';

export const create1InchProxyUrl = (url: string) =>
  `${oneInchBaseUrl}${url}`;
export const broadcastApiUrl1Inch = (chainId: string | number) =>
  create1InchProxyUrl(`/tx-gateway/v1.1/${chainId}/broadcast`);
export const apiBaseUrl1Inch = (chainId: string | number) =>
  create1InchProxyUrl(`/swap/v5.2/${chainId}`);

export function apiRequestUrl(path: string, queryParams: any) {
  return path + "?" + new URLSearchParams(queryParams).toString();
}

export async function buildTxForSwap1Inch(
  swapParams: I1InchSwapParams,
  chainId: string | number
) {
  const url = apiRequestUrl(
    create1InchProxyUrl(`/swap/v6.0/${chainId}/swap`),
    swapParams
  );
  console.log(url)
  try {
    console.log(create1InchProxyUrl(`/swap/v6.0/${chainId}/swap`),)
    const response = await axios1Inch.get(url);
    console.log(oneInchBaseUrl, 'response', response)
    return response.data.tx;
  } catch (err) {
    console.error(err);
  }
}
