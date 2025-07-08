"use client";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid2,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  CalendarToday,
  Schedule,
  AttachMoney,
  ArrowForward,
  Sell,
} from "@mui/icons-material";
import { useThemeContext } from "@/contexts/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/animatedText";
import WorkShopCard from "@/components/workshops/workShopCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosClient";
import toast from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger, useGSAP);
export function WorkshopsClient({
  workshops,
  baseUrl,
}: {
  workshops: any;
  baseUrl: string;
}) {
  const { isDarkMode } = useThemeContext();
  const isMobile = useMediaQuery("(max-width: 900px)");
  const theme = useTheme();
  const isxss = useMediaQuery(theme.breakpoints.up("xss"));
  const { mutate } = useMutation({
    mutationFn: async (workshopId: number) => {
      const response = await axiosInstance.post(
        `/workshops/${workshopId}/enroll`
      );
      return response.data.data;
    },
    onSuccess: () => {
      toast.success("تم التسجيل بنجاح");
    },
    onError: (error: any) => {
      if (error.response) toast.error(error.response.data.message);
      else toast.error("حدث خطأ أثناء التسجيل");
    },
  });

  const enrollWorkshop = (workshopId: number) => {
    mutate(workshopId);
  };
  useGSAP(() => {
    gsap.from(".workshop-cards", {
      opacity: 0,
      y: 20,
      duration: 1,
      scrollTrigger: {
        trigger: ".workshop-cards",
        start: "top 80%",
        end: "bottom 20%",
      },
      stagger: 0.2,
    });
  });

  return (
    <Box
      id="workshops"
      sx={{
        py: { xss: 8, md: 12 },
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
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <AnimatedText
            variant="overline"
            component="span"
            text="ورشات"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              letterSpacing: 2,
              mb: 2,
              display: "block",
            }}
          />
          <AnimatedText
            variant="h2"
            component="h2"
            text="الورشات القادمة"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: "text.primary",
            }}
          />
        </Box>

        <Grid2
          container
          spacing={4}
          sx={{ justifyContent: "center" }}
          className="workshop-cards"
        >
          {workshops.map((workshop: any) => (
            <Grid2 size={{ xs: 10 }} key={workshop.id}>
              {isMobile ? (
                <WorkShopCard
                  workshop={workshop}
                  onEnroll={() => enrollWorkshop(workshop.id)}
                />
              ) : (
                <Card
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    height: { xs: 200, md: 280 },
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
                    <Grid2 container>
                      <Grid2 size={{ xs: 12, md: 4 }}>
                        <Box
                          sx={{
                            position: "relative",
                            height: { xs: 200, md: 280 },
                            overflow: "hidden",
                            borderRadius: {
                              xs: "16px 16px 0 0",
                              md: "16px 0 0 16px",
                            },
                          }}
                        >
                          <Image
                            src={`${baseUrl}${workshop.image}`}
                            alt={workshop.title}
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
                              {workshop.description}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid2>

                      <Grid2 size={{ xs: 12, md: 8 }}>
                        <Box
                          sx={{
                            p: { xs: 3, md: 4 },
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            variant="h4"
                            sx={{
                              fontWeight: 700,
                              mb: 3,
                              color: isDarkMode ? "#f9fafb" : "#1f2937",
                            }}
                          >
                            {workshop.title}
                          </Typography>

                          <Grid2 container spacing={3} sx={{ mb: 4, flex: 1 }}>
                            <Grid2 size={{ xs: 12, md: 4 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <CalendarToday
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
                                    التاريخ:
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      fontWeight: 600,
                                      color: "primary.main",
                                    }}
                                  >
                                    {workshop.formattedDate}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 4 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Schedule
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
                                    المدة:
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      fontWeight: 600,
                                      color: "primary.main",
                                    }}
                                  >
                                    {workshop.duration}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 4 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Sell
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
                                    {workshop.price} ₪
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid2>
                          </Grid2>

                          <Box
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                          >
                            <Button
                              variant="contained"
                              endIcon={<ArrowForward sx={{ mr: 1 }} />}
                              onClick={() => enrollWorkshop(workshop.id)}
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
                              التسجيل في الورشة
                            </Button>
                          </Box>
                        </Box>
                      </Grid2>
                    </Grid2>
                  </CardContent>
                </Card>
              )}
            </Grid2>
          ))}
        </Grid2>

        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            href="/workshops?page=1"
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
            عرض جميع الورشات
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
