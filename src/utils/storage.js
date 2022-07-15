class Storage {
  // class 继承 封装
  set (key, value) {
    // localStorage.setItem('HEIMATOKEN', JSON.stringify(payload))
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  get (key) {
    const value = localStorage.getItem(key)
    try {
      // JSON.parse(localStorage.getItem('HEIMATOKEN'))
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  }

  remove (key) {
    localStorage.removeItem(key)
  }
}
const storage = new Storage()
export default storage
