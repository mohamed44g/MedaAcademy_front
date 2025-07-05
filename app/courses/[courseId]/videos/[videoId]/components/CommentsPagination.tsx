"use client";
import { Box, Pagination } from "@mui/material";
import type React from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { useThemeContext } from "@/contexts/ThemeContext";

interface CommentsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function CommentsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: CommentsPaginationProps) {
  const { isDarkMode } = useThemeContext();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    onPageChange(page);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
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
  );
}
