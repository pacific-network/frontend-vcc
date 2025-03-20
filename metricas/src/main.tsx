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
import Users from "./pages/user.page.tsx";
import Report from "./pages/report.page.tsx";
import ListReport from "./pages/report-table.page.tsx";
import ClientPage from "./pages/clients.page.tsx";

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
            <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
            <Route path="/report" element={<PrivateRoute><Report /></PrivateRoute>} />
            <Route path="/list" element={<PrivateRoute><ListReport /></PrivateRoute>} />
            <Route path="/client-list" element={<PrivateRoute><ClientPage /></PrivateRoute>} />


          </Routes>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
