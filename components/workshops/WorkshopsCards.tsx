"use client";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid2,
  Stack,
  Pagination,
} from "@mui/material";
import {
  CalendarToday,
  Schedule,
  AttachMoney,
  ArrowForward,
} from "@mui/icons-material";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosClient";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import WorkShopCard from "./workShopCard";

interface Workshop {
  id: number;
  title: string;
  description: string;
  price: number;
  formattedDate: string;
  duration: string;
  image: string;
}

interface WorkshopsSectionProps {
  workshops: Workshop[];
  baseUrl: string;
  totalPages: number;
  currentPage: number;
}

export function Workshops({
  workshops: initialWorkshops,
  baseUrl,
  totalPages: initialTotalPages,
  currentPage: initialCurrentPage,
}: WorkshopsSectionProps) {
  const { isDarkMode } = useThemeContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const {
    data: { workshops, totalPages } = {
      workshops: initialWorkshops,
      totalPages: initialTotalPages,
    },
  } = useQuery({
    queryKey: ["workshops", currentPage],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/workshops?page=${currentPage}&limit=6`
      );
      const { data, total } = response.data.data;
      const workshops = data.map((workshop: any) => ({
        id: workshop.id,
        title: workshop.title,
        description: workshop.description,
        price: parseFloat(workshop.price),
        formattedDate: new Date(workshop.event_date).toLocaleDateString(
          "ar-EG",
          {
            timeZone: "UTC",
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        ),
        duration: `${workshop.event_time} ساعات`,
        image: workshop.image_url,
      }));
      return { workshops, totalPages: Math.ceil(total / 6) };
    },
    initialData: { workshops: initialWorkshops, totalPages: initialTotalPages },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      router.push(`/workshops?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: isDarkMode
          ? "radial-gradient(circle at 20% 80%, #1784ad15 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4fa8c510 0%, transparent 50%)"
          : "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          background: isDarkMode
            ? "linear-gradient(135deg, #1784ad10 0%, #4fa8c505 100%)"
            : "linear-gradient(135deg, #1784ad10 0%, #4fa8c505 100%)",
          borderRadius: "50% 0 0 50%",
          transform: "translateX(25%)",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        <Grid2 container spacing={4}>
          {workshops.map((workshop: any) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={workshop.id}>
              <WorkShopCard workshop={workshop} baseURL={baseUrl} />
            </Grid2>
          ))}
        </Grid2>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                color: isDarkMode ? "#f9fafb" : "#1f2937",
                "&:hover": {
                  backgroundColor: isDarkMode ? "#1784ad50" : "#1784ad20",
                },
              },
              "& .Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
