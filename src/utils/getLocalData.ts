import { useLoginStore } from '@/store/login'

export function getLocalData() {
  const loginStore = useLoginStore()
  loginStore.getLocalData()
}
