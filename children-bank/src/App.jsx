import React from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/Router";

function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
