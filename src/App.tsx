import "./App.css";
import { css } from "@emotion/react";
import BackgroundImage from "/login-asset/login-background.webp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  const styles = useStyle();

  return (
    <CookieProvider>
      <ConfigProvider theme={antdTheme}>
        <AlertProvider>
          <BrowserRouter>
            <AuthProvider>
              <div css={styles.container}>
                <AppContent />
              </div>
            </AuthProvider>
          </BrowserRouter>
        </AlertProvider>
      </ConfigProvider>
    </CookieProvider>
  );
}

function AppContent() {
  return (
    <Routes>
      <Route path={RoutePath.LOGIN} element={<Login />}></Route>
      <Route path={RoutePath.REGISTER} element={<Register />}></Route>
      <Route path={RoutePath.HOME} element={<Home />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
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
