// lib/api/specialties.ts
export const dynamic = "force-dynamic";
import axiosInstance from "../axiosClient";
export interface Specialty {
  id: number;
  name: string;
  created_at: string;
}

export async function getSpecialties(): Promise<Specialty[]> {
  const response = await axiosInstance.get("/specialties");
  return response.data.data;
}
