"use client";
import { useEffect, useRef, useState } from "react";
import type React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { Send, WhatsApp, ArrowForwardIos } from "@mui/icons-material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [showAlert, setShowAlert] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: 10,
        mt: 10,
      }}
    >
      <Container maxWidth="lg">
        {showAlert && (
          <Alert severity="success" sx={{ mb: 4 }}>
            تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
          </Alert>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
          }}
        >
          {/* Right Side - Contact Form */}
          <Box
            ref={rightRef}
            sx={{
              flex: 1,
              order: { xs: 2, md: 1 },
              background:
                "linear-gradient(135deg, #1784ad 0%, #4fa8c5 50%, #1784ad 100%)",
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

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ position: "relative", zIndex: 2 }}
            >
              <TextField
                fullWidth
                placeholder="Your Name.."
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 3,
                    color: "white",
                    "& fieldset": { border: "none" },
                    "& input::placeholder": {
                      color: "rgba(255, 255, 255, 0.8)",
                      opacity: 1,
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                placeholder="Your E-mail.."
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 3,
                    color: "white",
                    "& fieldset": { border: "none" },
                    "& input::placeholder": {
                      color: "rgba(255, 255, 255, 0.8)",
                      opacity: 1,
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                placeholder="Your Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                required
                sx={{
                  mb: 4,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 3,
                    color: "white",
                    "& fieldset": { border: "none" },
                    "& textarea::placeholder": {
                      color: "rgba(255, 255, 255, 0.8)",
                      opacity: 1,
                    },
                  },
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    color: "#1784ad",
                    borderRadius: 25,
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                  }}
                >
                  ارسال الرسالة الآن
                </Button>

                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    backgroundColor: "#25D366",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                    transition: "transform 0.3s ease",
                  }}
                >
                  <WhatsApp sx={{ color: "white", fontSize: 24 }} />
                </Box>
              </Box>
            </Box>
          </Box>
          {/* Left Side - Contact Info */}
          <Box
            ref={leftRef}
            sx={{
              flex: 1,
              order: { xs: 1, md: 2 },
              textAlign: { xs: "center", md: "right" },
            }}
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
              تواصل معنا
            </Typography>

            <Typography
              variant="h2"
              sx={{
                color: "text.primary",
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "2.5rem" },
                mb: 4,
                lineHeight: 1.2,
              }}
            >
              اتصل بنا في أي وقت
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                mb: 6,
              }}
            >
              شكراً لاختيارك أكاديمية MedA+. نحن نقدم لك أفضل البرامج التدريبية
              الطبية مجاناً بنسبة 100%. يمكنك دعمنا من خلال مشاركة موقعنا مع
              أصدقائك.
            </Typography>

            {/* Special Offer */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)",
                  borderRadius: "50px 20px 50px 20px",
                  p: 3,
                  color: "white",
                  textAlign: "center",
                  minWidth: 120,
                }}
              >
                <Typography variant="body2" sx={{ fontSize: "0.8rem", mb: 1 }}>
                  خصم
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, fontSize: "2.5rem" }}
                >
                  50%
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 1 }}
                >
                  متاح حتى:{" "}
                  <span style={{ color: "#1784ad", fontWeight: 600 }}>
                    24 APRIL 2036
                  </span>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "#1f2937", fontWeight: 600 }}
                >
                  عرض خاص <span style={{ color: "#1784ad" }}>50% خصم!</span>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
