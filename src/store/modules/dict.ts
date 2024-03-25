import type { Dict } from '@/types'
import { defineStore } from 'pinia'
import { groupBy } from 'lodash-es'
import { isValidBoolean, isValidNumber } from '@/utils/validType'
import { getDictDataSimpleList } from '@/api/system/dict'

const STORE_ID = 'dictStore'

const useDictStore = defineStore(STORE_ID, () => {
  const isSet = ref(false)
  const expires = ref<Date>()
  const dict = ref<Record<string, Dict[]>>({})

  async function setDict() {
    const { data } = await getDictDataSimpleList()
    const typedData = data.map((d) => {
      if (isValidNumber(d.value)) {
        d.value = Number(d.value)
      } else if (isValidBoolean(d.value)) {
        d.value = d.value === 'true'
      }
      return d
    })
    dict.value = groupBy(typedData, 'dictType')
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
