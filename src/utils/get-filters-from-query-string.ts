/* eslint-disable camelcase */
export function getFiltersFromQueryString(query: string) {
  const filters = query.split('&')
  const pairs = filters.reduce((acc: Record<string, string>, act: string) => {
    const key_value = act.split('=')
    const key = key_value[0]
    const value = key_value[1]
    acc[key] = value
    return acc
  }, {})

  return pairs
}
