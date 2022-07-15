import storage from '@/utils/storage'
const TONKEN_KEY = 'HEIMATOKEN'
export const getTonken = () => storage.get(TONKEN_KEY)
export const setTonken = (token) => storage.set(TONKEN_KEY, token)
export const removeTonken = () => storage.remove(TONKEN_KEY)
