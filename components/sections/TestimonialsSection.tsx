"use client";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  IconButton,
  useTheme,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "د. أحمد محمد",
    role: "طبيب قلب متخصص",
    image: "/placeholder.svg?height=100&width=100",
    comment:
      "أكاديمية MedA+ غيرت مسيرتي المهنية بالكامل. الكورسات عالية الجودة والمحتوى محدث باستمرار. أنصح كل طبيب بالانضمام لهذه الأكاديمية المتميزة.",
  },
  {
    name: "د. فاطمة علي",
    role: "طبيبة أطفال استشارية",
    image: "/placeholder.svg?height=100&width=100",
    comment:
      "التدريب العملي والنظري متوازن بشكل ممتاز. الشهادات معتمدة والمحتوى متطور جداً. تجربة تعليمية لا تُنسى مع أفضل الخبراء في المجال الطبي.",
  },
  {
    name: "د. محمود حسن",
    role: "طبيب طوارئ",
    image: "/placeholder.svg?height=100&width=100",
    comment:
      "المدربون خبراء في مجالهم والشهادات معتمدة دولياً. استثمار ممتاز في المستقبل المهني. المنهج شامل ومحدث باستمرار مع أحدث التطورات الطبية.",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isdark = theme.palette.mode === "dark";
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    gsap.fromTo(
      ".testimonial-content",
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".testimonial-info",
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: 10,
        mt: 10,
        background: isdark
          ? "radial-gradient(circle at 20% 80%, #1784ad15 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4fa8c510 0%, transparent 50%);"
          : "#f8f9fa",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xss: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
          }}
        >
          {/* Right Side - Section Info */}
          <Box
            className="testimonial-info"
            sx={{ flex: 1, pl: 0, textAlign: { xss: "center", md: "right" } }}
          >
            <Typography
              variant="overline"
              sx={{
                color: "#1784ad",
                fontWeight: 600,
                fontSize: "0.9rem",
                letterSpacing: 1,
                mb: 2,
                display: "block",
              }}
            >
              تقيمات
            </Typography>

            <Typography
              variant="h2"
              sx={{
                color: "text.primary",
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "2.5rem" },
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              ماذا يقولون عنا؟
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                textAlign: "justify",
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              استمع لآراء حقيقية من طلاب الطب الذين خاضوا التجربة التعليمية
              معنا. نفتخر بأن نكون جزءًا من رحلة تطوّر كل طالب. تعرّف على نخبة
              من طلاب الطب والباحثين المتخصصين من الجامعات الفلسطينية الذين
              يقودون التعليم الطبي في MedA+.
            </Typography>
          </Box>

          {/* Left Side - Testimonial Card */}
          <Box
            className="testimonial-content"
            sx={{
              flex: 1,
              background: "linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)",
              borderRadius: 6,
              p: { xss: 4, xs: 6 },
              color: "white",
              position: "relative",
              minHeight: 400,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Background decorative circles */}
            <Box
              sx={{
                position: "absolute",
                top: -20,
                right: -20,
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -30,
                left: -30,
                width: 150,
                height: 150,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.05)",
              }}
            />

            <Typography
              variant="body1"
              sx={{
                fontSize: "1.3rem",
                lineHeight: 1.8,
                fontStyle: "italic",
                mb: 4,
                position: "relative",
                zIndex: 2,
              }}
            >
              "{currentTestimonial.comment}"
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                zIndex: 2,
                gap: 1,
              }}
            >
              <Avatar
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                sx={{
                  width: { xxs: 60, xs: 80 },
                  height: { xxs: 60, xs: 80 },
                  mr: 3,
                  border: "3px solid rgba(255, 255, 255, 0.3)",
                }}
              />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {currentTestimonial.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {currentTestimonial.role}
                </Typography>
              </Box>
            </Box>

            {/* Navigation arrows */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                mt: 2,
              }}
            >
              <IconButton
                onClick={prevTestimonial}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                  },
                }}
              >
                <ArrowBackIos />
              </IconButton>
              <IconButton
                onClick={nextTestimonial}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                  },
                }}
              >
                <ArrowForwardIos />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
