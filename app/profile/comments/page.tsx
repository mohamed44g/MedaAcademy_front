import axiosInstance from "@/lib/axiosServer";
import { MyComments } from "../components/sections/MyComments";

// Mock comments data
const mockComments = [
  {
    id: 1,
    video_id: 1,
    video_title: "مقدمة عن القلب",
    course_title: "مقدمة فى مادة الطب البشرى",
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


export const metadata = {
  title: "تعليقاتي - MedA+ Academy",
  description: "إدارة التعليقات في أكاديمية MedA+",
};

export default async function CommentsPage() {

  return <MyComments/>;
}
