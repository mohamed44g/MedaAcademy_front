import { DeleteAccount } from "../components/sections/DeleteAccount"

// Mock user data
const mockUser = {
  name: "أحمد محمد",
  email: "ahmed@example.com",
}

export const metadata = {
  title: "حذف الحساب - MedA+ Academy",
  description: "حذف الحساب نهائياً من أكاديمية MedA+",
}

export default function DeleteAccountPage() {
  return <DeleteAccount user={mockUser} />
}
