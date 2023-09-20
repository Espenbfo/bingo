import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import BingoPage from "./BingoPage";
import NewBingoPage from "./NewBingoPage";

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path="/bingo" element={<BingoPage />}>
        </Route>
        , (<Route path="/" element={<NewBingoPage />} />)
    ])
);

const App = () => {
    return <RouterProvider router={router}></RouterProvider>
}

export default App;
