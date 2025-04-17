import { Route, Routes } from "react-router-dom";

import ListPage from "@/pages/ListPage.tsx";
import TablePage from "@/pages/TablePage.tsx";
import IndexPage from "@/pages/IndexPage.tsx";

function App() {
    return (
        <Routes>
            <Route element={<IndexPage />} index={true} path="/" />
            <Route element={<ListPage />} path="/meme-list" />
            <Route element={<TablePage />} path="/meme-table" />
        </Routes>
    );
}

export default App;
