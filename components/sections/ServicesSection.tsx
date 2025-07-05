"use client"
import { useEffect, useRef } from "react"
import { Box, Container, Typography, Card, CardContent, Button } from "@mui/material"
import { LocalHospital, Psychology, Biotech, HealthAndSafety, MedicalServices, Science } from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: LocalHospital,
    title: "Clinical Medicine",
    description:
      "Comprehensive clinical training programs covering diagnosis, treatment, and patient care methodologies for modern healthcare professionals.",
  },
  {
    icon: Psychology,
    title: "Medical Psychology",
    description:
      "Understanding the psychological aspects of healthcare and patient-doctor relationships in clinical environments.",
  },
  {
    icon: Biotech,
    title: "Medical Technology",
    description:
      "Latest advances in medical technology, equipment usage, and digital health solutions for enhanced patient care.",
  },
  {
    icon: HealthAndSafety,
    title: "Patient Safety",
    description:
      "Critical protocols and procedures to ensure optimal patient safety and care quality in medical practice.",
  },
  {
    icon: MedicalServices,
    title: "Specialized Procedures",
    description:
      "Advanced training in specialized medical procedures and surgical techniques for expert practitioners.",
  },
  {
    icon: Science,
    title: "Medical Research",
    description:
      "Research methodologies, clinical trials, and evidence-based medicine practices for academic excellence.",
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current

    if (!section || !container) return

    // Set up the horizontal scroll animation
    const cards = gsap.utils.toArray(".service-card")
    const totalWidth = cards.length * 100

    gsap.set(container, {
      width: `${totalWidth}vw`,
      display: "flex",
    })

    gsap.set(cards, {
      width: "100vw",
      flexShrink: 0,
    })

    // Create the horizontal scroll animation
    const horizontalScroll = gsap.to(container, {
      x: () => -(totalWidth - 100) + "vw",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => "+=" + (totalWidth - 100) * 10,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    // Animate individual cards
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "left 80%",
            end: "left 20%",
            containerAnimation: horizontalScroll,
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <Box
      ref={sectionRef}
      sx={{
        height: "100vh",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
        position: "relative",
      }}
    >
      {/* Fixed Title */}
      <Box
        sx={{
          position: "absolute",
          top: 80,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          textAlign: "center",
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 600,
            fontSize: "0.9rem",
            letterSpacing: 2,
            mb: 2,
            display: "block",
          }}
        >
          OUR SERVICES
        </Typography>
        <Typography
          variant="h2"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          Medical Specializations
        </Typography>
      </Box>

      {/* Horizontal Scroll Container */}
      <Box
        ref={containerRef}
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {services.map((service, index) => {
          const IconComponent = service.icon
          return (
            <Box
              key={index}
              className="service-card"
              sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                px: 4,
              }}
            >
              <Container maxWidth="md">
                <Card
                  sx={{
                    maxWidth: 600,
                    mx: "auto",
                    p: 6,
                    textAlign: "center",
                    backgroundColor: theme.palette.background.default,
                    borderRadius: 6,
                    boxShadow: theme.palette.mode === "dark" ? "0 25px 50px rgba(0,0,0,0.5)" : 6,
                    border: theme.palette.mode === "dark" ? "1px solid rgba(255,255,255,0.1)" : "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: theme.palette.mode === "dark" ? "0 35px 70px rgba(0,0,0,0.7)" : 8,
                    },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 4,
                        boxShadow: `0 20px 40px ${theme.palette.primary.main}40`,
                      }}
                    >
                      <IconComponent sx={{ fontSize: 60, color: "white" }} />
                    </Box>

                    <Typography
                      variant="h3"
                      sx={{
                        mb: 3,
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        fontSize: { xs: "2rem", md: "2.5rem" },
                      }}
                    >
                      {service.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.secondary,
                        mb: 4,
                        fontSize: "1.2rem",
                        lineHeight: 1.8,
                        maxWidth: 500,
                        mx: "auto",
                      }}
                    >
                      {service.description}
                    </Typography>

                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        borderRadius: 25,
                        px: 4,
                        py: 1.5,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                        "&:hover": {
                          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                          transform: "translateY(-2px)",
                          boxShadow: `0 10px 25px ${theme.palette.primary.main}40`,
                        },
                      }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Container>
            </Box>
          )
        })}
      </Box>

      {/* Scroll Indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
          zIndex: 10,
        }}
      >
        {services.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: theme.palette.primary.main,
              opacity: 0.3,
            }}
          />
        ))}
      </Box>
    </Box>
  )
}
