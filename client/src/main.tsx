import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import App from './App.jsx';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ErrorPage from './pages/Error';
import AddCarForm from "./pages/addCar";
import AddEmployeeForm from "./pages/addEmployee";
import AddContractorPostForm from "./pages/addContractorPost";
import AddCustomerPostForm from "./pages/addCustomerPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profiles/:username",
        element: <Profile />,
      },
      {
        path: "/me",
        element: <Profile />,
      },
      {
        path: "/addContractorPost",
        element: <AddContractorPostForm />,
      },
      {
        path: "/addCustomerPost/:userId",
        element: <AddCustomerPostForm />,
      },
      {
        path: "/addCarForm",
        element: <AddCarForm />,
      },
      {
        path: "/addEmployee",
        element: <AddEmployeeForm />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
