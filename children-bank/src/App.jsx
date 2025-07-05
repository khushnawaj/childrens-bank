import React from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/Router";
import { ToastContainer } from "react-toastify";


import "react-toastify/dist/ReactToastify.css"; 

function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <AppRoutes />
         <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
      </main>
    </div>
  );
}

export default App;
