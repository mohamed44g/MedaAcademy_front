"use client";
import { useEffect, useRef, useState } from "react";
import type React from "react";

import {
  Box,
  Container,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "أين نبدأ رحلتنا التعليمية؟",
    answer:
      "نبدأ بتقييم مستواك الحالي وتحديد أهدافك التعليمية، ثم نضع خطة مخصصة تناسب احتياجاتك في المجال الطبي.",
  },
  {
    question: "كيف نعمل معاً لتحقيق أهدافك؟",
    answer:
      "نوفر بيئة تعليمية تفاعلية مع مدربين خبراء، ونتابع تقدمك خطوة بخطوة مع دعم مستمر على مدار الساعة.",
  },
  {
    question: "لماذا MedA+ هي الأفضل؟",
    answer:
      "نتميز بخبرة 15+ عاماً، شهادات معتمدة دولياً، أحدث المناهج الطبية، ومعدل نجاح 98% مع أكثر من 10,000 طبيب متخرج.",
  },
  {
    question: "هل نحصل على أفضل دعم؟",
    answer:
      "نعم، نقدم دعماً شاملاً يشمل المتابعة الأكاديمية، الدعم التقني، والإرشاد المهني حتى بعد التخرج.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | false>(false);
  const theme = useTheme();
  const isdark = theme.palette.mode === "dark";

  useEffect(() => {
    gsap.fromTo(
      leftRef.current,
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
      rightRef.current,
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

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      ref={sectionRef}
      id="about"
      sx={{
        py: 10,
        background: isdark
          ? "radial-gradient(circle at 20% 80%, #1784ad15 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4fa8c510 0%, transparent 50%)"
          : "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        mt: 15,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 8,
          }}
        >
          {/* Right Side - About Info */}
          <Box
            ref={rightRef}
            sx={{ flex: 1, pl: 4, textAlign: { xs: "center", md: "right" } }}
          >
            <Typography
              variant="overline"
              sx={{
                color: "#1784ad",
                fontWeight: 600,
                fontSize: "0.9rem",
                letterSpacing: 2,
                mb: 2,
                display: "block",
              }}
            >
              من نحن
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
              ما الذي يجعلنا أفضل مدرسة طبية اونلاين؟
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                mb: 4,
              }}
            >
              أكاديمية MedA+ هي مؤسسة تعليمية رائدة متخصصة في تقديم برامج
              التعليم الطبي المتقدم. نحن نجمع بين الخبرة العملية والمعرفة
              النظرية لإعداد جيل جديد من المتخصصين الطبيين المؤهلين لمواجهة
              تحديات الرعاية الصحية المعاصرة.
            </Typography>

            <Button
              variant="text"
              sx={{
                color: "#1784ad",
                fontWeight: 600,
                fontSize: "1rem",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              المزيد
            </Button>
          </Box>

          <Box
            ref={leftRef}
            sx={{
              flex: 1,
              background: "linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)",
              borderRadius: 6,
              p: 6,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background decorative circles */}
            <Box
              sx={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -80,
                left: -80,
                width: 250,
                height: 250,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.05)",
              }}
            />
            {/* Left Side - FAQ Card */}
            <Box sx={{ position: "relative", zIndex: 2 }}>
              {faqs.map((faq, index) => (
                <Accordion
                  key={index}
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                  sx={{
                    mb: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "25px !important",
                    "&:before": { display: "none" },
                    boxShadow: "none",
                    overflow: "hidden",
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          backgroundColor: "#1784ad",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                        }}
                      >
                        <Add sx={{ fontSize: 20 }} />
                      </Box>
                    }
                    sx={{
                      px: 3,
                      py: 1.5,
                      "& .MuiAccordionSummary-content": {
                        margin: "12px 0",
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, color: "#1f2937" }}
                    >
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 3, pb: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", lineHeight: 1.6 }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
