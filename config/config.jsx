import { http, createConfig } from 'wagmi';
import { base, mainnet, optimism } from 'wagmi/chains';
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

export const config = createConfig({
  chains: [mainnet, optimism, base],
  connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
});
