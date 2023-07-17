import { TextCard as TextCardTemplate } from '@composable/ui'
import { TextCardProps } from '@composable/types'

export const TextCard = ({
  image,
  title,
  content,
  ctaLabel,
  ctaHref,
  textAlign,
  theme,
}: TextCardProps) => {
  return (
    <TextCardTemplate
      image={{
        src: image?.url ?? '',
        alt: image?.title ?? '',
      }}
      title={{
        children: title ?? '',
      }}
      description={{
        children: content ?? undefined,
      }}
      button={{
        children: ctaLabel ?? '',
        href: ctaHref ?? '',
        whiteSpace: 'normal',
      }}
      textAlign={textAlign as any}
      theme={theme as any}
    />
  )
}
