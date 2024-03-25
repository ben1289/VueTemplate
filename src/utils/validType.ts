export function isValidNumber(str: string) {
  const num = Number(str)
  return !Number.isNaN(num) && Number.isFinite(num)
}

export function isValidBoolean(str: string) {
  const lowerCaseStr = str.toLowerCase()
  return lowerCaseStr === 'true' || lowerCaseStr === 'false'
}
