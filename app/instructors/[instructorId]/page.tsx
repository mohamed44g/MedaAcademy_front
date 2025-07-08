import { Container, Box } from "@mui/material";
import { InstructorProfile } from "./components/InstructorProfile";
import { InstructorCourses } from "./components/InstructorCourses";
import axiosInstance from "@/lib/axiosServer";

export const dynamic = "force-dynamic";

interface InstructorPageProps {
  params: {
    instructorId: string;
  };
  searchParams: {
    page?: string;
    category?: string;
    level?: string;
  };
}

async function getInstructorData(instructorId: string) {
  try {
    const response = await axiosInstance.get(`/instructors/${instructorId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching instructor data:", error);
    throw error;
  }
}

async function getCoursesData(instructorId: string) {
  try {
    const response = await axiosInstance.get(
      `/courses/instructor/${instructorId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching courses data:", error);
    throw error;
  }
}

export default async function InstructorPage({
  params,
  searchParams,
}: InstructorPageProps) {
  const { instructorId } = params;
  const currentPage = Number.parseInt(searchParams.page || "1", 10);

  const instructorData = await getInstructorData(instructorId);
  const coursesData = await getCoursesData(instructorId);

  console.log(coursesData.courses);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        mt: 7.2,
      }}
    >
      {/* Instructor Profile Section */}
      <InstructorProfile instructor={instructorData} />

      {/* Instructor Courses Section */}
      <Container
        maxWidth="xl"
        sx={{ py: 10, backgroundColor: "background.default" }}
      >
        <InstructorCourses
          courses={coursesData.courses}
          pagination={coursesData.pagination}
          instructor={instructorData}
          currentPage={currentPage}
        />
      </Container>
    </Box>
  );
}
