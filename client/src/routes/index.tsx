import { Layout } from "@/layout";
import { LoginPage, SignupPage } from "@/pages/authPage";
import { DashboardPage } from "@/pages/dashboardPage";
import { DetailedPage } from "@/pages/detailedPage";
import { HomePage } from "@/pages/homePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes";

const routes = (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="listings/:id" element={<DetailedPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage/>
          </ProtectedRoute>
        }
      />
    </Route>
  </Routes>
);

export const AppBrowser = () => <BrowserRouter>{routes}</BrowserRouter>;
