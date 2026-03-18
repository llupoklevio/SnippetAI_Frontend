import { createBrowserRouter,RouterProvider,Navigate
} from "react-router";
import {Auth} from "./page/Auth.tsx";
import {Login} from "./component/Login.tsx";
import {Register} from "./component/Register.tsx";


const router = createBrowserRouter([

  {
    Component: Auth,
    children: [
      {index: true, element: <Navigate to="/login" replace />},
      {path:"login", Component: Login},
      {path: "register", Component: Register},
    ]
  },

])


function App() {

  return <RouterProvider router={router} />;

}

export default App
