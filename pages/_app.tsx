
import Header from "@/components/ui/Header";
import { GlobalProvider } from "@/contexts/global/global";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Header />
      <Component {...pageProps} />
    </GlobalProvider>
  )
}
