"use client";
import { Box, Grid2, Card, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import type {
  DashboardStats,
  PopularCourse,
  PopularVideo,
} from "../../lib/api/admin";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface DashboardChartsProps {
  stats?: DashboardStats;
  popularCourses?: PopularCourse[];
  popularVideos?: PopularVideo[];
}

const popularvideos = [
  {
    title: "مقدمة في الطب",
    view_count: 100,
  },
  {
    title: "مقدمة في الطب",
    view_count: 100,
  },

  {
    title: "مقدمة في الطب",
    view_count: 200,
  },
];

const popularCourses = [
  {
    title: "مقدمة في الطب",
    completed_count: 100,
  },
  {
    title: "مقدمة في الطب",
    completed_count: 100,
  },

  {
    title: "مقدمة في الطب",
    completed_count: 200,
  },
];

export default function DashboardCharts({ stats }: DashboardChartsProps) {
  const theme = useTheme();

  // Chart options with RTL support
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        rtl: true,
        labels: {
          font: {
            family: "Arial, sans-serif",
          },
          usePointStyle: true,
        },
      },
      tooltip: {
        rtl: true,
        titleFont: {
          family: "Arial, sans-serif",
        },
        bodyFont: {
          family: "Arial, sans-serif",
        },
      },
    },
    scales: {
      x: {
        reverse: true,
        ticks: {
          font: {
            family: "Arial, sans-serif",
          },
        },
      },
      y: {
        ticks: {
          font: {
            family: "Arial, sans-serif",
          },
        },
      },
    },
  };

  // Popular Courses Chart Data
  const popularCoursesData = {
    labels: popularCourses?.map((course) => course.title) || [],
    datasets: [
      {
        label: "عدد المكتملين",
        data: popularCourses?.map((course) => course.completed_count) || [],
        backgroundColor: [
          "rgba(23, 132, 173, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderColor: [
          "rgba(23, 132, 173, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  // Popular Videos Chart Data
  const popularVideosData = {
    labels: popularvideos?.map((video) => video.title) || [],
    datasets: [
      {
        label: "عدد المشاهدات",
        data: popularvideos?.map((video) => video.view_count) || [],
        backgroundColor: [
          "rgba(23, 132, 173, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderColor: [
          "rgba(23, 132, 173, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  // User Activity Chart Data
  const userActivityData = {
    labels: [
      "المستخدمين النشطين يومياً",
      "المستخدمين النشطين أسبوعياً",
      "إجمالي المستخدمين",
    ],
    datasets: [
      {
        data: [
          stats?.active_users_daily || 0,
          stats?.active_users_weekly || 0,
          stats?.total_users || 0,
        ],
        backgroundColor: [
          "rgba(23, 132, 173, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
        ],
        borderColor: [
          "rgba(23, 132, 173, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Content Overview Chart Data
  const contentOverviewData = {
    labels: ["الكورسات", "الفيديوهات", "التعليقات", "الفيديوهات المكتملة"],
    datasets: [
      {
        label: "إحصائيات المحتوى",
        data: [
          stats?.total_courses || 0,
          stats?.total_videos || 0,
          stats?.total_comments || 0,
          stats?.completed_videos || 0,
        ],
        backgroundColor: "rgba(23, 132, 173, 0.2)",
        borderColor: "rgba(23, 132, 173, 1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgba(23, 132, 173, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
      },
    ],
  };

  return (
    <Grid2 container spacing={3}>
      {/* Popular Courses Chart */}
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Card sx={{ height: 400, borderRadius: 3 }}>
          <CardContent sx={{ height: "100%" }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: 600, textAlign: "center" }}
            >
              أكثر الكورسات شعبية
            </Typography>
            <Box sx={{ height: "calc(100% - 60px)" }}>
              <Bar data={popularCoursesData} options={chartOptions} />
            </Box>
          </CardContent>
        </Card>
      </Grid2>

      {/* Popular Videos Chart */}
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Card sx={{ height: 400, borderRadius: 3 }}>
          <CardContent sx={{ height: "100%" }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: 600, textAlign: "center" }}
            >
              أكثر الفيديوهات مشاهدة
            </Typography>
            <Box sx={{ height: "calc(100% - 60px)" }}>
              <Doughnut
                data={popularVideosData}
                options={{
                  ...chartOptions,
                  scales: undefined,
                  plugins: {
                    ...chartOptions.plugins,
                    legend: {
                      ...chartOptions.plugins.legend,
                      position: "bottom" as const,
                    },
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}
