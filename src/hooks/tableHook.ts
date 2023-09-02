import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/system'

export function useTableHook(type: string, dialogRef: any) {
  const systemStore = useSystemStore()
  const { pageList, pageTotalCount } = storeToRefs(systemStore)
  const currentPage = ref(1)
  const pageSize = ref(5)

  function fetchPageList(form?: any, config?: any) {
    const size = pageSize.value
    const offset = currentPage.value - 1
    console.log(form)
    systemStore.getPageList(type, {
      offset: config?.currentPage ?? offset,
      size: config?.pageSize ?? size,
      ...form,
    })
  }

  function search(form: any) {
    fetchPageList(form)
  }

  function reset() {
    fetchPageList()
  }

  function handleChange(config: any) {
    fetchPageList({}, config)
  }

  function del(id: number) {
    systemStore.delPageById(type, id)
    reset()
  }

  function edit(row: any) {
    dialogRef.value?.openDialog(row)
  }

  function updateList() {
    reset()
  }

  function newData() {
    dialogRef.value?.openDialog()
  }

  fetchPageList()

  return {
    search,
    handleChange,
    del,
    edit,
    updateList,
    newData,
    reset,
    pageList,
    pageTotalCount,
  }
}
