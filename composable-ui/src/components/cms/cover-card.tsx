import { CoverCardProps } from '@composable/types'
import { CoverCard as CoverCardTemplate } from '@composable/ui'
export const CoverCard = ({
  image,
  eyebrow,
  title,
  content,
  href,
  textAlign,
  theme,
}: CoverCardProps) => {
  return (
    <CoverCardTemplate
      image={{
        src: image?.url ?? '',
        alt: image?.title ?? '',
      }}
      eyebrow={{
        children: eyebrow ?? '',
      }}
      title={{
        children: title ?? '',
      }}
      description={{
        children: content ?? undefined,
      }}
      href={href ?? ''}
      textAlign={textAlign as any}
      theme={theme as any}
    />
  )
}
