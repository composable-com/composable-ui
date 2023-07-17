import { BannerFullProps } from '@composable/types'
import { BannerFull as BannerFullTemplate } from '@composable/ui'

export const BannerFull = ({
  imageDesktop,
  imageMobile,
  eyebrow,
  title,
  content,
  ctaAlphaHref,
  ctaAlphaLabel,
  ctaBetaHref,
  ctaBetaLabel,
  linkLabel1,
  linkHref1,
  linkLabel2,
  linkHref2,
  linkLabel3,
  linkHref3,
  linkLabel4,
  linkHref4,
  linkLabel5,
  linkHref5,
  linkLabel6,
  linkHref6,
  theme,
  textPosition,
  overlayBackground,
}: BannerFullProps) => {
  const links = [
    { label: linkLabel1, href: linkHref1 },
    { label: linkLabel2, href: linkHref2 },
    { label: linkLabel3, href: linkHref3 },
    { label: linkLabel4, href: linkHref4 },
    { label: linkLabel5, href: linkHref5 },
    { label: linkLabel6, href: linkHref6 },
  ]

  return (
    <BannerFullTemplate
      theme={theme as any}
      textPosition={textPosition as any}
      overlayBackground={overlayBackground ?? null}
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
        ctaButtonSecondary: {
          children: ctaBetaLabel,
          href: ctaBetaHref ?? '',
        },
        ctaLinkItems: links
          .filter((el) => el.label)
          .map((el) => {
            return {
              children: el.label,
              href: el.href ?? '',
            }
          }),
      }}
    />
  )
}
