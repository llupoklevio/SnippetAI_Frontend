import {
  createBrowserRouter, RouterProvider, Navigate, Outlet
} from "react-router";
import {Login} from "./component/Login.tsx";
import {Register} from "./component/Register.tsx";
import {DashBoard} from "./page/DashBoard.tsx";
import {useAuthStore} from "./store/authStore.ts";
import {Auth} from "./page/Auth.tsx";
import {Snippets} from "./component/Snippets.tsx";
import {AISearch} from "./component/AISearch.tsx";
import {AddSnippet} from "./component/AddSnippet.tsx";
import {SnippetDetail} from "./component/SnippetDetail.tsx";


const ProtectedRoute = () => {
  const { session } = useAuthStore()
  return session?.refreshToken ? <Outlet /> : <Navigate to="/login" replace />
}

const ProtectedRouteAuth = () => {
  const { session } = useAuthStore()
  return !session?.refreshToken ? <Auth /> : <Navigate to="/home" replace />
}

const router = createBrowserRouter([

  {
    Component: ProtectedRouteAuth,
    children: [
      {index: true, element: <Navigate to="/login" replace />},
      {path:"login", Component: Login},
      {path: "register", Component: Register},
    ],
  },
  {
    Component: ProtectedRoute,
    children: [
      { path: "home", Component: DashBoard , children: [
          {
            index: true, element: <Navigate to="/home/snippets" replace />
          },
          {
            path: "snippets",
            Component: Snippets
          },
          {
            path: "AISearch",
            Component: AISearch
          },
          {
            path: "addSnippet",
            Component: AddSnippet
          },
          {
            path: "snippet/:idSnippet",
            Component: SnippetDetail
          },
      ]},
    ]
  },


])


function App() {

  return <RouterProvider router={router} />;

}

export default App
