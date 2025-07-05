import { axiosInstance } from "../../../lib/axiosServer"; // تأكد من المسار الصحيح
import { WorkshopsClient } from "./WorkshopsClient";


export const dynamic = "force-dynamic";

async function getLatestWorkshops() {
  try {
    const response = await axiosInstance.get("/workshops/latest");
    const workshops = response.data.data.map((workshop: any) => ({
      id: workshop.id,
      title: workshop.title,
      description: workshop.description,
      price: parseFloat(workshop.price),
      formattedDate: new Date(workshop.event_date).toLocaleDateString("ar-EG", {
        timeZone: "UTC",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      duration: `${workshop.event_time} ساعات`,
      image: workshop.image_url,
    }));
    return workshops;
  } catch (error) {
    console.error("Error fetching workshops:", error);
    return [];
  }
}

export default async function WorkshopsSection() {
  const workshops = await getLatestWorkshops();
  return (
    <WorkshopsClient
      workshops={workshops}
      baseUrl={axiosInstance.defaults.baseURL ?? ""}
    />
  );
}
