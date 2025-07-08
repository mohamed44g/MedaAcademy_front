"use client";
import { useEffect, useRef } from "react";
import { Box, Container, Typography, Button, Grid2 } from "@mui/material";
import { PlayArrow as PlayArrowIcon } from "@mui/icons-material";
import { gsap } from "gsap";
import Link from "next/link";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        imageRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "0"
      )
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        buttonsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );

    // Floating animation for background elements
    gsap.to(".floating-element", {
      y: -25,
      duration: 1,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <Box
      ref={heroRef}
      sx={{
        minHeight: { xss: "120vh", xs: "120vh", md: "100vh" },
        background: "linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        clipPath: {
          xss: "ellipse(300% 107% at 100% 0%)",
          xs: "ellipse(180% 100% at 100% 0%)",
          md: "ellipse(180% 100% at 100% 0%)",
        },
        paddingBottom: "90px",
      }}
      className="medical-pattern"
    >
      {/* Background decorative elements */}
      <Box
        className="floating-element"
        sx={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: { xss: 110, xs: 130, md: 200 },
          height: { xss: 110, xs: 130, md: 200 },
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          zIndex: 1,
        }}
      />
      <Box
        className="floating-element"
        sx={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: { xs: 100, md: 150 },
          height: { xs: 100, md: 150 },
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
          zIndex: 1,
        }}
      />
      <Box
        className="floating-element"
        sx={{
          position: "absolute",
          top: "10%",
          right: "20%",
          width: { xs: 70, md: 100 },
          height: { xs: 70, md: 100 },
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.08)",
          zIndex: 1,
        }}
      />
      <Box
        className="floating-element"
        sx={{
          position: "absolute",
          bottom: "30%",
          left: "5%",
          width: { xs: 60, md: 80 },
          height: { xs: 60, md: 80 },
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.06)",
          zIndex: 1,
        }}
      />

      <Container
        maxWidth={"lg"}
        sx={{
          position: "relative",
          zIndex: 2,
          top: { xss: 100, md: 0 },
        }}
      >
        <Grid2
          container
          spacing={{ xss: 2, md: 4 }}
          alignItems="center"
          justifyContent={"center"}
        >
          <Grid2 size={{ xss: 12, md: 6 }}>
            <Box sx={{ color: "white" }}>
              <Typography
                ref={titleRef}
                variant="h1"
                component="h1"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                مع MedA+
                <Box component="span" sx={{ display: "block" }}>
                  تميّزك يبدأ هنا.
                </Box>
              </Typography>

              <Typography
                ref={subtitleRef}
                variant="body1"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  maxWidth: { xs: 300, md: 500 },
                }}
              >
                طريقك للنجاح والتقدّم ببلّش من هون… سجّل معنا وابدأ مشوارك.
              </Typography>

              <Box
                ref={buttonsRef}
                sx={{
                  display: "flex",
                  gap: { xs: 0, md: 0 },
                  flexDirection: { xss: "column", xs: "column", sm: "row" },
                  alignItems: { xss: "stretch", xs: "stretch", sm: "center" },
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  href="/auth/login"
                  sx={{
                    backgroundColor: "white",
                    color: "#1784ad",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                  }}
                >
                  ابدا الان
                </Button>

                <Button
                  variant="text"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  sx={{
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  ما هى MedA+ Academy ؟
                </Button>
              </Box>
            </Box>
          </Grid2>

          <Grid2 size={{ xss: 12, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                borderRadius: 4,
                overflow: "hidden",
                width: "100%",
              }}
            >
              <Box
                ref={imageRef}
                component="img"
                src="/images/main1.png"
                alt="Medical Education"
                sx={{
                  position: "relative",
                  zIndex: 150,
                  width: { xss: "74%", xs: "75%", md: "87%" },
                  mr: { xss: 4, md: 9 },
                  mt: { xss: 0, md: 10 },
                  borderRadius: 4,
                }}
              />
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
