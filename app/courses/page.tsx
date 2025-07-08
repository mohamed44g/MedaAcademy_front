import { Metadata } from "next";
import { axiosInstance } from "../../lib/axiosClient";
import { Courses } from "@/components/courses/CoursesCards";

export const dynamic = "force-dynamic";

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  instractor_name: string;
  specialty_name: string;
  poster: string;
}

async function getCourses(page: number = 1, limit: number = 6) {
  try {
    const response = await axiosInstance.get(
      `/courses?page=${page}&limit=${limit}`
    );
    const { data, total } = response.data.data;
    const totalPages = Math.ceil(parseInt(total) / limit);
    console.log("total", total);
    return { data, totalPages };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return { courses: [], totalPages: 1 };
  }
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: any;
}): Promise<Metadata> {
  const { page } = await searchParams;
  const pageInt = parseInt(page || "1", 10);
  const { data } = await getCourses(pageInt);

  const title = `كورسات MedA+ Academy التعليمية | الصفحة ${page}`;
  const description =
    "اكتشف كورسات MedA+ Academy التعليمية لتطوير مهاراتك في التخصصات الطبية مع أفضل المدربين في مجال الطب البشري.";
  const siteUrl = "http://localhost:3001"; // استبدل بـ production URL
  const canonicalUrl =
    page === 1 ? `${siteUrl}/courses` : `${siteUrl}/courses?page=${page}`;
  const firstCourse = data[0] || {
    title: "كورسات طبية",
    poster: "/Uploads/default-course.jpg",
  };

  return {
    title,
    description,
    keywords: [
      "كورسات طبية",
      "تعليم طبي",
      "MedA+ Academy",
      "تدريب طبي",
      "تخصصات طبية",
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
          url: `${axiosInstance.defaults.baseURL}${firstCourse.poster}`,
          width: 1200,
          height: 630,
          alt: firstCourse.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${axiosInstance.defaults.baseURL}${firstCourse.poster}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const { page } = await searchParams;
  const pageInt = parseInt(page || "1", 10);
  const limit = 6;
  const { data, totalPages } = await getCourses(pageInt);

  // JSON-LD Structured Data for Courses
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: data.map((course: Course, index: number) => ({
      "@type": "Course",
      position: index + 1,
      name: course.title,
      description: course.description,
      url: `https://meda-plus.com/courses/${course.id}`, // استبدل بـ production URL
      image: `${axiosInstance.defaults.baseURL}${course.poster}`,
      provider: {
        "@type": "Organization",
        name: "MedA+ Academy",
        url: "https://meda-plus.com",
      },
      instructor: {
        "@type": "Person",
        name: course.instractor_name,
      },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Courses
        courses={data}
        baseUrl={axiosInstance.defaults.baseURL ?? ""}
        totalPages={totalPages}
        currentPage={pageInt}
      />
    </>
  );
}
