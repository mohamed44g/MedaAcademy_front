export const dynamic = "force-static";
import { Container, Box, Alert } from "@mui/material";
import { InstructorsCarousel } from "./InstructorsCarousel";
import axios from "axios";

// Server-side data fetching
async function getInstructors() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/instructors`
    );

    const data = response.data;
    if (data.status === "success") {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Error fetching instructors:", error);
    return [];
  }
}

export default async function InstructorsPage() {
  const instructors = await getInstructors();

  return (
    <Box sx={{ minHeight: "100vh", py: 4 }} id="team">
      <Container maxWidth="xl">
        {instructors.length > 0 ? (
          <InstructorsCarousel
            instructors={instructors}
            title="فريقنا الطبي المتميز"
            subtitle="تعرف على نخبة من الأطباء والباحثين المتخصصين من جامعة النجاح الوطنية الذين يقودون التعليم الطبي في أكاديمية MedA+"
          />
        ) : (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Alert severity="info" sx={{ maxWidth: 500, mx: "auto" }}>
              لا توجد بيانات متاحة حالياً. يرجى المحاولة لاحقاً.
            </Alert>
          </Box>
        )}
      </Container>
    </Box>
  );
}
