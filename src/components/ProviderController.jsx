"use client";

import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "@/redux/store";

export default function ProviderController({ children }) {
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
        <Provider store={store}>{children}</Provider>
      </GoogleOAuthProvider>
    </>
  );
}
