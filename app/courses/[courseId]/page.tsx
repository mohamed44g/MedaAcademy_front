import { CourseOverview } from "@/components/courses/CourseOverview";
import axiosInstance from "@/lib/axiosServer";

export const dynamic = "force-dynamic";

export async function getCourseData(courseId: string) {
  try {
    const response = await axiosInstance.get(`/courses/${courseId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching course data:", error);
    return null;
  }
}

export default async function Course({ params }: { params: any }) {
  const courseId = await params.courseId;
  const courseData = await getCourseData(courseId);
  return (
    <CourseOverview
      baseUrl="http://localhost:3000"
      courseId={courseId}
      courseData={courseData}
    />
  );
}
