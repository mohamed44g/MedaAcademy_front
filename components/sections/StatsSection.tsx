"use client"
import { useLayoutEffect, useRef } from "react"
import { Box, Container, Typography, Grid, useTheme } from "@mui/material"
import { School, People, EmojiEvents, Public } from "@mui/icons-material"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: People, value: 12500, suffix: "+", label: "طبيب متخرج" },
  { icon: School, value: 85, suffix: "+", label: "برنامج تدريبي" },
  { icon: EmojiEvents, value: 98, suffix: "%", label: "معدل النجاح" },
  { icon: Public, value: 25, suffix: "+", label: "دولة عربية" },
]

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
    const theme = useTheme();
    const isdark = theme.palette.mode === "dark";


  return (
    <Box
      ref={sectionRef}
      sx={{
        py: 8,
        mt: 10,
        background: isdark ? "radial-gradient(circle at 20% 80%, #1784ad15 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4fa8c510 0%, transparent 50%);" : "linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)",
        color: isdark ? "white" : "black",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: "2rem", md: "2.5rem" } }}>
            إنجازاتنا بالأرقام
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 600, mx: "auto", fontSize: "1.2rem" }}>
            نفخر بما حققناه من إنجازات في مجال التعليم الطبي المتقدم
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {stats.map(({ icon: Icon, value, suffix, label }, idx) => (
            <Grid item xs={6} md={3} key={idx}>
              <Box className="stat-card" sx={{ textAlign: "center", p: 3 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 3,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon sx={{ fontSize: 40 }} />
                </Box>

                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: "2rem", md: "3rem" } }}>
                  <span className="stat-number" data-value={value}>
                    0
                  </span>
                  {suffix}
                </Typography>

                <Typography variant="body1" sx={{ opacity: 0.9, fontSize: "1.1rem" }}>
                  {label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
