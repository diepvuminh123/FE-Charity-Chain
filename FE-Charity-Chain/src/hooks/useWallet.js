import { useState } from 'react'

const SEPOLIA_CHAIN_ID = '0xaa36a7'

export default function useWallet() {
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('Cai MetaMask di bro')
      return
    }

    try {
      setError('')

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      const currentChainId = await window.ethereum.request({
        method: 'eth_chainId',
      })

      if (currentChainId !== SEPOLIA_CHAIN_ID) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: SEPOLIA_CHAIN_ID }],
        })
      }
      setAddress(accounts[0] || '')
    } catch (err) {
      setError(err?.message || 'Khong the ket noi vi')
    }
  }

  return {
    address,
    error,
    connectWallet,
  }
}