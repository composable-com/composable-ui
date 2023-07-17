import { BannerSplit as BannerSplitTemplate } from '@composable/ui'
import { BannerSplitProps } from '@composable/types'
export const BannerSplit = ({
  imageDesktop,
  imageMobile,
  eyebrow,
  title,
  content,
  ctaAlphaHref,
  ctaAlphaLabel,
  inverted,
  isFullScreen,
  isLazy = true,
}: BannerSplitProps) => {
  return (
    <BannerSplitTemplate
      inverted={inverted ?? undefined}
      isFullScreen={isFullScreen}
      isLazy={isLazy}
      image={{
        imageDesktop: {
          src: imageDesktop?.url ?? '',
          alt: imageDesktop?.title ?? '',
        },
        imageMobile: {
          src: imageMobile?.url ?? '',
          alt: imageMobile?.title ?? '',
        },
      }}
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
    />
  )
}
