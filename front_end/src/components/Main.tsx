import { useEthers } from '@usedapp/core'
import helperConfig from '../helper-config.json'
import networkMapping from '../chain-info/deployments/map.json'
import { constants } from 'ethers'

export const Main = () => {
    // Show token values from the wallet

    // Get the address of different tokens
    // Get the balance of the users wallet

    // send the brownie-config to our ``src` folder
    // send the build folder
    const { chainId } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"
    
    const dappTokenAddress = chainId ? networkMapping[String(chainId)]["DappToken"][0] : constants.AddressZero
    return (<div>Hi</div>)
}