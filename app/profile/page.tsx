import { Container, Box } from "@mui/material";
import { UserInfo } from "./components/UserInfo";
import axiosInstance from "@/lib/axiosServer";

export const mockCourses = [
  {
    id: 2,
    title: "مقدمة فى مادة الطب البشري",
    specialty_name: "الطب البشري",
    instractor_name: "محمد بدرى",
    poster: "/placeholder.svg?height=200&width=300",
    total_videos: 10,
    completed_videos: 6,
    completion_percentage: 60,
    enrolled_date: "2024-01-15",
    last_watched: "2024-12-20",
  },
  {
    id: 3,
    title: "Introduction to Cardiology",
    specialty_name: "الطب البشري",
    instractor_name: "محمد بدرى",
    poster: "/placeholder.svg?height=200&width=300",
    total_videos: 8,
    completed_videos: 2,
    completion_percentage: 25,
    enrolled_date: "2024-02-10",
    last_watched: "2024-12-18",
  },
];

export const mockWorkshops = [
  {
    id: 1,
    title: "ورشة الإسعافات الأولية",
    description: "تعلم أساسيات الإسعافات الأولية",
    price: 150.0,
    formattedDate: "28 يونيو 2025",
    duration: "4 ساعات",
    image_url: "/placeholder.svg?height=200&width=300",
    status: "upcoming",
    location: "قاعة المؤتمرات - المبنى الرئيسي",
    instructor: "د. سارة أحمد",
  },
];

export const mockComments = [
  {
    id: 1,
    video_id: 1,
    video_title: "مقدمة عن القلب",
    course_title: "مقدمة فى مادة الطب البشري",
    content: "فيديو رائع ومفيد جداً! شرح واضح ومبسط",
    created_at: "2025-06-28T12:00:00Z",
    likes: 5,
  },
  {
    id: 2,
    video_id: 2,
    video_title: "تشريح القلب",
    course_title: "Introduction to Cardiology",
    content: "استفدت كثيراً من هذا الدرس، شكراً للدكتور",
    created_at: "2025-06-25T10:30:00Z",
    likes: 3,
  },
];

export const mockWallet = {
  balance: 1000,
  currency: "جنيه",
  transactions: [
    {
      id: 1,
      amount: 500,
      type: "deposit",
      description: "ايداع مبلغ 500 جنيه",
      created_at: "2025-06-28T12:00:00Z",
      status: "completed",
    },
    {
      id: 2,
      amount: 150,
      type: "withdraw",
      description: "شراء ورشة الإسعافات الأولية",
      created_at: "2025-06-28T12:00:00Z",
      status: "completed",
    },
    {
      id: 3,
      amount: 299,
      type: "withdraw",
      description: "شراء كورس مقدمة فى مادة الطب البشري",
      created_at: "2025-06-20T14:15:00Z",
      status: "completed",
    },
  ],
};

async function fetchUserData() {
  const response = await axiosInstance.get("/users");
  return response.data.data;
}

export default async function ProfilePage() {
  const userData = await fetchUserData();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          py: 4,
        }}
      >
        <UserInfo user={userData} />
      </Container>
    </Box>
  );
}
