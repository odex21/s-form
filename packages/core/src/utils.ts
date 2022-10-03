export function sleep(time: number): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export function ensureArray<T>(v: T | T[]): T[] {
  if (Array.isArray(v)) return v
  //@ts-ignore
  else if (typeof v !== 'undefined' && v !== '') return [v]
  else return []
}
