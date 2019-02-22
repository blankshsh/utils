// 深拷贝
export function extend(source) {
  let sourceCopy = source.constructor === Array ? [] : {}
  for (let keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        sourceCopy[keys] = source.constructor === Array ? [] : {}
        sourceCopy[keys] = extend(source[keys])
      } else {
        sourceCopy[keys] = source[keys]
      }
    }
  }
  return sourceCopy
}