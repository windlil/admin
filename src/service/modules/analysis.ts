import { defineStore } from 'pinia'

export const useAnalysisStore = defineStore('analysisStore', {
  state: () => ({
    amountList: [],
    goodsCategory: [],
  }),
})
