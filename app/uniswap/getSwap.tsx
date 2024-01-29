import { FeeAmount, computePoolAddress } from "@uniswap/v3-sdk";
import { Contract, ethers, parseUnits, Signer } from 'ethers'
import { useAccount } from 'wagmi'
import useClient from './etherAdapter'
import { JsonRpcSigner } from 'ethers'
import ISwapRouterArtifact from '@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json';
import IUniswapV3PoolArtifact from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import { toReadableAmount, fromReadableAmount } from './conversion'
import GeneralArtifact from '@/constants/GeneralArtifacts.json';
import { QUOTER_CONTRACT_ADDRESS, ROUTER_ADDRESS, POOL_FACTORY_CONTRACT_ADDRESS, TokensOption } from './constant';
import { Token } from "@uniswap/sdk-core";



interface Immutables {
  token0: string;
  token1: string;
  fee: number;
}

interface State {
  liquidity: ethers.BigNumberish;
  sqrtPriceX96: ethers.BigNumberish;
  tick: number;
}




const browserExtensionProvider = createBrowserExtensionProvider()
function createBrowserExtensionProvider(): ethers.BrowserProvider | null {
  try {
    return new ethers.BrowserProvider((window as any)?.ethereum, 'any');
  } catch (e) {
    console.log('No Wallet Extension Found')
    return null
  }
}

const getPoolImmutables = async (poolContract: Contract) => {
  if (!poolContract)
    throw new Error('Pool contract has not been initialized');
  console.log(poolContract)
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);

  const immutables: Immutables = {
    token0,
    token1,
    fee,
  };
  return immutables;
};

const useFromToken = (fromTokenAddress: string, signer: Signer) => {
  const FromTokenContract = new ethers.Contract(
    fromTokenAddress,
    GeneralArtifact.abi,
    signer
  );
  const approve = async (address: string, amount: number, accountAddress: string) => {
    if (!FromTokenContract) throw new Error('From token contract has not been initialized');
    const parsedAmount = ethers.parseUnits(amount.toString(), TokensOption[fromTokenAddress][2] as number);
    const txn = await FromTokenContract.approve.populateTransaction(address, parsedAmount);
    const signedTxn = await browserExtensionProvider?.send('eth_sendTransaction', [{ ...txn, from: accountAddress }]);
    return signedTxn;
  };

  return { approve };
};






const useSwap = (fromTokenAddress: string, toTokenAddress: string) => {

  const { address } = useAccount();
  const { useEthersProvider, useEthersSigner } = useClient();
  const provider = useEthersProvider();
  const signer = useEthersSigner();

  const token0 = TokensOption[fromTokenAddress];
  const token1 = TokensOption[toTokenAddress];


  const POOL_ADDRESS = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: new Token(token0[0], token0[1], token0[2], token0[3], token0[4]),
    tokenB: new Token(token1[0], token1[1], token1[2], token1[3], token1[4]),
    fee: FeeAmount.MEDIUM,
  });
  const poolContract = new ethers.Contract(
    POOL_ADDRESS,
    IUniswapV3PoolArtifact.abi,
    provider,
  );

  const routerContract = new ethers.Contract(
    ROUTER_ADDRESS,
    ISwapRouterArtifact.abi,
    signer,
  );




  const { approve } = useFromToken(fromTokenAddress, signer as JsonRpcSigner);


  async function quotecall(inputAmount: number): Promise<string> {
    if (inputAmount === 0 && inputAmount === undefined) return "0"
    if (!poolContract) throw new Error('Pool contract has not been initialized');
    if (!provider) throw new Error('Provider has not been initialized');
    if (!signer) throw new Error('Signer has not been initialized');

    const quoterContract = new ethers.Contract(
      QUOTER_CONTRACT_ADDRESS,
      Quoter.abi,
      provider
    )
    const poolConstants = await getPoolImmutables(poolContract);
    const decimals = TokensOption[fromTokenAddress][2];

    try {
      const quotedAmountOut = await quoterContract.quoteExactInputSingle.staticCall(
        poolConstants.token0,
        poolConstants.token1,
        poolConstants.fee,
        ethers.parseUnits(inputAmount.toString(), decimals),
        0
      )
      return toReadableAmount(quotedAmountOut, TokensOption[toTokenAddress][2])
    } catch (error) {
      console.log(error)
      return "0"
    }

  }


  const swap = async (inputAmount: number) => {
    if (!routerContract) throw new Error('Router contract has not been initialized');
    if (!provider) throw new Error('Provider has not been initialized');
    if (!signer) throw new Error('Signer has not been initialized');
    if (!address) throw new Error('Address has not been initialized');
    if (inputAmount === 0 && inputAmount === undefined) return

    try {
      await approve(ROUTER_ADDRESS, inputAmount, address as string);
      const immutables = await getPoolImmutables(poolContract);
      const parsedAmount = ethers.parseUnits(inputAmount.toString(), TokensOption[immutables.token0][2] as number);
      const params = {
        tokenIn: fromTokenAddress,
        tokenOut: toTokenAddress,
        fee: immutables.fee,
        recipient: address,
        deadline: Math.floor(Date.now() / 1000) + 60 * 10,
        amountIn: parsedAmount,
        amountOutMinimum: 0,
        sqrtPriceLimitX96: 0
      };

      const txn = await routerContract.exactInputSingle.populateTransaction(params);
      const signedTxn = await browserExtensionProvider?.send('eth_sendTransaction', [{ ...txn, from: address }]);

      return signedTxn;
    }
    catch (error) {
      console.log(error)
      return '0'
    }

  };

  return { swap, quotecall }

}
export default useSwap