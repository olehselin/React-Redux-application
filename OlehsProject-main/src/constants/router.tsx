import { createBrowserRouter } from "react-router-dom";
import UsersPage from "../pages/UsersPage";
import UserPage from "../pages/UserPage";
import PostPage from "../pages/PostPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UsersPage />,
  },
  {
    path: "/users/:id",
    element: <UserPage />,
  },
  {
    path: "/posts/:id",
    element: <PostPage />,
  },
]);
