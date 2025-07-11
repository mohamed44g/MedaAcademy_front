import { Box, Container, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import NextLink from "next/link";
import LoginForm from "./loginform";

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "background.default",
        display: "flex",
        alignItems: "center",
        py: 15,
      }}
    >
      <Container maxWidth="sm">
        <LoginForm />
      </Container>
    </Box>
  );
}
