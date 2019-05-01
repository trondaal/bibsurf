export const capitalize = s => s && s[0].toUpperCase() + s.slice(1)

export const formatCamelCase = (title) => {
  const spaced = title.replace(/([A-Z])/g," $1")
  const upperCase = spaced.charAt(0).toUpperCase() + spaced.slice(1)
  return upperCase
}