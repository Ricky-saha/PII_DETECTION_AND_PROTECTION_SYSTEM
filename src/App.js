import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./Pages/signup";
import Login from "./Pages/login";
import UploadDocuments from "./Pages/uploadedDocument";
import AdminDashboard from "./Pages/Admin/dashboard";
import Home from "./Pages/Home";
import "./App.css";
import PreviewDocument from "./Pages/PreviewDocument";
<<<<<<< HEAD
import AdminPanel from "./components/AdminPanel/AdminPanel";
import RequestPanel from "./components/RequestPanel/RequestPanel";
=======
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/upload-documents",
      element: <UploadDocuments />,
    },
    {
      path: "/admin-dashboard",
      element: <AdminDashboard />,
    },
    {
      path: "/preview-document",
      element: <PreviewDocument/>,
<<<<<<< HEAD
    },  
    {
      path: "/admin-panel",
      element: <AdminPanel/>,
    },
    {
      path: "/request-panel",
      element: <RequestPanel/>,
=======
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
