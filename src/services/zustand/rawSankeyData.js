import { create } from 'zustand'

const initialData = {
    nodes: [],
    links: []
}

export const useSankeyDataStore = create((set) => ({
  // The state property that holds your single JSON object
  data: initialData,

  /**
   * Function to set a completely new JSON object.
   * This is your "write" function.
   * @param {Object} newJsonData - The new JSON object to replace the current 'data'.
   */
  setJson: (newJsonData) => set({ data: newJsonData }),
}))