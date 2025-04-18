import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "@/styles/globals.css";
import App from "@/App.tsx";
import { Provider } from "@/provider.tsx";
import { ToastProvider } from "@heroui/react";
// import { StrictMode } from "react";

let rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement!).render(
    // <StrictMode>
    <BrowserRouter>
        <ToastProvider placement={"top-center"} toastProps={{radius: "full",timeout: 3000, color: "primary"}}/>
        <Provider>
            <App />
        </Provider>
    </BrowserRouter>
    // </StrictMode>
);
