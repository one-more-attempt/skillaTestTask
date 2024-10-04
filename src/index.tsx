import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import "./index.css";

const store = setupStore();
const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
