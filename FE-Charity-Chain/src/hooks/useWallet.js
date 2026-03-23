import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

const SEPOLIA_CHAIN_ID = '0xaa36a7'

export default function useWallet() {
  const { user, isAuthenticated, updateWallet } = useAuth()
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (user?.wallet_address) {
      setAddress(user.wallet_address)
    }
  }, [user])

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('Cài https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn')
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

      const walletAddress = accounts[0] || ''
      setAddress(walletAddress)

      if (isAuthenticated && walletAddress) {
        try {
          const res = await updateWallet(walletAddress)
          if (!res.status_code) {
            setError(res.message || 'Không thể lưu wallet address')
          }
        } catch {
          setError('Không thể lưu wallet address về server')
        }
      }
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
