import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/authProvider.tsx";
import Login from "./pages/login.page.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/private-route.tsx";
import { Toaster } from "sonner";
import Users from "./pages/user.page.tsx";
import Report from "./pages/report.page.tsx";
import ListReport from "./pages/report-table.page.tsx";
import ClientPage from "./pages/clients.page.tsx";

import StudyPage from "./pages/studies.page.tsx";
import DetailStudy from "./pages/details-study.page.tsx";
import Home from "./pages/home.page.tsx";
import HistoricPage from "./pages/historic.page.tsx";
import DetailBilling from "./modules/billings/billing-details.tsx";
import HomeSupervisor from "./pages/home-supervisor.page.tsx";
import ExecutivePage from "./pages/executives.page.tsx";


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
            <Route path="/homeAdmin" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
            <Route path="/report" element={<PrivateRoute><Report /></PrivateRoute>} />
            <Route path="/list" element={<PrivateRoute><ListReport /></PrivateRoute>} />
            <Route path="/client-list" element={<PrivateRoute><ClientPage /></PrivateRoute>} />
            <Route path="/create-study" element={<PrivateRoute>< StudyPage /></PrivateRoute>} />
            <Route path="/data-studies" element={<PrivateRoute>< DetailStudy /></PrivateRoute>} />
            <Route path="/completed" element={<PrivateRoute>< HistoricPage /></PrivateRoute>} />
            <Route path="/detail-billing" element={<PrivateRoute>< DetailBilling /></PrivateRoute>} />
            <Route path="/home" element={<PrivateRoute>< HomeSupervisor /></PrivateRoute>} />
            <Route path="/executive" element={<PrivateRoute><ExecutivePage /></PrivateRoute>} />


          </Routes>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
