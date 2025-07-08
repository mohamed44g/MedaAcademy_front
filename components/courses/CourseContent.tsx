"use client";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid2,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
} from "@mui/material";
import {
  ExpandMore,
  PlayCircleOutline,
  Quiz,
  School,
  CheckCircle,
  Person,
  AccessTime,
} from "@mui/icons-material";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useState } from "react";
import Link from "next/link";
import { mockCourseContent } from "@/lib/mockCourse";

export function CourseContent({
  courseId,
  courseContent,
}: {
  courseId: string;
  courseContent: any;
}) {
  const { isDarkMode } = useThemeContext();
  const [expandedSection, setExpandedSection] = useState<string>("midterm");
  const course = courseContent;

  const calcTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    if (hours == 0 && minutes == 0 && seconds == 0) {
      return `لم يرفع الفديوهات بعد.`;
    }
    return `${hours} ساعة ${minutes} دقيقة ${seconds} ثواني`;
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
        minHeight: { xss: "110vh", sx: "100vh" },
        pt: { xss: 7, md: 8 },
      }}
    >
      {/* Course Header */}
      <Box
        sx={{
          background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
          color: "white",
          pt: { xss: 11, md: 12 },
          pb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid2
            container
            spacing={4}
            alignItems="center"
            justifyContent={"center"}
          >
            <Grid2 size={{ xss: 12, md: 8 }}>
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
                    {course.studentsCount} طالب
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  التقدم في الكورس: {course.progress}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={course.progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "rgba(255,255,255,0.2)",
                    "& .MuiLinearProgress-bar": { backgroundColor: "white" },
                  }}
                />
              </Box>
            </Grid2>
            <Grid2 size={{ xss: 12, md: 4 }}>
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
                  <Typography
                    variant="h4"
                    color="primary"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    مشترك
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    component={Link}
                    href={`/courses/${course.id}/chapter/${
                      course.sections.midterm.chapters[0]?.id || 1
                    }`}
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
                    متابعة التعلم
                  </Button>
                </CardContent>
              </Card>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      {/* Course Content */}
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
                  {course.sections.midterm.description}
                </Typography>
              </Box>
              <Chip
                label={`${course.sections.midterm.chapters.length} فصول`}
                color="primary"
                variant="outlined"
                size="small"
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            {course.sections.midterm.chapters.map((chapter: any) => (
              <Card
                key={chapter.id}
                sx={{
                  m: { xss: 1, xs: 2 },
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <CardContent sx={{ p: { xss: 2, xs: 3 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 1,
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {chapter.title}
                        </Typography>
                        {chapter.isCompleted && <CheckCircle color="success" />}
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {chapter.description}
                      </Typography>
                    </Box>
                  </Box>
                  {chapter.videos.length > 0 && (
                    <List dense>
                      {chapter.videos.map((video: any) => (
                        <ListItem
                          key={video.id}
                          component={Link}
                          href={`/courses/${course.id}/videos/${video.id}`}
                          sx={{
                            borderRadius: 2,
                            mb: 1,
                            "&:hover": {
                              backgroundColor: isDarkMode
                                ? "#2a2a2a"
                                : "#f5f5f5",
                            },
                            textDecoration: "none",
                            color: "inherit",
                          }}
                        >
                          <ListItemIcon>
                            {video.isCompleted ? (
                              <CheckCircle color="success" />
                            ) : (
                              <PlayCircleOutline color="primary" />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={video.title}
                            sx={{
                              "& .MuiListItemText-primary": {
                                fontWeight: video.isCompleted ? 400 : 500,
                                textDecoration: video.isCompleted
                                  ? "line-through"
                                  : "none",
                                textAlign: "start",
                              },
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
              <School sx={{ color: "primary.main" }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {course.sections.final.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.sections.final.description}
                </Typography>
              </Box>
              <Chip
                label={`${course.sections.final.chapters.length} فصول`}
                color="primary"
                variant="outlined"
                size="small"
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            {course.sections.final.chapters.map((chapter: any) => (
              <Card
                key={chapter.id}
                sx={{
                  m: { xss: 1, xs: 2 },
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <CardContent sx={{ p: { xss: 2, xs: 3 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 1,
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {chapter.title}
                        </Typography>
                        {chapter.isCompleted && <CheckCircle color="success" />}
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {chapter.description}
                      </Typography>
                    </Box>
                  </Box>
                  {chapter.videos.length > 0 && (
                    <List dense>
                      {chapter.videos.map((video: any) => (
                        <ListItem
                          key={video.id}
                          component={Link}
                          href={`/courses/${course.id}/video/${video.id}`}
                          sx={{
                            borderRadius: 2,
                            mb: 1,
                            "&:hover": {
                              backgroundColor: isDarkMode
                                ? "#2a2a2a"
                                : "#f5f5f5",
                            },
                            textDecoration: "none",
                            color: "inherit",
                          }}
                        >
                          <ListItemIcon>
                            {video.isCompleted ? (
                              <CheckCircle color="success" />
                            ) : (
                              <PlayCircleOutline color="primary" />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={video.title}
                            sx={{
                              "& .MuiListItemText-primary": {
                                fontWeight: video.isCompleted ? 400 : 500,
                                textDecoration: video.isCompleted
                                  ? "line-through"
                                  : "none",
                                textAlign: "start",
                              },
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
