export const dynamic = "force-dynamic";
import axiosInstance from "@/lib/axiosServer";
import { MyCourses } from "../components/sections/MyCourses";

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
