import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/authProvider.tsx";
import Login from "./pages/login.page.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/private-route.tsx";
import HomeAdmin from "./pages/homeAdmin.page.tsx";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<App />} />
            <Route path="/homeAdmin" element={<PrivateRoute><HomeAdmin /></PrivateRoute>} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
