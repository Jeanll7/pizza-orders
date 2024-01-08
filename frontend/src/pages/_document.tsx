import  { Html, Head, Main, NextScript } from "next/document";

export default function Document() {  
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Coloque as tags meta, link, style, etc. aqui */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Adicione mais tags Head conforme necessário */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )  
}

