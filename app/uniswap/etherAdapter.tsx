'use client'
import { FallbackProvider, JsonRpcProvider ,BrowserProvider,JsonRpcSigner} from 'ethers'
import { useMemo } from 'react'
import type { Account, Chain, Client, Transport } from 'viem'
import { useAccount,usePublicClient } from 'wagmi'


export default function useClient() {

   function clientToProvider(client: Client<Transport, Chain>) {
    const { chain, transport } = client
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address,
    }
    if (transport.type === 'fallback') {
      const providers = (transport.transports as ReturnType<Transport>[]).map(
        ({ value }) => new JsonRpcProvider(value?.url, network),
      )
      if (providers.length === 1) return providers[0]
      return new FallbackProvider(providers)
    }
    return new JsonRpcProvider(transport.url, network)
  }
  
  
  function clientToSigner(client: Client<Transport, Chain>, address: string) {
  
    const {  chain, transport } = client
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address,
    }
    const provider = new BrowserProvider(transport, network)
    const signer = new JsonRpcSigner(provider, address)
    return signer
  }
  const client = usePublicClient();
  const { address} = useAccount();
 function useEthersProvider() {

    return useMemo(() => clientToProvider(client), [client])
  }
 
  function useEthersSigner() {
    return useMemo(() => (client ? clientToSigner(client,address as string) : undefined), [client])
  }
  
  return {useEthersProvider,useEthersSigner}
}
