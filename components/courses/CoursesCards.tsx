"use client";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid2,
  Stack,
  Pagination,
} from "@mui/material";
import {
  Person as PersonIcon,
  Category as CategoryIcon,
  AttachMoney,
  ArrowForward,
} from "@mui/icons-material";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosClient";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { CourseCard } from "../CourseCard";

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  instractor_name: string;
  speciality: string[];
  isenrolled: boolean;
  poster: string;
}

interface CoursesSectionProps {
  courses: Course[];
  baseUrl: string;
  totalPages: number;
  currentPage: number;
}

export function Courses({
  courses,
  baseUrl,
  totalPages,
  currentPage,
}: CoursesSectionProps) {
  const { isDarkMode } = useThemeContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      router.push(`/courses?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <Box
      sx={{
        py: { xs: 12, md: 12 },
        px: 5,
        background: isDarkMode
          ? "radial-gradient(circle at 20% 80%, #1784ad15 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4fa8c510 0%, transparent 50%)"
          : "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          background: isDarkMode
            ? "linear-gradient(135deg, #1784ad10 0%, #4fa8c505 100%)"
            : "linear-gradient(135deg, #1784ad10 0%, #4fa8c505 100%)",
          borderRadius: "50% 0 0 50%",
          transform: "translateX(25%)",
        }}
      />
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        <Grid2 container spacing={5}>
          {courses.map((course: Course) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={course.id}>
              <CourseCard course={course} />
            </Grid2>
          ))}
        </Grid2>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 6,
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                color: isDarkMode ? "#f9fafb" : "#1f2937",
                "&:hover": {
                  backgroundColor: isDarkMode ? "#1784ad50" : "#1784ad20",
                },
              },
              "& .Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
