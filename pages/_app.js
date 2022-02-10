import "styles/globals.css";
import "styles/theme.css";
import "katex/dist/katex.min.css";
import { ThemeProvider } from "next-themes";

import { Header } from "components/Header";
import { Footer } from "components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <div className="mx-auto w-[90%] sm:w-[65%] pt-[60px]">
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </div>
      <Footer />
    </>
  );
}

export default MyApp;
