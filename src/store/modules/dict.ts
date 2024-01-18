import type { Dict } from '@/types'
import { defineStore } from 'pinia'
import { groupBy } from 'lodash-es'
import { getDictDataSimpleList } from '@/api/system/dict'

const STORE_ID = 'dictStore'

const useDictStore = defineStore(STORE_ID, () => {
  const isSet = ref(false)
  const dict = ref<Record<string, Dict[]>>({})

  async function setDict() {
    const { data } = await getDictDataSimpleList()
    dict.value = groupBy(data, 'dictType')
    isSet.value = true
  }

  function clearStorage() {
    window.sessionStorage.removeItem(STORE_ID)
  }

  return {
    isSet,
    dict,
    setDict,
    clearStorage,
  }
}, { persist: { storage: sessionStorage } })

export default useDictStore
