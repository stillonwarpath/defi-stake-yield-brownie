import { useEffect, useState } from 'react'
import { useEthers, useContractFunction } from '@usedapp/core'
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
    const { send: approveErc20Send, state: approveErc20State } = 
    useContractFunction(erc20Contract, "approve", { 
        transactionName: 'Approve ERC20 transfer' 
        })
    const approveAndStake = (amount: string) => {
        setAmountToStake(amount)
        return approveErc20Send(tokenFarmAddress, amount)
    }

    // stake tokens
    const { send: stakeSend, state: stakeState } = useContractFunction(tokenFarmContract, "stakeTokens", {
        transactionName: 'Stake Tokens'
    })

    const [amountToStake, setAmountToStake] = useState("0")

    //useEffect
    useEffect(() => {
        if (approveErc20State.status === 'Success') {
            stakeSend( amountToStake, tokenAddress)
        }
    }, [approveErc20State, amountToStake, tokenAddress])

    return { approveAndStake, approveErc20State }
}