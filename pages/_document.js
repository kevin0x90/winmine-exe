import Document, {Head, Main, NextScript} from "next/document"
import {ServerStyleSheet} from "styled-components"
import win95Theme from "~/lib/win95Theme"

const GOOGLE_ANALYTICS_ID = "UA-134358716-1"
const GOOGLE_ANALYTICS_TAGS = (
  <div
    dangerouslySetInnerHTML={{
      __html: `
<script async src="https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GOOGLE_ANALYTICS_ID}');
</script>
`
    }}
  />
)

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()

    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
      })

    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps, styles: [...initialProps.styles, ...sheet.getStyleElement()]}
  }

  render() {
    return (
      <html>
        <Head>
          <title>Minesweeper</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <style
            dangerouslySetInnerHTML={{
              __html: `
                * { box-sizing: border-box; }
                body {
                  margin: 0;
                  overflow: hidden;
                }
                ${win95Theme.fontFaces["MS Sans Serif"]}
               `
            }}
          />
        </Head>
        <body>
          <Main />
          {process.env.NODE_ENV === "production" && GOOGLE_ANALYTICS_TAGS}
          <NextScript />
        </body>
      </html>
    )
  }
}
