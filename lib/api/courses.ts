// lib/api/specialties.ts
export const dynamic = "force-dynamic";
import axiosInstance from "../axiosServer";
export async function getCourses(): Promise<any> {
  const response = await axiosInstance.get("/courses/latest", {});
  return response.data.data;
}

export async function getSpecialties(): Promise<any> {
  const response = await axiosInstance.get("/specialties");
  return response.data.data;
}
