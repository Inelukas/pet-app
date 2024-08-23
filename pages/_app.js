import { GlobalStyle } from "@/Component/GlobalStyles/GlobalStyles";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
