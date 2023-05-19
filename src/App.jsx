import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Details from "./pages/details/Details";
import Home from "./pages/home/Home";

function App() {
  const Layout = () => {
    return (
      <>
        <Outlet />
      </>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/:id",
          element: <Details />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
