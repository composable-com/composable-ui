import Script from 'next/script'

interface GoogleTagManagerProps {
  googleTagManagerId?: string
}

export const GoogleTagManagerNoScript = ({
  googleTagManagerId,
}: GoogleTagManagerProps) => {
  if (!googleTagManagerId) {
    return null
  }

  return (
    <noscript>
      <iframe
        title="gtag-noscript"
        src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}

export const GoogleTagManager = ({
  googleTagManagerId,
}: GoogleTagManagerProps) => {
  return (
    <>
      {!!googleTagManagerId && (
        <Script
          id="gtag-base"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer', '${googleTagManagerId}');
        `,
          }}
        />
      )}
    </>
  )
}
