import axiosInstance from "@/lib/axiosServer";
import { MyWallet } from "../components/sections/MyWallet"; // افتراض وجود خدمة تحتوي على الدالة

export const metadata = {
  title: "المحفظة - MedA+ Academy",
  description: "إدارة المحفظة والمعاملات المالية في أكاديمية MedA+",
};

const findWalletByUserId = async (page: number) => {
  try {
    const response = await axiosInstance.get(`/users/wallet?page=${page}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching wallet:", error);
    return { wallet: [], totalPages: 1 };
  }
};

export default async function WalletPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1", 10);

  // جلب بيانات المحفظة والمعاملات باستخدام الكويري
  const { wallet, transactions, total } = await findWalletByUserId(page);

  return (
    <MyWallet
      wallet={wallet}
      transactions={transactions}
      total={total}
      currentPage={page}
    />
  );
}
