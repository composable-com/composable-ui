export const getInitials = (str: string) => {
  const names = str.split(' ')
  const initial = names[0].substring(0, 1).toUpperCase()

  return names.length > 1
    ? initial + names[names.length - 1].substring(0, 1).toUpperCase()
    : initial
}
