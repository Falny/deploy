import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename='/flowers-admin'>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
