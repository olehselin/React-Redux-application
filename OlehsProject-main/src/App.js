import { Provider } from "react-redux";
import "./App.css";
import { store } from "./store";
import { RouterProvider } from "react-router-dom";
import { router } from "./constants/router";
import MainLayout from "./components/Layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <MainLayout>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <ToastContainer />
    </MainLayout>
  );
}

export default App;
