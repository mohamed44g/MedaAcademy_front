"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Mock data
const mockUsers = [
  {
    id: 1,
    name: "أحمد محمد علي",
    email: "ahmed@example.com",
    role: "student",
    status: "active",
    created_at: "2024-01-15",
    phone: "01234567890",
    specialty: "طب القلب",
  },
  {
    id: 2,
    name: "فاطمة حسن محمود",
    email: "fatma@example.com",
    role: "instructor",
    status: "active",
    created_at: "2024-01-10",
    phone: "01234567891",
    specialty: "طب الأطفال",
  },
  {
    id: 3,
    name: "محمد عبد الرحمن",
    email: "mohamed@example.com",
    role: "student",
    status: "inactive",
    created_at: "2024-01-20",
    phone: "01234567892",
    specialty: "الجراحة العامة",
  },
  {
    id: 4,
    name: "سارة أحمد إبراهيم",
    email: "sara@example.com",
    role: "admin",
    status: "active",
    created_at: "2024-01-05",
    phone: "01234567893",
    specialty: "إدارة",
  },
  {
    id: 5,
    name: "عمر خالد محمد",
    email: "omar@example.com",
    role: "student",
    status: "active",
    created_at: "2024-01-25",
    phone: "01234567894",
    specialty: "طب العيون",
  },
  {
    id: 6,
    name: "نور الدين حسام",
    email: "nour@example.com",
    role: "instructor",
    status: "active",
    created_at: "2024-01-12",
    phone: "01234567895",
    specialty: "طب الأسنان",
  },
  {
    id: 7,
    name: "ليلى محمود سعد",
    email: "layla@example.com",
    role: "student",
    status: "pending",
    created_at: "2024-01-30",
    phone: "01234567896",
    specialty: "الطب النفسي",
  },
  {
    id: 8,
    name: "يوسف عادل أحمد",
    email: "youssef@example.com",
    role: "student",
    status: "active",
    created_at: "2024-01-18",
    phone: "01234567897",
    specialty: "طب القلب",
  },
];

const mockCourses = [
  {
    id: 1,
    title: "أساسيات طب القلب",
    description: "كورس شامل يغطي أساسيات طب القلب والأوعية الدموية",
    price: 500,
    specialty_id: 1,
    specialty_name: "طب القلب",
    poster: "/placeholder.svg?height=200&width=300",
    instructor: "د. أحمد محمد",
    students_count: 150,
    created_at: "2024-01-10",
  },
  {
    id: 2,
    title: "طب الأطفال المتقدم",
    description: "دراسة متعمقة في طب الأطفال والرعاية الصحية للأطفال",
    price: 0,
    specialty_id: 2,
    specialty_name: "طب الأطفال",
    poster: "/placeholder.svg?height=200&width=300",
    instructor: "د. فاطمة حسن",
    students_count: 89,
    created_at: "2024-01-15",
  },
  {
    id: 3,
    title: "الجراحة العامة الأساسية",
    description: "مبادئ وأساسيات الجراحة العامة للطلاب المبتدئين",
    price: 750,
    specialty_id: 3,
    specialty_name: "الجراحة العامة",
    poster: "/placeholder.svg?height=200&width=300",
    instructor: "د. محمد عبد الرحمن",
    students_count: 67,
    created_at: "2024-01-20",
  },
  {
    id: 4,
    title: "طب العيون التشخيصي",
    description: "تشخيص وعلاج أمراض العيون الشائعة",
    price: 600,
    specialty_id: 4,
    specialty_name: "طب العيون",
    poster: "/placeholder.svg?height=200&width=300",
    instructor: "د. عمر خالد",
    students_count: 45,
    created_at: "2024-01-25",
  },
  {
    id: 5,
    title: "طب الأسنان الوقائي",
    description: "الوقاية من أمراض الأسنان واللثة",
    price: 400,
    specialty_id: 5,
    specialty_name: "طب الأسنان",
    poster: "/placeholder.svg?height=200&width=300",
    instructor: "د. نور الدين حسام",
    students_count: 78,
    created_at: "2024-01-30",
  },
  {
    id: 6,
    title: "الطب النفسي الإكلينيكي",
    description: "أسس التشخيص والعلاج في الطب النفسي",
    price: 650,
    specialty_id: 6,
    specialty_name: "الطب النفسي",
    poster: "/placeholder.svg?height=200&width=300",
    instructor: "د. ليلى محمود",
    students_count: 92,
    created_at: "2024-02-01",
  },
  {
    id: 7,
    title: "طب النساء والتوليد",
    description: "رعاية صحة المرأة والحمل والولادة",
    price: 800,
    specialty_id: 7,
    specialty_name: "طب النساء والتوليد",
    poster: "/placeholder.svg?height=200&width=300",
    instructor: "د. منى أحمد",
    students_count: 134,
    created_at: "2024-02-05",
  },
  {
    id: 8,
    title: "طب الأعصاب المتقدم",
    description: "تشخيص وعلاج أمراض الجهاز العصبي",
    price: 900,
    specialty_id: 8,
    specialty_name: "طب الأعصاب",
    poster: "/placeholder.svg?height=200&width=300",
    instructor: "د. حسام محمد",
    students_count: 76,
    created_at: "2024-02-10",
  },
];

const mockWorkshops = [
  {
    id: 1,
    title: "ورشة الإسعافات الأولية المتقدمة",
    description: "تدريب عملي على تقنيات الإسعافات الأولية الحديثة",
    date: "2024-07-15",
    duration: "6 ساعات",
    price: 200,
    max_participants: 25,
    current_participants: 18,
    instructor: "د. أحمد محمد",
    location: "قاعة التدريب الرئيسية",
    status: "upcoming",
    poster: "/placeholder.svg?height=200&width=300",
    category: "طب الطوارئ",
  },
  {
    id: 2,
    title: "ورشة تقنيات الجراحة بالمنظار",
    description: "تدريب عملي على استخدام المنظار في العمليات الجراحية",
    date: "2024-07-20",
    duration: "8 ساعات",
    price: 500,
    max_participants: 15,
    current_participants: 12,
    instructor: "د. محمد عبد الرحمن",
    location: "مختبر المحاكاة الطبية",
    status: "upcoming",
    poster: "/placeholder.svg?height=200&width=300",
    category: "الجراحة العامة",
  },
];

const mockComments = [
  {
    id: 1,
    content: "كورس ممتاز ومفيد جداً، شكراً للدكتور",
    user_name: "أحمد محمد",
    course_title: "أساسيات طب القلب",
    status: "approved",
    created_at: "2024-01-15",
    rating: 5,
  },
  {
    id: 2,
    content: "المحتوى جيد لكن يحتاج لمزيد من الأمثلة العملية",
    user_name: "فاطمة حسن",
    course_title: "طب الأطفال المتقدم",
    status: "pending",
    created_at: "2024-01-20",
    rating: 4,
  },
  {
    id: 3,
    content: "شرح واضح ومبسط، أنصح به بشدة",
    user_name: "محمد عبد الرحمن",
    course_title: "الجراحة العامة الأساسية",
    status: "approved",
    created_at: "2024-01-25",
    rating: 5,
  },
  {
    id: 4,
    content: "محتوى غير مناسب للمستوى المبتدئ",
    user_name: "سارة أحمد",
    course_title: "طب العيون التشخيصي",
    status: "rejected",
    created_at: "2024-01-30",
    rating: 2,
  },
  {
    id: 5,
    content: "كورس رائع وشامل، استفدت منه كثيراً",
    user_name: "عمر خالد",
    course_title: "طب الأسنان الوقائي",
    status: "approved",
    created_at: "2024-02-01",
    rating: 5,
  },
  {
    id: 6,
    content: "يحتاج لتحديث المعلومات وإضافة مراجع حديثة",
    user_name: "ليلى محمود",
    course_title: "أساسيات طب القلب",
    status: "pending",
    created_at: "2024-02-05",
    rating: 3,
  },
];

const mockSpecialties = [
  { id: 1, name: "طب القلب" },
  { id: 2, name: "طب الأطفال" },
  { id: 3, name: "الجراحة العامة" },
  { id: 4, name: "طب العيون" },
  { id: 5, name: "طب الأسنان" },
  { id: 6, name: "الطب النفسي" },
  { id: 7, name: "طب النساء والتوليد" },
  { id: 8, name: "طب الأعصاب" },
];

const mockStats = {
  totalUsers: mockUsers.length,
  totalCourses: mockCourses.length,
  totalWorkshops: mockWorkshops.length,
  totalComments: mockComments.length,
  totalRevenue:
    mockCourses.reduce((sum, course) => sum + course.price, 0) +
    mockWorkshops.reduce((sum, workshop) => sum + workshop.price, 0),
  activeUsers: mockUsers.filter((user) => user.status === "active").length,
  pendingComments: mockComments.filter(
    (comment) => comment.status === "pending"
  ).length,
  upcomingWorkshops: mockWorkshops.filter(
    (workshop) => workshop.status === "upcoming"
  ).length,
  monthlyRevenue: [
    { month: "يناير", revenue: 15000 },
    { month: "فبراير", revenue: 18000 },
    { month: "مارس", revenue: 22000 },
    { month: "أبريل", revenue: 19000 },
    { month: "مايو", revenue: 25000 },
    { month: "يونيو", revenue: 28000 },
  ],
  usersByRole: [
    {
      role: "طلاب",
      count: mockUsers.filter((user) => user.role === "student").length,
    },
    {
      role: "مدرسين",
      count: mockUsers.filter((user) => user.role === "instructor").length,
    },
    {
      role: "إداريين",
      count: mockUsers.filter((user) => user.role === "admin").length,
    },
  ],
  coursesBySpecialty: [
    { specialty: "طب القلب", count: 1 },
    { specialty: "طب الأطفال", count: 1 },
    { specialty: "الجراحة العامة", count: 1 },
    { specialty: "طب العيون", count: 1 },
    { specialty: "طب الأسنان", count: 1 },
  ],
  popularWorkshops: mockWorkshops
    .sort((a, b) => b.current_participants - a.current_participants)
    .slice(0, 5)
    .map((workshop) => ({
      id: workshop.id,
      title: workshop.title,
      participants: workshop.current_participants,
    })),
};

// Mock chapters data
const mockChapters = [
  {
    id: 1,
    title: "مقدمة في طب القلب",
    type: "midterm",
    videosCount: 5,
    courseId: 1,
  },
  {
    id: 2,
    title: "تشخيص أمراض القلب",
    type: "midterm",
    videosCount: 8,
    courseId: 1,
  },
  {
    id: 3,
    title: "علاج أمراض القلب",
    type: "final",
    videosCount: 12,
    courseId: 1,
  },
  {
    id: 4,
    title: "جراحة القلب المتقدمة",
    type: "final",
    videosCount: 15,
    courseId: 1,
  },
  {
    id: 5,
    title: "نمو وتطور الطفل",
    type: "midterm",
    videosCount: 6,
    courseId: 2,
  },
  {
    id: 6,
    title: "أمراض الأطفال الشائعة",
    type: "final",
    videosCount: 10,
    courseId: 2,
  },
];

// Mock videos data
const mockVideos = [
  { id: 1, title: "تشريح القلب الأساسي", duration: "15:30", chapterId: 1 },
  { id: 2, title: "وظائف القلب", duration: "20:45", chapterId: 1 },
  { id: 3, title: "الدورة الدموية", duration: "18:20", chapterId: 1 },
  { id: 4, title: "أمراض الشرايين التاجية", duration: "25:10", chapterId: 2 },
  { id: 5, title: "تخطيط القلب", duration: "30:20", chapterId: 2 },
  { id: 6, title: "قسطرة القلب", duration: "22:15", chapterId: 2 },
  { id: 7, title: "أدوية القلب", duration: "28:30", chapterId: 3 },
  { id: 8, title: "العلاج الطبيعي للقلب", duration: "19:45", chapterId: 3 },
  { id: 9, title: "نمو الطفل الطبيعي", duration: "16:20", chapterId: 5 },
  { id: 10, title: "التطعيمات", duration: "24:10", chapterId: 5 },
];

// Hooks
export const useStats = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      console.log("Fetching admin stats...");
      return mockStats;
    },
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      console.log("Fetching users...");
      return mockUsers;
    },
  });
};

export const useCourses = () => {
  return useQuery({
    queryKey: ["admin-courses"],
    queryFn: async () => {
      console.log("Fetching courses...");
      return mockCourses;
    },
  });
};

export const useWorkshops = () => {
  return useQuery({
    queryKey: ["admin-workshops"],
    queryFn: async () => {
      console.log("Fetching workshops...");
      return mockWorkshops;
    },
  });
};

export const useWorkshopParticipants = (workshopId: number) => {
  return useQuery({
    queryKey: ["workshop-participants", workshopId],
    queryFn: async () => {
      console.log("Fetching workshop participants for:", workshopId);
      // Return random participants from mockUsers
      const shuffled = [...mockUsers].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.floor(Math.random() * 10) + 5);
    },
    enabled: !!workshopId,
  });
};

export const useComments = () => {
  return useQuery({
    queryKey: ["admin-comments"],
    queryFn: async () => {
      console.log("Fetching comments...");
      return mockComments;
    },
  });
};

export const useSpecialties = () => {
  return useQuery({
    queryKey: ["specialties"],
    queryFn: async () => {
      console.log("Fetching specialties...");
      return mockSpecialties;
    },
  });
};

export const useChapters = (courseId?: number) => {
  return useQuery({
    queryKey: ["chapters", courseId],
    queryFn: async () => {
      console.log("Fetching chapters for course:", courseId);
      return courseId
        ? mockChapters.filter((chapter) => chapter.courseId === courseId)
        : [];
    },
    enabled: !!courseId,
  });
};

export const useVideos = (chapterId?: number) => {
  return useQuery({
    queryKey: ["videos", chapterId],
    queryFn: async () => {
      console.log("Fetching videos for chapter:", chapterId);
      return chapterId
        ? mockVideos.filter((video) => video.chapterId === chapterId)
        : [];
    },
    enabled: !!chapterId,
  });
};

// Mutations
export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, role }: { userId: number; role: string }) => {
      console.log("Updating user role:", { userId, role });
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      console.log("Creating course:", Object.fromEntries(formData));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
    },
  });
};

export const useCreateWorkshop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      console.log("Creating workshop:", Object.fromEntries(formData));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-workshops"] });
    },
  });
};

export const useDeleteWorkshop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (workshopId: number) => {
      console.log("Deleting workshop:", workshopId);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-workshops"] });
    },
  });
};

export const useCreateChapter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      course_id: number;
      title: string;
      type: string;
    }) => {
      console.log("Creating chapter:", data);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chapters"] });
    },
  });
};

export const useCreateVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      console.log("Creating video:", Object.fromEntries(formData));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
};

export const useUpdateCommentStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      commentId,
      status,
    }: {
      commentId: number;
      status: string;
    }) => {
      console.log("Updating comment status:", { commentId, status });
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-comments"] });
    },
  });
};
