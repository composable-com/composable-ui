export const parseImageUrl = (imageUrl: string) => {
  return imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl
}
