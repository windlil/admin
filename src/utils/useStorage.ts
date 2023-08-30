export function setStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getStorage(key: string) {
  const st = localStorage.getItem(key)
  if (st) {
    return JSON.parse(st)
  } else {
    return undefined
  }
}

export function delStorage(key: string) {
  const isExist = getStorage(key)

  if (isExist) {
    localStorage.removeItem(key)
  }
}
