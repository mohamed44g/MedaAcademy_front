import { Metadata } from "next";
import { CourseContent } from "@/components/courses/CourseContent";
import axiosInstance from "@/lib/axiosServer";
import Unauthorized from "@/app/unauthorized";
import { AppError } from "@/utils/AppError";

export async function generateMetadata({
  params,
}: {
  params: { courseId: string };
}): Promise<Metadata> {
  return {
    title: "محتوى الكورس | MedA+ Academy",
    description: "محتوى الكورس للطلاب المسجلين",
    robots: { index: false, follow: false }, // Private page
  };
}

export async function getCourseContent(courseId: string) {
  try {
    const response = await axiosInstance.get(`/courses/${courseId}/content`);
    return response.data.data;
  } catch (error: any) {
    throw error;
  }
}

export default async function CourseContentPage({ params }: { params: any }) {
  const { courseId } = await params;
  const courseContent = await getCourseContent(courseId);
  return <CourseContent courseId={courseId} courseContent={courseContent} />;
}
