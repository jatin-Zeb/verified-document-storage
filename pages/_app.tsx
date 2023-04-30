import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import {ContractHandler} from "./../components/UserHome/Contract"
import { getOrCreateStore } from "../utils/redux/createStore";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mainnet;

function MyApp({ Component, pageProps }: AppProps) {
    const store = getOrCreateStore();
  return (
    <GoogleOAuthProvider clientId="1083090533190-qngp1llqj9elmn19mf47llu37i5sroug.apps.googleusercontent.com">
      <Provider store={store}>
        <ContractHandler>
          <ThirdwebProvider desiredChainId={activeChainId}>
            <script async src="https://checkout.razorpay.com/v1/checkout.js"></script>
            <Component {...pageProps} />
          </ThirdwebProvider>
        </ContractHandler>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
