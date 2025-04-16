import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "@/styles/globals.css";
import App from "@/App.tsx";
import { Provider } from "@/provider.tsx";
// import { StrictMode } from "react";

let rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement!).render(
    // <StrictMode>
        <BrowserRouter>
            <Provider>
                <App />
            </Provider>
        </BrowserRouter>
    // </StrictMode>
);
