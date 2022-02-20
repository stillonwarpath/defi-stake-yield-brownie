import { useEthers } from '@usedapp/core'
import { constants, utils } from 'ethers';
import { Contract } from '@ethersproject/contracts'
import TokenFarm from '../chain-info/contracts/TokenFarm.json'
import networkMapping  from '../chain-info/deployments/map.json'

export const useStakeTokens = (tokenAddress: string) => {
    // address
    // abi
    // chainId
    const { chainId } = useEthers()
    const { abi } = TokenFarm
    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract( tokenFarmAddress, tokenFarmInterface )

    // approve
    // stake tokens
}