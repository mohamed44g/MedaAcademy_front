"use client";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import {
  LocationOn,
  Phone,
  Email,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Send,
  WhatsApp,
  GitHub,
} from "@mui/icons-material";
import { useThemeContext } from "@/contexts/ThemeContext";

export default function Footer() {
  const { isDarkMode } = useThemeContext();
  return (
    <>
      <Box
        sx={{
          background: "linear-gradient(135deg, #1784ad 0%, #0f5a78 100%)",
          color: "white",
          pt: 8,
          pb: 4,
          mt: 10,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Logo and Description */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
              >
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  MedA+ Academy
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ mb: 3, opacity: 0.9, lineHeight: 1.6 }}
              >
                أكاديمية MedA+ هي وجهتك الأولى للتعليم الطبي المتقدم. نقدم برامج
                تدريبية شاملة مصممة من قبل خبراء الرعاية الصحية لإعداد الجيل
                القادم من المتخصصين الطبيين.
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  sx={{
                    color: "white",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  sx={{
                    color: "white",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  <Twitter />
                </IconButton>
                <IconButton
                  sx={{
                    color: "white",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  <LinkedIn />
                </IconButton>
                <IconButton
                  sx={{
                    color: "white",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  <Instagram />
                </IconButton>
              </Box>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                روابط سريعة
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {[
                  "الرئيسية",
                  "الكورسات الطبية",
                  "التخصصات",
                  "الفريق",
                  "الفعاليات",
                  "اتصل بنا",
                ].map((link) => (
                  <Typography
                    key={link}
                    variant="body2"
                    sx={{
                      opacity: 0.9,
                      cursor: "pointer",
                      "&:hover": { opacity: 1, textDecoration: "underline" },
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Box>
            </Grid>

            {/* Medical Specializations */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                التخصصات الطبية
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {[
                  "طب القلب المتقدم",
                  "طب الطوارئ",
                  "رعاية الأطفال",
                  "التصوير الطبي",
                  "الجراحة العامة",
                  "الطب الباطني",
                ].map((specialty) => (
                  <Typography
                    key={specialty}
                    variant="body2"
                    sx={{
                      opacity: 0.9,
                      cursor: "pointer",
                      "&:hover": { opacity: 1, textDecoration: "underline" },
                    }}
                  >
                    {specialty}
                  </Typography>
                ))}
              </Box>
            </Grid>

            {/* Contact Info and Newsletter */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                تواصل معنا
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn sx={{ fontSize: 20 }} />
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    القاهرة، مصر
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Phone sx={{ fontSize: 20 }} />
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    +20 123 456 7890
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Email sx={{ fontSize: 20 }} />
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    info@medaacademy.com
                  </Typography>
                </Box>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                النشرة الإخبارية
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  placeholder="بريدك الإلكتروني"
                  size="small"
                  sx={{
                    flexGrow: 1,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                      color: "white",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "rgba(255,255,255,0.7)",
                      opacity: 1,
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    color: "#1784ad",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
                  }}
                >
                  <Send />
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              © 2025 MedA+ Academy. جميع الحقوق محفوظة.
            </Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.8,
                  cursor: "pointer",
                  "&:hover": { opacity: 1 },
                }}
              >
                سياسة الخصوصية
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.8,
                  cursor: "pointer",
                  "&:hover": { opacity: 1 },
                }}
              >
                الشروط والأحكام
              </Typography>
            </Box>
          </Box>

          {/* Developer Section */}
        </Container>
      </Box>
      <Box
        sx={{
          background: isDarkMode
            ? "radial-gradient(circle at 20% 80%, #1784ad15 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4fa8c510 0%, transparent 50%)"
            : "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          p: 2,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: { xss: "center", sm: "space-between" },
            flexDirection: { xss: "column", sm: "row" },
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              component="a"
              href="https://facebook.com"
              target="_blank"
              sx={{
                color: "text.primary",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              component="a"
              href="https://wa.me/1234567890"
              target="_blank"
              sx={{
                color: "text.primary",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              <WhatsApp />
            </IconButton>
            <IconButton
              component="a"
              href="https://linkedin.com"
              target="_blank"
              sx={{
                color: "text.primary",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              component="a"
              href="https://github.com"
              target="_blank"
              sx={{
                color: "text.primary",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              <GitHub />
            </IconButton>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: "text.primary", fontWeight: 500 }}
          >
            Developed by: Mohamed Badry
          </Typography>
        </Container>
      </Box>
    </>
  );
}
