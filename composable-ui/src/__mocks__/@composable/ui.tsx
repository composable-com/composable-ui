import { ImageBannerProps } from '@composable/ui'

export const ImageBanner = (props: ImageBannerProps) => {
  return <div>{props.image?.src}</div>
}
