import { BannerTextOnlyProps } from '@composable/types'
import { BannerTextOnly as BannerTextOnlyTemplate } from '@composable/ui'
export const BannerTextOnly = ({
  eyebrow,
  title,
  content,
  ctaAlphaHref,
  ctaAlphaLabel,
  centered,
  minHeight = '400px',
}: BannerTextOnlyProps) => {
  return (
    <BannerTextOnlyTemplate
      centered={centered ?? undefined}
      text={{
        eyebrow: {
          children: eyebrow,
        },
        title: {
          children: title,
        },
        body: {
          children: content ?? undefined,
        },
        ctaButtonPrimary: {
          children: ctaAlphaLabel,
          href: ctaAlphaHref ?? '',
        },
      }}
      containerMinHeight={minHeight ?? undefined}
    />
  )
}
