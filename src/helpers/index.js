export function serialize (obj) {
  let queryString = ''
  // eslint-disable-next-line
  for (let key in obj) {
    queryString += `&${key}=${obj[key]}`
  }
  return queryString
}
