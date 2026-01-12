import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { store } from "./app/store.ts";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Provider store={store}>
        <App />
      </Provider>
    </ClerkProvider>
  </BrowserRouter>
);
