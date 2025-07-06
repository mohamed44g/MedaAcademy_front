export const dynamic = "force-dynamic";
import { CourseOverview } from "@/components/courses/CourseOverview";
import axiosInstance from "@/lib/axiosServer";

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
  const { courseId } = await params;
  const courseData = await getCourseData(courseId);
  console.log(courseData);
  return (
    <CourseOverview
      courseId={courseId}
      courseData={courseData.course}
      isEnrolled={courseData.isEnrolled}
    />
  );
}
