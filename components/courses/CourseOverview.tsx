"use client";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid2,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";
import {
  Person,
  AccessTime,
  School,
  ExpandMore,
  Quiz,
  Lock,
  PlayCircleOutline,
} from "@mui/icons-material";
import { useThemeContext } from "@/contexts/ThemeContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axiosInstance from "@/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";

export function CourseOverview({
  courseId,
  courseData,
  isEnrolled,
}: {
  courseId: string;
  courseData: any;
  isEnrolled: boolean;
}) {
  const { isDarkMode } = useThemeContext();
  const router = useRouter();
  const course = courseData;
  const [expandedSection, setExpandedSection] = useState<string>("midterm");
  const { data, mutate } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(`/courses/${courseId}/enroll`, {
        courseId,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("تم الاشتراك في الكورس بنجاح");
      setTimeout(() => {
        router.push(`/courses/${courseId}/content`);
      }, 2000);
    },
    onError: (error: any) => {
      if (error.response) toast.error(error.response.data.message);
      else toast.error("حدث خطأ أثناء الاشتراك في الكورس");
    },
  });
  const calcTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    if (hours == 0 && minutes == 0 && seconds == 0) {
      return `لم يرفع الفديوهات بعد.`;
    }
    return `${hours} ساعة ${minutes} دقيقة ${seconds} ثواني`;
  };
  const handleSubscribe = async () => {
    mutate();
  };

  const handleSectionChange =
    (section: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedSection(isExpanded ? section : "");
    };

  return (
    <Box
      sx={{
        background: isDarkMode
          ? "radial-gradient(circle at 20% 80%, #1784ad15 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4fa8c510 0%, transparent 50%)"
          : "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        minHeight: "100vh",
        pt: { xs: 7, md: 8 },
      }}
    >
      {/* Course Header */}
      <Box
        sx={{
          background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
          color: "white",
          pt: { xs: 11, md: 12 },
          pb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid2 container spacing={4} alignItems="center">
            <Grid2 size={{ xs: 12, md: 8 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                {course.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, opacity: 0.9, fontSize: "1.1rem" }}
              >
                {course.description}
              </Typography>
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Person />
                  <Typography variant="body2">
                    {course.instractor_name}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTime />
                  <Typography variant="body2">
                    {calcTime(course.totalDuration)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PlayCircleOutline />
                  <Typography variant="body2">{course.totalVideos}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <School />
                  <Typography variant="body2">
                    {course.students_count} طالب
                  </Typography>
                </Box>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  background: isDarkMode
                    ? "rgba(30, 30, 30, 0.8)"
                    : "rgba(255, 255, 255, 0.8)",
                  p: 3,
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      position: "relative",
                      height: 200,
                      mb: 2,
                      borderRadius: 2,
                      overflow: "hidden",
                      textAlign: "right",
                    }}
                  >
                    <Image
                      src={`${axiosInstance.defaults.baseURL}${course.poster}`}
                      alt={course.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {course.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 2, mt: 2 }}
                  >
                    السعر : {course.price}
                  </Typography>
                  {isEnrolled ? (
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      href={`/courses/${courseId}/content`}
                      sx={{
                        borderRadius: 25,
                        px: 4,
                        py: 1.5,
                        background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: `0 12px 25px #1784ad40`,
                        },
                      }}
                    >
                      انت مشترك اكمل الكورس
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={handleSubscribe}
                      sx={{
                        borderRadius: 25,
                        px: 4,
                        py: 1.5,
                        background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: `0 12px 25px #1784ad40`,
                        },
                      }}
                    >
                      اشترك في الكورس
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      {/* Course Sections */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 600,
            color: isDarkMode ? "#f9fafb" : "#1f2937",
          }}
        >
          محتوى الكورس
        </Typography>

        {/* Midterm Section */}
        <Accordion
          expanded={expandedSection === "midterm"}
          onChange={handleSectionChange("midterm")}
          sx={{
            mb: 3,
            borderRadius: 3,
            "&:before": { display: "none" },
            boxShadow: isDarkMode ? 2 : 1,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{
              backgroundColor: isDarkMode
                ? "rgba(23, 132, 173, 0.1)"
                : "#f8f9fa",
              borderRadius: "12px 12px 0 0",
              px: 3,
              py: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: "100%",
              }}
            >
              <Quiz sx={{ color: "primary.main" }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {course.sections.midterm.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.sections.midterm.title}
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            {course.sections.midterm.chapters.map((chapter: any) => (
              <Card
                key={chapter.id}
                sx={{ m: 2, border: "1px solid", borderColor: "divider" }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {chapter.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {chapter.description}
                    </Typography>
                  </Box>
                  {chapter.videos.length > 0 && (
                    <List dense>
                      {chapter.videos.map((video: any) => (
                        <ListItem
                          key={video.id}
                          sx={{
                            borderRadius: 2,
                            mb: 1,
                          }}
                        >
                          <PlayCircleOutline color="primary" />
                          <ListItemText
                            primary={video.title}
                            sx={{
                              "& .MuiListItemText-primary": { fontWeight: 500 },
                              textAlign: "start",
                              ml: 2,
                            }}
                          />

                          <Typography variant="body2" color="text.secondary">
                            {video.duration}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Final Section */}
        <Accordion
          expanded={expandedSection === "final"}
          onChange={handleSectionChange("final")}
          sx={{
            borderRadius: 3,
            "&:before": { display: "none" },
            boxShadow: isDarkMode ? 2 : 1,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{
              backgroundColor: isDarkMode
                ? "rgba(23, 132, 173, 0.1)"
                : "#f8f9fa",
              borderRadius: "12px 12px 0 0",
              px: 3,
              py: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: "100%",
              }}
            >
              <Quiz sx={{ color: "primary.main" }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {course.sections.final.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.sections.final.description}
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            {course.sections.final.chapters.map((chapter: any) => (
              <Card
                key={chapter.id}
                sx={{ m: 2, border: "1px solid", borderColor: "divider" }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {chapter.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {chapter.description}
                    </Typography>
                  </Box>
                  {chapter.videos.length > 0 && (
                    <List dense>
                      {chapter.videos.map((video: any) => (
                        <ListItem
                          key={video.id}
                          sx={{
                            borderRadius: 2,
                            mb: 1,
                          }}
                        >
                          <PlayCircleOutline color="primary" />
                          <ListItemText
                            primary={video.title}
                            sx={{
                              "& .MuiListItemText-primary": { fontWeight: 500 },
                              textAlign: "start",
                              ml: 2,
                            }}
                          />

                          <Typography variant="body2" color="text.secondary">
                            {video.duration}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            ))}
          </AccordionDetails>
        </Accordion>
      </Container>
    </Box>
  );
}
