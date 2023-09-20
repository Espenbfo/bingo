import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
import BingoPage from "./BingoPage";
import NewBingoPage from "./NewBingoPage";
  
const router = createBrowserRouter(
createRoutesFromElements(
    <Route path="/" element={<BingoPage />}>
    <Route path="dashboard" element={<NewBingoPage />} />
    {/* ... etc. */}
    </Route>
)
);

const App = () => {
    return <RouterProvider router={router}></RouterProvider>
}

export default App;
