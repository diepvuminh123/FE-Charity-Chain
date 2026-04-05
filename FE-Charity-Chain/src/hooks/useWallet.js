import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

const SEPOLIA_CHAIN_ID = '0xaa36a7'
const STORAGE_KEY = 'connectedWalletAddress'

const walletStore = {
  address: '',
  error: '',
}

const subscribers = new Set()

function publishWalletState() {
  subscribers.forEach((callback) => callback(walletStore))
}

function setWalletAddress(nextAddress) {
  walletStore.address = nextAddress || ''

  if (typeof window !== 'undefined') {
    if (walletStore.address) {
      window.localStorage.setItem(STORAGE_KEY, walletStore.address)
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }

  publishWalletState()
}

function setWalletError(nextError) {
  walletStore.error = nextError || ''
  publishWalletState()
}

export default function useWallet() {
  const { user, isAuthenticated, updateWallet } = useAuth()
  const [address, setAddress] = useState(walletStore.address)
  const [error, setError] = useState(walletStore.error)

  useEffect(() => {
    const subscriber = (nextState) => {
      setAddress(nextState.address)
      setError(nextState.error)
    }

    subscribers.add(subscriber)
    subscriber(walletStore)

    return () => {
      subscribers.delete(subscriber)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || walletStore.address) {
      return
    }

    const savedAddress = window.localStorage.getItem(STORAGE_KEY)
    if (savedAddress) {
      setWalletAddress(savedAddress)
    }
  }, [])

  useEffect(() => {
    if (user?.wallet_address) {
      setWalletAddress(user.wallet_address)
    }
  }, [user])

  useEffect(() => {
    if (!window.ethereum?.on) {
      return undefined
    }

    const handleAccountsChanged = async (accounts) => {
      const nextAddress = accounts?.[0] || ''
      setWalletAddress(nextAddress)

      if (isAuthenticated && nextAddress) {
        try {
          const res = await updateWallet(nextAddress)
          if (!res.status_code) {
            setWalletError(res.message || 'Không thể lưu wallet address')
          }
        } catch {
          setWalletError('Không thể lưu wallet address về server')
        }
      }
    }

    const handleChainChanged = () => {
      setWalletError('')
    }

    window.ethereum.on('accountsChanged', handleAccountsChanged)
    window.ethereum.on('chainChanged', handleChainChanged)

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      window.ethereum.removeListener('chainChanged', handleChainChanged)
    }
  }, [isAuthenticated, updateWallet])

  const connectWallet = async () => {
    if (!window.ethereum) {
      setWalletError('Cài https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn')
      return
    }

    try {
      setWalletError('')

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
      setWalletAddress(walletAddress)

      if (isAuthenticated && walletAddress) {
        try {
          const res = await updateWallet(walletAddress)
          if (!res.status_code) {
            setWalletError(res.message || 'Không thể lưu wallet address')
          }
        } catch {
          setWalletError('Không thể lưu wallet address về server')
        }
      }
    } catch (err) {
      setWalletError(err?.message || 'Khong the ket noi vi')
    }
  }

  return {
    address,
    error,
    connectWallet,
  }
}
