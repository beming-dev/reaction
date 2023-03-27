import Nav from "@/components/Nav";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Nav></Nav>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
