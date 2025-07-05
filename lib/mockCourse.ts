// Simplified data for Overview page
export const mockCourseOverview = {
  id: 2,
  title: "مقدمة فى مادة الطب البشرى",
  instractor_name: "محمد بدرى",
  description:
    "دورة شاملة في طب القلب المتقدم تغطي جميع الجوانب النظرية والعملية",
  totalDuration: "45 ساعة",
  studentsCount: 1250,
  rating: 4.8,
  poster: "/Uploads/posters/course-1751116792875-689692187.jpg",
  sections: {
    midterm: {
      title: "الجزء الأول",
      description: "المفاهيم الأساسية في طب القلب",
      chapters: [
        {
          id: 1,
          title: "Introduction to Cardiology",
          description: "مقدمة في طب القلب والأوعية الدموية",
          duration: "2:30:00",
          videosCount: 8,
          videos: [
            { id: 1, title: "Heart Anatomy Overview", duration: "15:30" },
            { id: 2, title: "Cardiac Cycle Basics", duration: "20:45" },
            { id: 3, title: "Blood Flow Dynamics", duration: "18:20" },
          ],
        },
        {
          id: 2,
          title: "Cardiac Examination",
          description: "فحص القلب السريري والتشخيص",
          duration: "3:15:00",
          videosCount: 12,
          videos: [
            { id: 4, title: "Physical Examination", duration: "25:10" },
            { id: 5, title: "Heart Sounds Analysis", duration: "30:20" },
          ],
        },
      ],
    },
    final: {
      title: "الجزء النهائي",
      description: "التطبيقات العملية المتقدمة",
      chapters: [
        {
          id: 3,
          title: "Advanced Diagnostics",
          description: "التشخيص المتقدم لأمراض القلب",
          duration: "5:20:00",
          videosCount: 18,
          videos: [],
        },
      ],
    },
  },
};

// Full data for Content page
export const mockCourseContent = {
  id: 2,
  title: "مقدمة فى مادة الطب البشرى",
  instractor_name: "محمد بدرى",
  description:
    "دورة شاملة في طب القلب المتقدم تغطي جميع الجوانب النظرية والعملية",
  totalDuration: "45 ساعة",
  studentsCount: 1250,
  progress: 35,
  poster: "/Uploads/posters/course-1751116792875-689692187.jpg",
  sections: {
    midterm: {
      title: "جزء midterm",
      description: "المفاهيم الأساسية في طب القلب",
      chapters: [
        {
          id: 1,
          title: "Introduction to Cardiology",
          description: "مقدمة في طب القلب والأوعية الدموية",
          isCompleted: true,
          videos: [
            {
              id: 1,
              title: "Heart Anatomy Overview",
              isCompleted: true,
            },
            {
              id: 2,
              title: "Cardiac Cycle Basics",
              duration: "20:45",
              isCompleted: true,
            },
            {
              id: 3,
              title: "Blood Flow Dynamics",
              isCompleted: false,
            },
          ],
        },
        {
          id: 2,
          title: "Cardiac Examination",
          description: "فحص القلب السريري والتشخيص",
          duration: "3:15:00",
          videosCount: 12,
          isCompleted: false,
          videos: [
            {
              id: 4,
              title: "Physical Examination",
              isCompleted: false,
            },
            {
              id: 5,
              title: "Heart Sounds Analysis",
              isCompleted: false,
            },
          ],
        },
      ],
    },
    final: {
      title: "جزء final",
      description: "التطبيقات العملية المتقدمة",
      chapters: [
        {
          id: 3,
          title: "Advanced Diagnostics",
          description: "التشخيص المتقدم لأمراض القلب",
          isCompleted: false,
          videos: [],
        },
      ],
    },
  },
};
