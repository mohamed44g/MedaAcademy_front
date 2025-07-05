"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  Grid2,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Chip,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useThemeContext } from "@/contexts/ThemeContext";
import { CourseCard } from "./CourseCard";
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

  const categories = [
    { value: "", label: "جميع التخصصات" },
    { value: "cardiology", label: "طب القلب" },
    { value: "anatomy", label: "التشريح" },
    { value: "diagnosis", label: "التشخيص" },
    { value: "surgery", label: "الجراحة" },
  ];

  const filterTabs = [
    { label: "الكل", count: pagination.totalCourses },
    { label: "الأكثر شعبية", count: courses.filter((c) => c.isPopular).length },
    { label: "خصومات", count: courses.filter((c) => c.hasDiscount).length },
    { label: "جديد", count: 3 },
  ];

  return (
    <Box>
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
      <Grid2 container spacing={5}>
        {courses.map((course, index) => (
          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }} key={course.id}>
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
              <CourseCard course={course} instructor={instructor} />
            </Box>
          </Grid2>
        ))}
      </Grid2>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Box sx={{ mt: 8 }}>
          <CoursesPagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            hasNextPage={pagination.hasNextPage}
            hasPreviousPage={pagination.hasPreviousPage}
          />
        </Box>
      )}
    </Box>
  );
}
