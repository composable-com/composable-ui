export const toCent = (amount: string | undefined | null): number => {
  if (!amount) {
    return 0
  }

  return Math.round(parseFloat(amount) * 100)
}

export const centToString = (amount: number | null | undefined) => {
  if (!amount) {
    return ''
  }
  return Number(amount / 100).toString()
}
