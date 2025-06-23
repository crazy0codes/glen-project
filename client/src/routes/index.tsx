import { Layout } from "@/layout";
import { LoginPage, SignupPage } from "@/pages/authPage";
import { AdminDashboardPage, UserDashboardPage } from "@/pages/dashboardPage";
import { DetailedPage } from "@/pages/detailedPage";
import { HomePage } from "@/pages/homePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const routes = (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage/>} />
      <Route path="details/:id" element={<DetailedPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="dashboard" element={<UserDashboardPage />} />
      <Route path="admin/dashboard" element={<AdminDashboardPage />} />
    </Route>
  </Routes>
);

export const AppBrowser = () => <BrowserRouter>{routes}</BrowserRouter>;
