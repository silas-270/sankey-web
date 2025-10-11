import { create } from 'zustand'

const initialJson = {
    nodes: [],
    links: []
}

const useSankeyStore = create((set) => ({
    sankeyData: initialJson,

    setData: (newData) => set({ formattedSankeyData: newData })
}))

export default useSankeyStore