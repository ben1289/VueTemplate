import localforage from 'localforage'

const INDEXED_DB_NAME = 'common'

export default function useStorage() {
  const authStorage = localforage.createInstance({ name: 'auth', driver: localforage.LOCALSTORAGE })
  const localStorage = localforage.createInstance({ driver: localforage.LOCALSTORAGE })
  const indexedDB = localforage.createInstance({ name: INDEXED_DB_NAME, driver: localforage.INDEXEDDB })

  function clearAuthStorage() {
    return authStorage.clear()
  }

  function clearLocalStorage() {
    return localStorage.clear()
  }

  function deleteIndexedDB() {
    window.indexedDB.deleteDatabase(INDEXED_DB_NAME)
  }

  return {
    authStorage,
    localStorage,
    indexedDB,
    clearAuthStorage,
    clearLocalStorage,
    deleteIndexedDB,
  }
}
