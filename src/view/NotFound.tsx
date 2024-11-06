import { css } from "@emotion/react";

function NotFound() {
  const styles = useStyle();

  return (
    <div css={styles.container}>
      <div css={styles.content}>
        <h1>404</h1>
        <p>페이지를 찾을 수 없습니다</p>
      </div>
    </div>
  );
}

function useStyle() {
  return {
    container: css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
      backgroundColor: "#f5f5f5",
    }),
    content: css({
      textAlign: "center",
      "& h1": {
        fontSize: "72px",
        color: "#333",
        margin: "0 0 20px 0",
      },
      "& p": {
        fontSize: "24px",
        color: "#666",
      },
    }),
  };
}

export default NotFound;
