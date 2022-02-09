import "../styles/globals.css";
import "../styles/theme.css";
// import "highlight.js/styles/atom-one-dark.css";
import "katex/dist/katex.min.css";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
