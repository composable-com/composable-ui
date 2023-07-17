import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import { GoogleTagManagerNoScript } from 'components/google-tag-manager'
import { GOOGLE_TAG_MANAGER_ID } from 'utils/constants'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          {/* GTM NoScript should be the first tag in <body> */}
          <GoogleTagManagerNoScript
            googleTagManagerId={GOOGLE_TAG_MANAGER_ID}
          />
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
