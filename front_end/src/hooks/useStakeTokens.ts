import { useEthers } from '@usedapp/core'
import { constants, utils } from 'ethers';
import { Contract } from '@ethersproject/contracts'
import TokenFarm from '../chain-info/contracts/TokenFarm.json'
import networkMapping  from '../chain-info/deployments/map.json'
import ERC20 from '../chain-info/contracts/MockERC20.json'

export const useStakeTokens = (tokenAddress: string) => {
    // address
    // abi
    // chainId
    const { chainId } = useEthers()
    const { abi } = TokenFarm
    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract( tokenFarmAddress, tokenFarmInterface )

    const ERC20ABI = ERC20.abi
    const erc20Interface = new utils.Interface(ERC20ABI)
    const erc20Contract = new Contract(tokenAddress, erc20Interface)
    // approve
    // stake tokens
}