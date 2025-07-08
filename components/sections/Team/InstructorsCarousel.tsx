"use client";
import { useRef, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InstructorCard } from "./InstructorCard";
import { useThemeContext } from "@/contexts/ThemeContext";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

interface Instructor {
  id: number;
  name: string;
  specialization: string;
  avatar: string;
  bio: string;
  created_at: string;
}

interface InstructorsCarouselProps {
  instructors: Instructor[];
  title?: string;
  subtitle?: string;
}

export function InstructorsCarousel({
  instructors,
  title = "فريقنا الطبي",
  subtitle = "تعرف على نخبة من الأطباء والخبراء الذين يقودون التعليم الطبي في أكاديمية MedA+",
}: InstructorsCarouselProps) {
  const { isDarkMode } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);

  // Animation on scroll
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
      },
    });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ".swiper-container",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.3"
      );
  }, []);

  const getSlidesPerView = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: 10,
        background: isDarkMode
          ? "radial-gradient(circle at 20% 80%, #1784ad15 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4fa8c510 0%, transparent 50%)"
          : "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 25% 25%, rgba(23, 132, 173, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(79, 168, 197, 0.03) 0%, transparent 50%)
          `,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            ref={titleRef}
            variant="h2"
            component="h2"
            sx={{
              mb: 3,
              fontWeight: 800,
              background: "linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xss: "2rem", xs: "2.5rem", md: "3.5rem" },
            }}
          >
            {title}
          </Typography>
          <Typography
            ref={subtitleRef}
            variant="body1"
            sx={{
              fontSize: "1.2rem",
              color: isDarkMode ? "#e5e7eb" : "#6b7280",
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        {/* Carousel */}
        <Box sx={{ position: "relative" }}>
          {/* Custom Navigation Buttons */}
          <IconButton
            onClick={() => swiperRef.current?.slidePrev()}
            sx={{
              position: "absolute",
              top: "50%",
              right: { xss: 10, md: -60 },
              transform: "translateY(-50%)",
              zIndex: 10,
              width: { xss: 30, xs: 56 },
              height: { xss: 30, xs: 56 },
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#1784ad",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#1784ad",
                color: "white",
                transform: "translateY(-50%) scale(1.1)",
                boxShadow: "0 12px 35px rgba(23, 132, 173, 0.3)",
              },
            }}
          >
            <ArrowForwardIos />
          </IconButton>

          <IconButton
            onClick={() => swiperRef.current?.slideNext()}
            sx={{
              position: "absolute",
              top: "50%",
              left: { xss: 10, md: -60 },
              transform: "translateY(-50%)",
              zIndex: 10,
              width: { xss: 40, xs: 56 },
              height: { xss: 40, xs: 56 },
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#1784ad",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#1784ad",
                color: "white",
                transform: "translateY(-50%) scale(1.1)",
                boxShadow: "0 12px 35px rgba(23, 132, 173, 0.3)",
              },
            }}
          >
            <ArrowBackIos />
          </IconButton>

          {/* Swiper */}
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={getSlidesPerView()}
            centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            effect="slide"
            loop={instructors.length > 3}
            className="swiper-container"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            style={{
              paddingBottom: "60px",
            }}
          >
            {instructors.map((instructor) => (
              <SwiperSlide key={instructor.id}>
                <Box sx={{ px: 2 }}>
                  <InstructorCard instructor={instructor} />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #1784ad !important;
          opacity: 0.3 !important;
          width: 12px !important;
          height: 12px !important;
          margin: 0 6px !important;
          transition: all 0.3s ease !important;
        }

        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          transform: scale(1.3) !important;
          background: linear-gradient(
            135deg,
            #1784ad 0%,
            #4fa8c5 100%
          ) !important;
        }

        .swiper-slide {
          transition: all 0.3s ease !important;
        }

        .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.8 !important;
          transform: scale(0.9) !important;
        }

        .swiper-slide-active {
          opacity: 1 !important;
          transform: scale(1) !important;
        }
      `}</style>
    </Box>
  );
}
