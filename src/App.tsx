import "./App.css";
import { css } from "@emotion/react";
import BackgroundImage from "/login-asset/login-background.webp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./view/NotFound";
import Login from "./view/Login";
import { ConfigProvider } from "antd";
import { antdTheme } from "./style/antd/theme";
import Home from "./view/Home";
import AlertProvider from "./components/provider/AlertProvider";
import Register from "./view/Register";
import CookieProvider from "./components/provider/CookieProvider";

function App() {
  const styles = useStyle();

  // useEffect(() => {
  //   socket.connect();
  //   axios
  //     .post("http://localhost:4000/user-management/signin", {
  //       email: "lhsung987@naver.com",
  //       password: "racgoo98",
  //     })
  //     .then((res) => {
  //       setAuth(res.headers.authorization);
  //     });
  //   socket.on("disconnect", () => {
  //     console.log("disconnect");
  //   });
  // }, []);

  return (
    <CookieProvider>
      <ConfigProvider theme={antdTheme}>
        <AlertProvider>
          <div css={styles.container}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </BrowserRouter>
          </div>
        </AlertProvider>
      </ConfigProvider>
    </CookieProvider>
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
      width: "100vw",
      height: "100vh",
    }),
  };
}

export default App;
