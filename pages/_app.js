import { GlobalStyle } from "@/GlobalStyles";
import Header from "@/components/Header/Header";
export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </>
  );
}
