import { Text } from "@chakra-ui/react";

export default function Nav() {
  return (
    <nav
      style={{
        width: "100vw",
        height: "70px",
        backgroundColor: "#808080",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 10px",
      }}
    >
      <span style={{ fontSize: "1.5rem" }}>반응속도 테스트</span>
    </nav>
  );
}
