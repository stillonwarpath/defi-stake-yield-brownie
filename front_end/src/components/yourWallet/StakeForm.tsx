import React, { useState, useEffect } from 'react'
import { Token } from '../Main'
import { useEthers, useTokenBalance, useNotifications } from '@usedapp/core'
import { formatUnits } from '@ethersproject/units'
import { Button, Input, CircularProgress, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab/Alert'
import { useStakeTokens } from '../../hooks'
import { utils } from 'ethers'

export interface StakeFormProps {
    token: Token
}

export const StakeForm = ({ token }: StakeFormProps) => {
    const { address, name } = token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance( address, account )
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    const { notifications } = useNotifications()

    const [amount, setAmount] = useState<number | string | Array<number | string>>(0)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value === '' ? '' : Number(event.target.value)
        setAmount(newAmount)
        console.log(newAmount)
    }

    const { approveAndStake, state: approveAndStakeErc20State } = useStakeTokens(address)
    const handleStakeSubmit = () => {
        const amountAsWei = utils.parseEther(amount.toString())
        return approveAndStake(amountAsWei.toString())
    }

    const isMining = approveAndStakeErc20State.status === 'Mining'

    const [showErc20ApprovalSuccess, setShowErc20ApprovalSuccess] = useState(false)
    const [showStakeTokenSuccess, setShowStakeTokenSuccess] =  useState(false)

    useEffect(() => {
        if (notifications.filter(
            (notification) => 
                notification.type === 'transactionSucceed' && 
                notification.transactionName === 'Approve ERC20 transfer').length > 0) {
                    setShowErc20ApprovalSuccess(true)
                    setShowStakeTokenSuccess(false)

                }
        if (notifications.filter(
            (notification) => 
                notification.type === 'transactionSucceed' &&
                notification.transactionName === 'Stake Tokens').length > 0) {
                    console.log('Tokens Staked!')
                }
    }, [notifications])

    return (
        <>
            <div>
                <Input 
                    onChange={handleInputChange}
                />
                <Button
                        onClick={handleStakeSubmit}
                        color="primary"
                        size="large"
                        disabled={isMining}>
                            {isMining ? <CircularProgress size={26} /> : 'Stake!!!'}
                </Button>
            </div>
            <SnackBar
                open={}
                autoHideDuration={5000}
                onClose={}>
                <Alert
                    onClose={}
                    severity='success'>
                    ERC-20 token transfer approved! Now approve the 2nd transactions
                </Alert>
            </SnackBar>
            <SnackBar
                open={}
                autoHideDuration={5000}
                onClose={}>
                <Alert
                    onClose={}
                    severity='success'>
                    Tokens Staked!
                </Alert>
            </SnackBar>  
        </>
    )

}