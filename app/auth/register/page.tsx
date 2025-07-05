// app/auth/register/page.tsx
import { Box, Container, Card, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import NextLink from "next/link";
import RegisterForm from "./RegisterForm";
import { getSpecialties } from "../../../lib/api/specialties";

// Fetch specialties at build time
async function fetchSpecialties() {
  try {
    const specialties = await getSpecialties();
    return specialties;
  } catch (error) {
    console.error("Failed to fetch specialties:", error);
    return [];
  }
}

// Optional: Enable ISR
export const revalidate = 86400;

export default async function RegisterPage() {
  const specialties = await fetchSpecialties();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "background.default",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        {/* Back to Home Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            component={NextLink}
            href="/"
            startIcon={<ArrowBack />}
            sx={{
              color: "text.primary",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            العودة للرئيسية
          </Button>
        </Box>

        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          <RegisterForm specialties={specialties} />
        </Card>
      </Container>
    </Box>
  );
}
