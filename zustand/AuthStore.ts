import { create } from 'zustand'

type AuthStore = {
  token: string | null
  setToken: (token: string) => void
  clearToken: () => void
}

const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  setToken: (token: string) => set({ token }),
  clearToken: () => set({ token: null }),
}))

export default useAuthStore
