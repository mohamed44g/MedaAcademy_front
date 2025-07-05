"use client";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid2,
  Button,
  Chip,
} from "@mui/material";
import {
  WorkSharp,
  CalendarToday,
  AccessTime,
  LocationOn,
  Person,
  ArrowForward,
} from "@mui/icons-material";
import Link from "next/link";

interface MyWorkshopsProps {
  workshops: any[];
}

export function MyWorkshops({ workshops }: MyWorkshopsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "#4caf50";
      case "ongoing":
        return "#ff9800";
      case "completed":
        return "#2196f3";
      default:
        return "#757575";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming":
        return "قادمة";
      case "ongoing":
        return "جارية";
      case "completed":
        return "مكتملة";
      default:
        return "غير محدد";
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: 3,
            background: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 3,
            boxShadow: "0 4px 15px rgba(255, 152, 0, 0.3)",
          }}
        >
          <WorkSharp sx={{ color: "white", fontSize: 28 }} />
        </Box>
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "primary.main" }}
          >
            ورشي ({workshops.length})
          </Typography>
          <Typography variant="body1" color="text.secondary">
            الورش التدريبية المسجل بها
          </Typography>
        </Box>
      </Box>

      {workshops.length === 0 ? (
        <Card>
          <CardContent sx={{ p: 6, textAlign: "center" }}>
            <WorkSharp sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              لم تسجل في أي ورشة بعد
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 3, borderRadius: 3 }}
              component={Link}
              href="/workshops"
            >
              تصفح الورش
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid2 container spacing={4}>
          {workshops.map((workshop) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={workshop.id}>
              <Card
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  {/* Workshop Image */}
                  <Box
                    sx={{
                      position: "relative",
                      height: 200,
                      backgroundImage: `url(${workshop.image_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "16px 16px 0 0",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                      }}
                    >
                      <Chip
                        label={getStatusText(workshop.status)}
                        sx={{
                          backgroundColor: getStatusColor(workshop.status),
                          color: "white",
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 16,
                        left: 16,
                        background: "rgba(0, 0, 0, 0.7)",
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "white", fontWeight: 700 }}
                      >
                        {workshop.price} جنيه
                      </Typography>
                    </Box>
                  </Box>

                  {/* Workshop Content */}
                  <Box sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        lineHeight: 1.4,
                      }}
                    >
                      {workshop.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3, lineHeight: 1.6 }}
                    >
                      {workshop.description}
                    </Typography>

                    {/* Workshop Details */}
                    <Box sx={{ mb: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <CalendarToday
                          sx={{ color: "primary.main", fontSize: 18 }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {workshop.formattedDate}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <AccessTime
                          sx={{ color: "primary.main", fontSize: 18 }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {workshop.duration}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <Person sx={{ color: "primary.main", fontSize: 18 }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {workshop.instructor}
                        </Typography>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <LocationOn
                          sx={{ color: "primary.main", fontSize: 18 }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {workshop.location}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Action Button */}
                    <Button
                      variant="contained"
                      fullWidth
                      endIcon={<ArrowForward />}
                      component={Link}
                      href={`/workshops/${workshop.id}`}
                      sx={{
                        borderRadius: 3,
                        py: 1.5,
                        background:
                          "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
                        boxShadow: "0 4px 15px rgba(255, 152, 0, 0.3)",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 6px 20px rgba(255, 152, 0, 0.4)",
                        },
                      }}
                    >
                      عرض تفاصيل الورشة
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
}
