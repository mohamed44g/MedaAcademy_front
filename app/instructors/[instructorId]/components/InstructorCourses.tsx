"use client";
import { Box, Typography, Grid2 } from "@mui/material";
import { useThemeContext } from "@/contexts/ThemeContext";
import { CourseCard } from "@/components/CourseCard";
import { CoursesPagination } from "./CoursesPagination";

interface InstructorCoursesProps {
  courses: any[];
  pagination: any;
  instructor: any;
  currentPage: number;
}

export function InstructorCourses({
  courses,
  pagination,
  instructor,
  currentPage,
}: InstructorCoursesProps) {
  const { isDarkMode } = useThemeContext();

  return (
    <Box sx={{ backgroundColor: "background.defaults" }}>
      {/* Enhanced Section Header */}
      <Box
        sx={{
          mb: 8,
          textAlign: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(23, 132, 173, 0.1) 0%, transparent 70%)",
            zIndex: -1,
          },
        }}
        id="courses"
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            color: isDarkMode ? "#f9fafb" : "#1f2937",
            mb: 3,
            background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          كورسات {instructor.name}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "text.secondary",
            mb: 6,
            fontWeight: 500,
          }}
        >
          استكشف جميع الكورسات المتاحة ({pagination.totalCourses} كورس)
        </Typography>
      </Box>

      {/* Enhanced Courses Grid */}
      <Grid2 container spacing={5} alignItems="center" justifyContent="center">
        {courses.map((course, index) => (
          <Grid2 size={{ xss: 11, sm: 6, lg: 4 }} key={course.id}>
            <Box
              sx={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                "@keyframes fadeInUp": {
                  "0%": {
                    opacity: 0,
                    transform: "translateY(30px)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                },
              }}
            >
              <CourseCard course={course} />
            </Box>
          </Grid2>
        ))}
      </Grid2>

      <Box sx={{ mt: 8 }}>
        <CoursesPagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          hasNextPage={pagination.hasNextPage}
          hasPreviousPage={pagination.hasPreviousPage}
        />
      </Box>
    </Box>
  );
}
