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
      }}
    >
      <Container maxWidth="sm">
        {/* Back to Home Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            component={NextLink}
            href="/"
            startIcon={<ArrowBack />}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            العودة للرئيسية
          </Button>
        </Box>

        <LoginForm />
      </Container>
    </Box>
  );
}
