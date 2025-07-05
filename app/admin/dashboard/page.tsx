"use client"
import { Box, Container, Typography, Grid, Card, CardContent } from "@mui/material"
import {
  People,
  School,
  Comment,
  AttachMoney,
  TrendingUp,
  TrendingDown,
  Event,
  EventAvailable,
} from "@mui/icons-material"
import { useStats } from "../../../hooks/useAdmin"
import DashboardCharts from "../../../components/admin/DashboardCharts"

export default function AdminDashboard() {
  const { data: stats } = useStats()

  const statCards = [
    {
      title: "إجمالي المستخدمين",
      value: stats?.totalUsers || 0,
      icon: People,
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      change: "+12%",
      isPositive: true,
    },
    {
      title: "إجمالي الكورسات",
      value: stats?.totalCourses || 0,
      icon: School,
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      change: "+8%",
      isPositive: true,
    },
    {
      title: "إجمالي الورشات",
      value: stats?.totalWorkshops || 0,
      icon: Event,
      color: "linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)",
      change: "+15%",
      isPositive: true,
    },
    {
      title: "إجمالي التعليقات",
      value: stats?.totalComments || 0,
      icon: Comment,
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      change: "+15%",
      isPositive: true,
    },
    {
      title: "إجمالي الإيرادات",
      value: `${stats?.totalRevenue || 0}`,
      icon: AttachMoney,
      color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      change: "+25%",
      isPositive: true,
    },
    {
      title: "الورشات القادمة",
      value: stats?.upcomingWorkshops || 0,
      icon: EventAvailable,
      color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      change: "+5%",
      isPositive: true,
    },
  ]

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh", direction: "rtl" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            لوحة التحكم الإدارية
          </Typography>
          <Typography variant="body1" color="text.secondary">
            نظرة عامة على إحصائيات المنصة والأداء
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  background: stat.color,
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <CardContent sx={{ color: "white" }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <stat.icon sx={{ fontSize: 40, opacity: 0.8 }} />
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      {stat.isPositive ? (
                        <TrendingUp sx={{ fontSize: 16, color: "rgba(255,255,255,0.8)" }} />
                      ) : (
                        <TrendingDown sx={{ fontSize: 16, color: "rgba(255,255,255,0.8)" }} />
                      )}
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        {stat.change}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts */}
        <DashboardCharts />

        {/* Popular Workshops */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  أكثر الورشات إقبالاً
                </Typography>
                {stats?.popularWorkshops?.map((workshop, index) => (
                  <Box
                    key={workshop.id}
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1 }}
                  >
                    <Typography variant="body2">{workshop.title}</Typography>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                      {workshop.participants} مشارك
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  المستخدمين النشطين
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                    {stats?.activeUsers || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    من إجمالي {stats?.totalUsers || 0} مستخدم
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
