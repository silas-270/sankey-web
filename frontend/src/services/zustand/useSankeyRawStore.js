import { create } from 'zustand'

const initialJson = {
    nodes: [],
    links: []
}

const useSankeyRawStore = create((set) => ({
    sankeyData: initialJson,

    setData: (newData) => set({ rawSankeyData: newData })
}))

export default useSankeyRawStore