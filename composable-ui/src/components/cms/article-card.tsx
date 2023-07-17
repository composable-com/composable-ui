import { ArticleCardProps } from '@composable/types'
import { ArticleCard as ArticleCardTemplate } from '@composable/ui'

export const ArticleCard = ({
  image,
  eyebrow,
  title,
  content,
  href,
  textAlign,
}: ArticleCardProps) => {
  return (
    <ArticleCardTemplate
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
        children: content,
      }}
      href={href ?? ''}
      textAlign={textAlign as any}
    />
  )
}
