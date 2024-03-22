import {
  BannerFullProps,
  BannerSplitProps,
  BannerTextOnlyProps,
  CommerceConnectorProps,
  GridProps,
  PageItem,
  PageProps,
  TextCardProps,
} from '@composable/types'
import {
  ConsciaCTABanner,
  ConsciaFeatureCardsHeader,
  ConsciaFeaturedProducts,
  ConsciaGrid,
  ConsciaHeroBanner,
  ConsciaPageTemplateComponents,
  ConsciaPageTemplateResponse,
  ConsciaTextCard,
} from '../types'
import { parseImageUrl } from './images'

export const transformPage = ({
  consciaPage,
  pageSlug,
}: {
  consciaPage: ConsciaPageTemplateResponse
  pageSlug: string
}): PageProps => {
  return {
    __typename: 'pageSlug',
    id: pageSlug,
    items: Object.values(consciaPage.components)
      .sort((a, b) => {
        return (a.response.sort_order ?? 0) - (b.response.sort_order ?? 0)
      })
      .map(transformPageComponent),
    metaDescription: '',
    metaKeywords: [],
    metaTitle: '',
    slug: pageSlug,
  }
}

const transformPageComponent = (
  component: ConsciaPageTemplateComponents
): PageItem => {
  switch (component.response.__typename) {
    case 'BannerSplit':
      return transformHeroBanner(component.response)
    case 'BannerFull':
      return transformCTABanner(component.response)
    case 'BannerTextOnly':
      return transformFeatureCardsHeader(component.response)
    case 'CommerceConnector':
      return transformFeaturedProducts(component.response)
    case 'Grid':
      return transformGrid(component.response)
  }
  throw new Error(
    `Unknown component ${component.response.__typename} found in template`
  )
}

const transformHeroBanner = (
  heroBanner: ConsciaHeroBanner
): BannerSplitProps => {
  const image = heroBanner.image
    ? {
        description: heroBanner.image.description,
        title: heroBanner.image.title,
        url: parseImageUrl(heroBanner.image.url),
      }
    : undefined
  return {
    __typename: heroBanner.__typename,
    containerMarginBottom: heroBanner.containerMarginBottom?.toString(),
    containerMarginTop: heroBanner.containerMarginTop?.toString(),
    containerSize: heroBanner.containerSize,
    content: heroBanner.content,
    ctaAlphaHref: heroBanner.ctaAlphaHref,
    ctaAlphaLabel: heroBanner.ctaAlphaLabel,
    id: heroBanner.id,
    imageDesktop: image,
    imageMobile: image,
    inverted: false,
    isFullScreen: false,
    isLazy: false,
    title: heroBanner.title,
  }
}

const transformCTABanner = (ctaBanner: ConsciaCTABanner): BannerFullProps => {
  const image = ctaBanner.image
    ? {
        title: ctaBanner.image.title ?? '',
        url: parseImageUrl(ctaBanner.image.url),
        description: '',
      }
    : undefined
  return {
    __typename: ctaBanner.__typename,
    containerMarginBottom: ctaBanner.containerMarginBottom?.toString(),
    containerMarginTop: ctaBanner.containerMarginTop?.toString(),
    containerSize: ctaBanner.containerSize,
    overlayBackground: ctaBanner.overlayBackground,
    textPosition: ctaBanner.textPosition,
    theme: ctaBanner.theme,
    id: ctaBanner.id,
    content: ctaBanner.content,
    title: ctaBanner.title,
    ctaAlphaLabel: ctaBanner.ctaAlphaLabel,
    ctaAlphaHref: ctaBanner.ctaAlphaHref,
    imageDesktop: image,
    imageMobile: image,
    linkHref1: ctaBanner.linkHref1,
    linkLabel1: ctaBanner.linkLabel1,
  }
}

const transformFeatureCardsHeader = (
  featureCardsHeader: ConsciaFeatureCardsHeader
): BannerTextOnlyProps => {
  return {
    __typename: featureCardsHeader.__typename,
    centered: featureCardsHeader.centered,
    id: featureCardsHeader.id,
    content: featureCardsHeader.content,
    title: featureCardsHeader.title,
    ctaAlphaLabel: featureCardsHeader.ctaAlphaLabel,
    ctaAlphaHref: featureCardsHeader.ctaAlphaHref,
  }
}

const transformFeaturedProducts = (
  featuredProducts: ConsciaFeaturedProducts
): CommerceConnectorProps => {
  return {
    __typename: featuredProducts.__typename,
    id: featuredProducts.id,
    title: featuredProducts.title,
    containerMarginBottom: featuredProducts.containerMarginBottom?.toString(),
    containerMarginTop: featuredProducts.containerMarginTop?.toString(),
    containerSize: featuredProducts.containerSize,
    ctaLabel: featuredProducts.ctaLabel,
    ctaHref: featuredProducts.ctaHref,
    products: featuredProducts.products.map((product) => ({
      ...product,
      img: product.image,
    })),
    productListType: 'id',
  }
}

const transformGrid = (grid: ConsciaGrid): GridProps => {
  return {
    __typename: grid.__typename,
    id: grid.id,
    columns: grid.columns,
    containerMarginBottom: grid.containerMarginBottom?.toString(),
    containerMarginTop: grid.containerMarginTop?.toString(),
    gridGap: grid.gridGap,
    containerSize: grid.containerSize,
    items: grid.items.map((item) => {
      switch (item.__typename) {
        case 'TextCard':
          return transformTextCard(item)
      }
    }),
  }
}

const transformTextCard = (textCard: ConsciaTextCard): TextCardProps => {
  return {
    __typename: textCard.__typename,
    id: textCard.id,
    title: textCard.title,
    image: {
      title: textCard.image.title,
      url: parseImageUrl(textCard.image.url),
      description: '',
    },
    content: textCard.content,
    ctaLabel: textCard.ctaLabel,
    ctaHref: textCard.ctaHref,
    theme: textCard.theme,
    textAlign: textCard.textAlign,
  }
}
