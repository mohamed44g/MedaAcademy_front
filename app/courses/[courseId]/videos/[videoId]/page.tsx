import { VideoPlayerLayout } from "./components/VideoPlayerLayout";
import axiosInstance from "@/lib/axiosServer";

// Mock comments data
const mockCommentsData = {
  comments: [
    {
      id: 1,
      user: {
        id: 1,
        name: "محمد أحمد",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "شرح ممتاز ومفصل! استفدت كثيراً من هذا الفيديو",
      createdAt: "2025-01-01T10:30:00Z",
      replies: [
        {
          id: 101,
          user: {
            id: 2,
            name: "سارة محمود",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "أتفق معك تماماً، الدكتور يشرح بطريقة واضحة جداً",
          createdAt: "2025-01-01T11:00:00Z",
        },
      ],
    },
    {
      id: 2,
      user: {
        id: 3,
        name: "عمر حسن",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "هل يمكن توضيح المزيد عن الصمام الأورطي؟",
      createdAt: "2025-01-01T14:20:00Z",
      replies: [],
    },
    {
      id: 3,
      user: {
        id: 4,
        name: "فاطمة علي",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "الرسوم التوضيحية مفيدة جداً، شكراً لكم",
      createdAt: "2025-01-01T16:45:00Z",
      replies: [
        {
          id: 102,
          user: {
            id: 5,
            name: "أحمد سالم",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "نعم، الرسوم تساعد في فهم التشريح بشكل أفضل",
          createdAt: "2025-01-01T17:00:00Z",
        },
        {
          id: 103,
          user: {
            id: 6,
            name: "مريم خالد",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "أتمنى المزيد من هذه الفيديوهات التفاعلية",
          createdAt: "2025-01-01T17:30:00Z",
        },
      ],
    },
  ],
  pagination: {
    currentPage: 1,
    totalPages: 3,
    totalComments: 25,
    hasNextPage: true,
    hasPreviousPage: false,
  },
};

export const dynamic = "force-dynamic";

// دالة لجلب بيانات الفيديو
export async function getVideoData(videoId: string, userId: string) {
  try {
    const response = await axiosInstance.get(`/videos/${videoId}/content`, {
      params: { userId },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching video data:", error);
    return null;
  }
}

// الصفحة الرئيسية
export default async function Video({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const videoId = await params.videoId;
  const userId = searchParams.userId || "1"; // قيمة افتراضية لـ userId
  const videoData = await getVideoData(videoId, userId);

  if (!videoData) {
    return <div>خطأ في تحميل الفيديو</div>;
  }

  return <VideoPlayerLayout videoData={videoData} />;
}
