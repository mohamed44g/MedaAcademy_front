import { MyWorkshops } from "../components/sections/MyWorkshops"

// Mock workshops data
const mockWorkshops = [
  {
    id: 1,
    title: "ورشة الإسعافات الأولية",
    description: "تعلم أساسيات الإسعافات الأولية",
    price: 150.0,
    formattedDate: "28 يونيو 2025",
    duration: "4 ساعات",
    image_url: "/placeholder.svg?height=200&width=300",
    status: "upcoming",
    location: "قاعة المؤتمرات - المبنى الرئيسي",
    instructor: "د. سارة أحمد",
  },
]

export const metadata = {
  title: "ورشي - MedA+ Academy",
  description: "إدارة الورش المسجل بها في أكاديمية MedA+",
}

export default function WorkshopsPage() {
  return <MyWorkshops workshops={mockWorkshops} />
}
