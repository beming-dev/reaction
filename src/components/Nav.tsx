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
      <Text fontSize="2xl">반응속도 테스트</Text>
    </nav>
  );
}
