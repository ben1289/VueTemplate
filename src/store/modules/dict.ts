import type { Dict } from '@/types'
import { defineStore } from 'pinia'
import { groupBy } from 'lodash-es'
import { getDictDataSimpleList } from '@/api/system/dict'

const STORE_ID = 'dictStore'

const useDictStore = defineStore(STORE_ID, () => {
  const isSet = ref(false)
  const expires = ref<Date>()
  const dict = ref<Record<string, Dict[]>>({})

  async function setDict() {
    const { data } = await getDictDataSimpleList()
    dict.value = groupBy(data, 'dictType')
    expires.value = new Date(Date.now() + 1000 * 60 * 30)
    isSet.value = true
  }

  function clearStorage() {
    sessionStorage.removeItem(STORE_ID)
  }

  return {
    isSet,
    expires,
    dict,
    setDict,
    clearStorage,
  }
}, {
  persist: {
    storage: sessionStorage,
    beforeRestore() {
      const { expires } = JSON.parse(sessionStorage.getItem(STORE_ID) ?? '{}')
      if (!expires || new Date(expires) < new Date()) {
        sessionStorage.removeItem(STORE_ID)
      }
    },
  },
})

export default useDictStore
