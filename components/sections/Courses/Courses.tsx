"use client";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Grid2,
  useTheme,
} from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import axiosInstance from "@/lib/axiosClient";
import Link from "next/link";
import AnimatedText from "@/components/animatedText";

gsap.registerPlugin(ScrollTrigger);

export function Courses({
  courses,
  specialties,
}: {
  courses: any;
  specialties: any;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("Show All");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const theme = useTheme();
  const isdark = theme.palette.mode === "dark";

  useEffect(() => {
    if (selectedCategory === "Show All") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter(
          (course: any) => course.specialty_name === selectedCategory
        )
      );
    }
  }, [selectedCategory]);

  console.log(`${process.env.NEXT_PUBLIC_API_URL}${courses[0].poster}`);

  return (
    <Box
      ref={sectionRef}
      id="courses"
      sx={{
        py: 10,
        mt: 10,
        background: isdark
          ? "radial-gradient(circle at 20% 80%, #1784ad15 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4fa8c510 0%, transparent 50%);"
          : "#fff",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <AnimatedText
            variant="overline"
            component="span"
            text="احدث الدورات"
            sx={{
              color: "#1784ad",
              fontWeight: 600,
              fontSize: "0.9rem",
              letterSpacing: 2,
              mb: 2,
              display: "block",
            }}
          />

          <AnimatedText
            variant="h2"
            component="h2"
            sx={{
              color: "text.primary",
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.5rem" },
              mb: 4,
            }}
            text="احدث الدورات الطبية"
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            {specialties.map((specialty: any) => (
              <Button
                key={specialty.id}
                onClick={() => setSelectedCategory(specialty.name)}
                variant={
                  selectedCategory === specialty.name ? "contained" : "outlined"
                }
                sx={{
                  borderRadius: 25,
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontWeight: 500,
                  backgroundColor:
                    selectedCategory === specialty.name
                      ? "#1784ad"
                      : "transparent",
                  borderColor: "#1784ad",
                  color:
                    selectedCategory === specialty.name ? "white" : "#1784ad",
                  "&:hover": {
                    backgroundColor:
                      selectedCategory === specialty.name
                        ? "#0f5a78"
                        : "rgba(23, 132, 173, 0.1)",
                  },
                }}
              >
                {specialty.name}
              </Button>
            ))}
            <Button
              key="Show All"
              onClick={() => setSelectedCategory("Show All")}
              variant={
                selectedCategory === "Show All" ? "contained" : "outlined"
              }
              sx={{
                borderRadius: 25,
                px: 3,
                py: 1,
                textTransform: "none",
                fontWeight: 500,
                backgroundColor:
                  selectedCategory === "Show All" ? "#1784ad" : "transparent",
                borderColor: "#1784ad",
                color: selectedCategory === "Show All" ? "white" : "#1784ad",
                "&:hover": {
                  backgroundColor:
                    selectedCategory === "Show All"
                      ? "#0f5a78"
                      : "rgba(23, 132, 173, 0.1)",
                },
              }}
            >
              جميع التخصصات
            </Button>
          </Box>
        </Box>

        <Grid2 container spacing={4}>
          {filteredCourses.map((course: any, index: any) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                className="course-card"
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  overflow: "hidden",
                  position: "relative",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    sx={{ position: "relative", width: "100%", height: 250 }}
                  >
                    <Image
                      src={`${axiosInstance.defaults.baseURL}${course.poster}`}
                      alt={course.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </CardMedia>

                  {/* Category Chip */}
                  <Chip
                    label={course.specialty_name}
                    sx={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      color: "#1784ad",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />

                  {/* Price Circle */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
                  >
                    {course.price}
                  </Box>
                </Box>

                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#1784ad",
                      fontWeight: 500,
                      mb: 1,
                    }}
                  >
                    {course.instractor_name}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary",
                      lineHeight: 1.3,
                    }}
                  >
                    {course.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>

        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            href="/courses?page=1"
            prefetch={false}
            sx={{
              borderRadius: 25,
              px: 4,
              py: 1.5,
              borderColor: "primary.main",
              color: "primary.main",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
                transform: "translateY(-2px)",
              },
            }}
          >
            عرض جميع الدورات
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
