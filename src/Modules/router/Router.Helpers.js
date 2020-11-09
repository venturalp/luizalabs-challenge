export const getQueryParam = (query = '', param = '') => {
  const tryRegex = query.match(new RegExp(`\\*?${param}=[^&]*`, 'gmi'))

  return tryRegex ? tryRegex[0].split('=')[1] : false
}
