import { create } from 'zustand'

type CountStore = {
  count: number
  increment: () => void
  decrement: () => void
}

const useCountStore = create<CountStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))

export default useCountStore  
