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

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  instractor_name: string;
  specialty_name: string;
  poster: string;
}

interface CoursesSectionProps {
  courses: Course[];
  baseUrl: string;
  totalPages: number;
  currentPage: number;
}

export function Courses({
  courses: initialCourses,
  baseUrl,
  totalPages: initialTotalPages,
  currentPage: initialCurrentPage,
}: CoursesSectionProps) {
  const { isDarkMode } = useThemeContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const {
    data: { courses, totalPages } = {
      courses: initialCourses,
      totalPages: initialTotalPages,
    },
  } = useQuery({
    queryKey: ["courses", currentPage],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/courses?page=${currentPage}&limit=6`
      );
      const { data, total } = response.data.data;
      const courses = data.map((course: any) => ({
        id: course.id,
        title: course.title,
        description: course.description,
        price: parseFloat(course.price),
        instractor_name: course.instractor_name,
        specialty_name: course.specialty_name,
        poster: course.poster,
      }));
      return { courses, totalPages: Math.ceil(parseInt(total) / 6) };
    },
    initialData: { courses: initialCourses, totalPages: initialTotalPages },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

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
        background: isDarkMode
          ? "radial-gradient(circle at 20% 80%, #1784ad15 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4fa8c510 0%, transparent 50%)"
          : "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        position: "relative",
        overflow: "hidden",
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
        <Grid2 container spacing={4}>
          {courses.map((course: Course) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
              <Card
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 20px 40px #1784ad20`,
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Stack direction="column">
                    <Box
                      sx={{
                        position: "relative",
                        height: { xs: 200, md: 280 },
                        overflow: "hidden",
                        borderRadius: "16px 16px 0 0",
                      }}
                    >
                      <Image
                        src={`${baseUrl}${course.poster}`}
                        alt={course.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
                          borderRadius: 2,
                          px: 2,
                          py: 1,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: "white", fontWeight: 600 }}
                        >
                          {course.specialty_name}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        p: { xs: 3, md: 4 },
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: isDarkMode ? "#f9fafb" : "#1f2937",
                        }}
                      >
                        {course.title}
                      </Typography>

                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <PersonIcon
                          sx={{
                            color: "primary.main",
                            fontSize: 20,
                          }}
                        />
                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontWeight: 500 }}
                          >
                            المدرب:
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 600,
                              color: "primary.main",
                            }}
                          >
                            {course.instractor_name}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <CategoryIcon
                          sx={{
                            color: "primary.main",
                            fontSize: 20,
                          }}
                        />
                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontWeight: 500 }}
                          >
                            التخصص:
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 600,
                              color: "primary.main",
                            }}
                          >
                            {course.specialty_name}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AttachMoney
                          sx={{
                            color: "primary.main",
                            fontSize: 20,
                          }}
                        />
                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontWeight: 500 }}
                          >
                            السعر:
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 600,
                              color: "primary.main",
                            }}
                          >
                            {course.price} جنيه
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                          variant="contained"
                          endIcon={<ArrowForward />}
                          component={Link}
                          href={`/courses/${course.id}`}
                          sx={{
                            borderRadius: 25,
                            px: 4,
                            py: 1.5,
                            background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
                            boxShadow: `0 8px 20px #1784ad30`,
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: `0 12px 25px #1784ad40`,
                            },
                          }}
                        >
                          التسجيل في الكورس
                        </Button>
                      </Box>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
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
