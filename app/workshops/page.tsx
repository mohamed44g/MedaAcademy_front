import { Metadata } from "next";
import { axiosInstance } from "../../lib/axiosClient";
import { Workshops } from "@/components/workshops/WorkshopsCards";

export const dynamic = "force-dynamic";

interface Workshop {
  id: number;
  title: string;
  description: string;
  price: number;
  formattedDate: string;
  duration: string;
  image: string;
}

async function getLatestWorkshops(page: number = 1, limit: number = 6) {
  try {
    const response = await axiosInstance.get(
      `/workshops?page=${page}&limit=${limit}`
    );
    const { data, total } = response.data.data;
    const workshops = data.map((workshop: any) => ({
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
    const totalPages = Math.ceil(parseInt(total) / limit);
    return { workshops, totalPages };
  } catch (error) {
    console.error("Error fetching workshops:", error);
    return { workshops: [], totalPages: 1 };
  }
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { page?: string };
}): Promise<Metadata> {
  const page = parseInt(searchParams.page || "1", 10);
  const { workshops } = await getLatestWorkshops(page);

  const title = `ورشات MedA+ Academy التدريبية | الصفحة ${page}`;
  const description =
    "استكشف ورشات MedA+ Academy التدريبية لتطوير مهاراتك الطبية مع أفضل المدربين في مجال الطب البشري والتخصصات الطبية.";
  const siteUrl = "http://localhost:3001"; // استبدل بـ production URL
  const canonicalUrl =
    page === 1 ? `${siteUrl}/workshops` : `${siteUrl}/workshops?page=${page}`;
  const firstWorkshop = workshops[0] || {
    title: "ورشات طبية",
    image: "/Uploads/default-workshop.jpg",
  };

  return {
    title,
    description,
    keywords: [
      "ورشات طبية",
      "تعليم طبي",
      "MedA+ Academy",
      "تدريب طبي",
      "مهارات طبية",
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      locale: "ar_AR",
      siteName: "MedA+ Academy",
      images: [
        {
          url: `${axiosInstance.defaults.baseURL}${firstWorkshop.image}`,
          width: 1200,
          height: 630,
          alt: firstWorkshop.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${axiosInstance.defaults.baseURL}${firstWorkshop.image}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function WorkshopsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const { page } = await searchParams;
  const pageInt = parseInt(page || "1", 10);
  const limit = 6;
  const { workshops, totalPages } = await getLatestWorkshops(pageInt);

  // JSON-LD Structured Data for Events
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: workshops.map((workshop: Workshop, index: number) => ({
      "@type": "Event",
      position: index + 1,
      name: workshop.title,
      description: workshop.description,
      url: `http://localhost:3001/workshops/${workshop.id}`, // استبدل بـ production URL
      image: `${axiosInstance.defaults.baseURL}${workshop.image}`,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      startDate: new Date(workshop.formattedDate).toISOString(),
      duration: `PT${workshop.duration.replace(" ساعات", "H")}`,
      offers: {
        "@type": "Offer",
        price: workshop.price,
        priceCurrency: "EGP",
        availability: "https://schema.org/InStock",
        url: `http://localhost:3001/workshops/${workshop.id}`,
      },
      organizer: {
        "@type": "Organization",
        name: "MedA+ Academy",
        url: "http://localhost:3001",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Workshops
        workshops={workshops}
        baseUrl={axiosInstance.defaults.baseURL ?? ""}
        totalPages={totalPages}
        currentPage={page}
      />
    </>
  );
}
