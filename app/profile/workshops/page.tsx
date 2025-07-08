export const dynamic = "force-dynamic";
import axiosInstance from "@/lib/axiosServer";
import { MyWorkshops } from "../components/sections/MyWorkshops";

const getRegistrations = async () => {
  try {
    const response = await axiosInstance.get(`/workshops/registrations`);
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
  }
};

export const metadata = {
  title: "ورشي - MedA+ Academy",
  description: "إدارة الورش المسجل بها في أكاديمية MedA+",
};

export default async function WorkshopsPage() {
  const workshops = await getRegistrations();
  return <MyWorkshops workshops={workshops} />;
}
