"use client";
import { useEffect, useRef } from "react";
import { Box, Container, Typography, Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "../animatedText";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    title: "الجودة العالية",
    color: "#FFD700",
  },
  {
    title: "المدربون الخبراء",
    color: "#1784ad",
  },
  {
    title: "برامج معتمدة",
    color: "#10B981",
  },
  {
    title: "دعم 24/7",
    color: "#8B5CF6",
  },
  {
    title: "تحديثات متكررة",
    color: "#F59E0B",
  },
  {
    title: "مجتمع طبي",
    color: "#EF4444",
  },
  {
    title: "التعلم المرن",
    color: "#06B6D4",
  },
  {
    title: "نمو مهني",
    color: "#84CC16",
  },
  {
    title: "تدريب عملي",
    color: "#EC4899",
  },
  {
    title: "تكنولوجيا حديثة",
    color: "#6366F1",
  },
  {
    title: "وصول للبحث",
    color: "#14B8A6",
  },
];

export default function WhySubscribeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const theme = useTheme();

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    const container = containerRef.current;
    const cardsContainer = cardsContainerRef.current;

    if (!cards.length || !container || !cardsContainer) return;

    // Set initial positions - cards start from random positions above the cards container
    cards.forEach((card, index) => {
      gsap.set(card, {
        x: Math.random() * 200 - 100,
        y: -Math.random() * 300 - 100,
        rotation: Math.random() * 360,
        scale: 0.3,
        opacity: 0,
      });
    });

    // Create the gravity animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate cards falling with gravity effect - inside the 80% container
    cards.forEach((card, index) => {
      const delay = index * 0.15;

      // الحاوية الفرعية 80% من الحاوية الرئيسية
      // عرض الحاوية الفرعية = 80% من 800px = 640px
      const cardsContainerWidth = 640;
      const cardWidth = 120;
      const availableWidth = cardsContainerWidth - cardWidth; // 520px

      // توزيع الكروت داخل الحاوية الفرعية فقط
      const spreadX = Math.random() * availableWidth - availableWidth / 2; // من -260 إلى +260
      const bottomY = 280 + (Math.random() * 40 - 20); // في قاع الحاوية الفرعية

      tl.to(
        card,
        {
          duration: 1,
          x: spreadX,
          y: bottomY,
          rotation: Math.random() * 10 - 5,
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          delay: delay,
        },
        0
      );
    });

    // Container entrance animation
    gsap.fromTo(
      container,
      {
        scale: 0.8,
        opacity: 0,
        rotationY: -15,
      },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      id="features"
      sx={{
        py: 12,
        mt: 10,
        backgroundColor: theme.palette.background.default,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 80%, ${theme.palette.primary.main}15 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, ${theme.palette.primary.light}10 0%, transparent 50%)`,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <AnimatedText
            variant="h2"
            component="h2"
            text="لماذا يجب عليك الاشتراك معنا؟"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              mb: 3,
            }}
          />

          <AnimatedText
            variant="body1"
            component="p"
            text="اكتشف الأسباب التي تجعل أكاديمية MedA+ الخيار الأمثل لتطوير مسيرتك الطبية"
            sx={{
              color: theme.palette.text.secondary,

              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.7,
            }}
          />
        </Box>

        <Box
          ref={containerRef}
          sx={{
            position: "relative",
            maxWidth: { xs: "800px", md: "900px" },
            mx: "auto",
            height: 400,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(145deg, #1f2937 0%, #374151 100%)"
                : "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)",
            borderRadius: 6,
            padding: { xs: 0, md: 4 },
            boxShadow:
              theme.palette.mode === "dark"
                ? "inset 0 2px 20px rgba(0,0,0,0.3), 0 25px 50px rgba(0,0,0,0.2)"
                : "inset 0 2px 20px rgba(0,0,0,0.1), 0 25px 50px rgba(0,0,0,0.1)",
            border:
              theme.palette.mode === "dark"
                ? "2px solid rgba(255,255,255,0.1)"
                : "2px solid rgba(0,0,0,0.05)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: -2,
              left: -2,
              right: -2,
              bottom: -2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
              borderRadius: 6,
              zIndex: -1,
              opacity: 0.3,
            },
          }}
        >
          <Box
            ref={cardsContainerRef}
            sx={{
              position: "absolute",
              top: "40%",
              right: { xs: "20%", md: "0%" },
              transform: {
                xs: "translate(-50%, -50%)",
                md: "translate(-50%, -50%)",
              },
              width: { xs: "80%", md: "90%" }, // 80% من الحاوية الرئيسية
              height: { xs: "80%", md: "80%" }, // 80% من ارتفاع الحاوية الرئيسية
            }}
          >
            {reasons.map((reason, index) => (
              <Card
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                sx={{
                  position: "absolute",
                  width: { xs: 100, md: 150 },
                  height: { xs: 50, md: 60 },
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(145deg, #374151 0%, #4b5563 100%)"
                      : "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                  borderRadius: 3,
                  border: `2px solid ${reason.color}60`,
                  boxShadow: `0 4px 15px ${reason.color}30, 0 0 15px ${reason.color}40`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  zIndex: index + 1,
                  "&:hover": {
                    transform: "translateY(-3px) scale(1.05)",
                    boxShadow: `0 8px 25px ${reason.color}50, 0 0 25px ${reason.color}60`,
                    borderColor: `${reason.color}80`,
                    zIndex: 999,
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 1,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    "&:last-child": { pb: 1 },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: reason.color,
                      fontSize: "0.75rem",
                      textShadow: `0 0 8px ${reason.color}50`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {reason.title}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
