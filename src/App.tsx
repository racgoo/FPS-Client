import "./App.css";
import { css } from "@emotion/react";
import BackgroundImage from "/login-asset/login-background.webp";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./view/NotFound";
import Login from "./view/Login";
import { ConfigProvider } from "antd";
import { antdTheme } from "./style/antd/theme";
import AlertProvider from "./components/provider/AlertProvider";
import Register from "./view/Register";
import CookieProvider from "./components/provider/CookieProvider";
import { RoutePath } from "./route/route.type";
import Home from "./view/Home";
import AuthProvider from "./components/provider/AuthProvider";
import { AnimatePresence } from "framer-motion";
import AnimatedLayout from "@src/components/layout/AnimatedLayout";

function App() {
  return (
    <CookieProvider>
      <ConfigProvider theme={antdTheme}>
        <AlertProvider>
          <BrowserRouter>
            <AuthProvider>
              <AppContent />
            </AuthProvider>
          </BrowserRouter>
        </AlertProvider>
      </ConfigProvider>
    </CookieProvider>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path={RoutePath.LOGIN}
          element={
            <AnimatedLayout>
              <Login />
            </AnimatedLayout>
          }
        />
        <Route
          path={RoutePath.REGISTER}
          element={
            <AnimatedLayout>
              <Register />
            </AnimatedLayout>
          }
        />
        <Route
          path={RoutePath.HOME}
          element={
            <AnimatedLayout>
              <Home />
            </AnimatedLayout>
          }
        />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </AnimatePresence>
  );
}

function useStyle() {
  return {
    container: css({
      display: "flex",
      justifyContent: "center",
      backgroundImage: `url(${BackgroundImage})`,
      backgroundOrigin: "border-box",
      backgroundSize: "cover",
      alignItems: "center",
      width: "100%",
      height: "100vh",
    }),
  };
}

export default App;
