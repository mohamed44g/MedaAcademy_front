import { Box, Container } from "@mui/material";
import ForgetPasswordForm from "./ForgetPasswordForm";

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 15,
      }}
    >
      <Container maxWidth="sm">
        <ForgetPasswordForm />
      </Container>
    </Box>
  );
}
