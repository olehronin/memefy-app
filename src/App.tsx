import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import ListPage from "@/pages/listPage.tsx";
import TablePage from "@/pages/tablePage.tsx";

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
