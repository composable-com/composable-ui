import {
  BannerFullProps,
  BannerSplitProps,
  BannerTextOnlyProps,
  CommerceConnectorProps,
  CommerceProduct,
  GridProps,
  TextCardProps,
} from '@composable/types'

export interface ConsciaTemplate<ComponentTypes extends ConsciaComponent<any>> {
  duration: number
  components: Record<string, ComponentTypes>
  errors: any[]
}

export interface ConsciaComponent<ComponentData> {
  '@extras': {
    rule: {
      metadata: any[]
      attributes: Record<string, any>
    }
  }
  status: 'VALID' | 'INVALID'
  response: ComponentData
}

export type ConsciaHeroBanner = {
  __typename: BannerSplitProps['__typename']
  containerMarginBottom?: number
  containerMarginTop?: number
  containerSize: BannerSplitProps['containerSize']
  textPosition: string
  theme: string
  id: BannerSplitProps['id']
  content: BannerSplitProps['content']
  title: BannerSplitProps['title']
  ctaAlphaHref: BannerSplitProps['ctaAlphaHref']
  ctaAlphaLabel: BannerSplitProps['ctaAlphaLabel']
  image: {
    title: string
    description: string
    url: string
  }
}

export type ConsciaCTABanner = {
  __typename: BannerFullProps['__typename']
  containerMarginBottom?: number
  containerMarginTop?: number
  containerSize: BannerFullProps['containerSize']
  overlayBackground: BannerFullProps['overlayBackground']
  textPosition: BannerFullProps['textPosition']
  theme: BannerFullProps['theme']
  id: BannerFullProps['id']
  content: BannerFullProps['content']
  title: BannerFullProps['title']
  ctaAlphaLabel: BannerFullProps['ctaAlphaLabel']
  ctaAlphaHref: BannerFullProps['ctaAlphaHref']
  image: {
    url: string
    title: string
  }
  linkHref1: BannerFullProps['linkHref1']
  linkLabel1: BannerFullProps['linkLabel1']
}

export type ConsciaFeatureCardsHeader = {
  __typename: BannerTextOnlyProps['__typename']
  centered: BannerTextOnlyProps['centered']
  id: BannerTextOnlyProps['id']
  content: BannerTextOnlyProps['content']
  title: BannerTextOnlyProps['title']
  ctaAlphaLabel: BannerTextOnlyProps['ctaAlphaLabel']
  ctaAlphaHref: BannerTextOnlyProps['ctaAlphaHref']
}

export interface ConsciaFeaturedProducts {
  __typename: CommerceConnectorProps['__typename']
  id: CommerceConnectorProps['id']
  title: CommerceConnectorProps['title']
  containerMarginBottom?: number
  containerMarginTop?: number
  containerSize: CommerceConnectorProps['containerSize']
  ctaMaxWidth: string
  ctaMinWidth: string
  ctaLabel: CommerceConnectorProps['ctaLabel']
  ctaHref: CommerceConnectorProps['ctaHref']
  products: (Omit<CommerceProduct, 'img'> & { image: CommerceProduct['img'] })[]
}

export type ConsciaGrid = {
  __typename: GridProps['__typename']
  id: GridProps['id']
  columns: GridProps['columns']
  containerMarginBottom?: number
  containerMarginTop?: number
  gridGap: GridProps['gridGap']
  containerSize: GridProps['containerSize']
  items: ConsciaTextCard[]
}

export type ConsciaTextCard = {
  __typename: TextCardProps['__typename']
  id: TextCardProps['id']
  title: TextCardProps['title']
  image: {
    url: string
    title: string
  }
  content: TextCardProps['content']
  ctaLabel: TextCardProps['ctaLabel']
  ctaHref: TextCardProps['ctaHref']
  theme: TextCardProps['theme']
  textAlign: TextCardProps['textAlign']
}

export type ConsciaPageTemplateComponents = ConsciaComponent<
  | ConsciaHeroBanner
  | ConsciaCTABanner
  | ConsciaFeatureCardsHeader
  | ConsciaFeaturedProducts
  | ConsciaGrid
>
export type ConsciaPageTemplateResponse =
  ConsciaTemplate<ConsciaPageTemplateComponents>
