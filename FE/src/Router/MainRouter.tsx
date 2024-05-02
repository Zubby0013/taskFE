import { createBrowserRouter } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import PrivateRouter from "./PrivateRouter";
import HomeScreen from "../Page/HomeScreen";

export const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      // <PrivateRouter>
      <Layout />
      // </PrivateRouter>
    ),
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
    ],
  },
  // {
  //   path: "/login",
  //   element: <LoginScreen />,
  // },
]);
