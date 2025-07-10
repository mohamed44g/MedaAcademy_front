"use client";
import { Box, Container } from "@mui/material";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
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
        <ResetPasswordForm />
      </Container>
    </Box>
  );
}
