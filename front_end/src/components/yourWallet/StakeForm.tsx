import { Token } from '../Main'
import { useEthers, useTokenBalance } from '@usedapp/core'
import { formatUnits } from '@ethersproject/units'
import { Button } from '@material-ui/core'

export interface StakeFormProps {
    token: Token
}

export const StakeForm = ({ token }: StakeFormProps) => {
    const { address, name } = token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance( address, account )
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0

    return (
           <Button
                color="primary"
                size="large">
                    Stake!
            </Button> 
    )

}