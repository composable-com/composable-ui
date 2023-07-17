export interface ImageProps {
  description: string
  title: string
  url: string
  minHeight?: string
}

export interface BannerSplitProps {
  __typename?: 'BannerSplit'
  containerMarginBottom?: string | null
  containerMarginTop?: string | null
  containerSize?: string | null
  content: string
  ctaAlphaHref?: string | null
  ctaAlphaLabel: string
  eyebrow?: string | null
  id: string
  imageDesktop?: ImageProps | null
  imageMobile?: ImageProps | null
  inverted: boolean
  isFullScreen: boolean
  isLazy: boolean
  title: string
}

export interface BannerFullProps {
  __typename?: 'BannerFull'
  containerMarginBottom?: string | null
  containerMarginTop?: string | null
  containerSize?: string | null
  content: string
  ctaAlphaHref?: string | null
  ctaAlphaLabel: string
  ctaBetaHref?: string | null
  ctaBetaLabel?: string | null
  eyebrow?: string | null
  id: string
  imageDesktop: ImageProps
  imageMobile: ImageProps
  linkHref1?: string | null
  linkHref2?: string | null
  linkHref3?: string | null
  linkHref4?: string | null
  linkHref5?: string | null
  linkHref6?: string | null
  linkLabel1?: string | null
  linkLabel2?: string | null
  linkLabel3?: string | null
  linkLabel4?: string | null
  linkLabel5?: string | null
  linkLabel6?: string | null
  overlayBackground?: string | null
  textPosition: string
  theme: string
  title: string
}

export interface BannerTextOnlyProps {
  __typename?: 'BannerTextOnly'
  centered: boolean
  containerMarginBottom?: string | null
  containerMarginTop?: string | null
  containerSize?: string | null
  content: string
  ctaAlphaHref?: string | null
  ctaAlphaLabel: string
  eyebrow?: string | null
  id: string
  minHeight?: string | null
  title: string
}

export interface CoverCardProps {
  __typename: 'CoverCard'
  containerMarginBottom?: string | null
  containerMarginTop?: string | null
  containerSize?: string | null
  content: string
  eyebrow?: string | null
  href: string
  id: string
  image: ImageProps
  textAlign: string
  theme: string
  title: string
}

export interface TextCardProps {
  __typename: 'TextCard'
  content: string
  ctaHref?: string | null
  ctaLabel: string
  id: string
  image: ImageProps
  textAlign: string
  theme: string
  title: string
}

export interface ArticleCardProps {
  __typename: 'ArticleCard'
  containerMarginBottom?: string
  containerMarginTop?: string
  containerSize?: string
  content: string
  eyebrow?: string
  href: string
  id: string
  image: ImageProps
  textAlign: string
  title: string
}

export interface PriceProps {
  current: number
  currentFormatted: string
  regular?: number
  regularFormatted?: string
}

interface CommerceProducts {
  brand?: string
  id: string
  img?: {
    url?: string
    alt?: string
  }
  name: string
  price?: PriceProps
  slug: string
}

interface CommerceConnectorProps {
  __typename: 'CommerceConnector'
  containerMarginBottom?: string
  containerMarginTop?: string
  containerSize?: string
  ctaHref: string
  ctaLabel: string
  id: string
  productListType: 'id' | 'sku'
  products: CommerceProducts[]
  title: string
}

export type PageItem =
  | BannerFullProps
  | BannerSplitProps
  | BannerTextOnlyProps
  | CommerceConnectorProps
  | GridProps

export interface PageProps {
  __typename: string
  id: string
  items: PageItem[]
  metaDescription: string
  metaKeywords: string[]
  metaTitle: string
  slug: string
}

type GridItem = ArticleCardProps | CoverCardProps | TextCardProps

export interface GridProps {
  __typename: 'Grid'
  columns: number
  containerMarginBottom?: string
  containerMarginTop?: string
  containerSize?: string
  gridGap?: string
  id: string
  items: GridItem[]
}
