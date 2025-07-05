import { getCourses, getSpecialties } from "@/lib/api/courses";
import { Courses } from "./Courses";
import axiosInstance from "@/lib/axiosServer";

export const dynamic = "force-dynamic";
async function fetchCourses() {
  try {
    const courses = await getCourses();
    return courses;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
}

async function fetchSpecialties() {
  try {
    const specialties = await getSpecialties();
    return specialties;
  } catch (error) {
    console.error("Failed to fetch specialties:", error);
    return [];
  }
}

export default async function CoursesSection() {
  const courses = await fetchCourses();
  console.log(courses);
  console.log("url", axiosInstance.defaults.baseURL);
  const specialties = await fetchSpecialties();
  return <Courses courses={courses} specialties={specialties} />;
}
