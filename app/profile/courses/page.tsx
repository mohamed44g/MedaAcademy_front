import axiosInstance from "@/lib/axiosServer";
import { MyCourses } from "../components/sections/MyCourses";

// Mock courses data
const mockCourses = [
  {
    id: 2,
    title: "مقدمة فى مادة الطب البشرى",
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

export const metadata = {
  title: "كورساتي - MedA+ Academy",
  description: "إدارة الكورسات المسجل بها في أكاديمية MedA+",
};

export const fetchCourses = async () => {
  const response = await axiosInstance.get("/courses/enrolled-courses");
  return response.data.data;
};

export default async function CoursesPage() {
  const courses = await fetchCourses();
  return <MyCourses courses={courses} />;
}
