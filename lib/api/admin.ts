import { axiosInstance } from "../axiosClient";

// Types
export interface DashboardStats {
  total_users: number;
  total_courses: number;
  total_videos: number;
  total_comments: number;
  completed_videos: number;
  active_users_daily: number;
  active_users_weekly: number;
  new_comments_daily: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  phone: string;
  status: "active" | "banned" | "pending";
  specialty?: string;
  created_at: string;
  updated_at: string;
}

export interface PopularCourse {
  id: number;
  title: string;
  completed_count: number;
}

export interface PopularVideo {
  id: number;
  title: string;
  view_count: number;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  specialty_id: number;
  specialty_name: string;
  poster?: string;
  created_at: string;
}

export interface Chapter {
  id: number;
  course_id: number;
  title: string;
  type: "midterm" | "final";
  created_at: string;
}

export interface Video {
  id: number;
  title: string;
  chapter_id: number;
  video_url: string;
  duration?: string;
  created_at: string;
}

export interface Comment {
  id: number;
  user_id: number;
  user_name: string;
  video_id: number;
  video_title: string;
  content: string;
  status: "approved" | "pending" | "rejected";
  created_at: string;
}

export interface Specialty {
  id: number;
  name: string;
}

// API Functions
export const adminApi = {
  // Dashboard Stats
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await axiosInstance.get("/admin/dashboard");
    return response.data.data;
  },

  // Users Management
  getUsers: async (): Promise<User[]> => {
    const response = await axiosInstance.get("/admin/users");
    return response.data.data;
  },

  updateUserRole: async (userId: number, role: string): Promise<void> => {
    await axiosInstance.patch(`/admin/users/${userId}/role`, { role });
  },

  updateUserStatus: async (userId: number, status: string): Promise<void> => {
    await axiosInstance.patch(`/admin/users/${userId}/status`, { status });
  },

  deleteUser: async (userId: number): Promise<void> => {
    await axiosInstance.delete(`/admin/users/${userId}`);
  },

  // Courses Management
  getPopularCourses: async (): Promise<PopularCourse[]> => {
    const response = await axiosInstance.get("/admin/popular-courses");
    return response.data.data;
  },

  getPopularVideos: async (): Promise<PopularVideo[]> => {
    const response = await axiosInstance.get("/admin/popular-videos");
    return response.data.data;
  },

  getCourses: async (): Promise<Course[]> => {
    const response = await axiosInstance.get("/admin/courses");
    return response.data.data;
  },

  createCourse: async (courseData: FormData): Promise<Course> => {
    const response = await axiosInstance.post("/admin/courses", courseData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  },

  deleteCourse: async (courseId: number): Promise<void> => {
    await axiosInstance.delete(`/admin/courses/${courseId}`);
  },

  // Chapters Management
  createChapter: async (chapterData: {
    course_id: number;
    title: string;
    type: "midterm" | "final";
  }): Promise<Chapter> => {
    const response = await axiosInstance.post(
      `/chapters/${chapterData.course_id}`,
      chapterData
    );
    return response.data.data;
  },

  getChapters: async (courseId: number): Promise<Chapter[]> => {
    const response = await axiosInstance.get(`/chapters/${courseId}`);
    return response.data.data;
  },

  // Videos Management
  createVideo: async (videoData: FormData): Promise<Video> => {
    const response = await axiosInstance.post("/videos", videoData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  },

  getVideos: async (chapterId: number): Promise<Video[]> => {
    const response = await axiosInstance.get(`/videos/${chapterId}`);
    return response.data.data;
  },

  // Comments Management
  getComments: async (): Promise<Comment[]> => {
    const response = await axiosInstance.get("/admin/comments");
    return response.data.data;
  },

  updateCommentStatus: async (
    commentId: number,
    status: string
  ): Promise<void> => {
    await axiosInstance.patch(`/admin/comments/${commentId}/status`, {
      status,
    });
  },

  deleteComment: async (commentId: number): Promise<void> => {
    await axiosInstance.delete(`/admin/comments/${commentId}`);
  },

  // Specialties
  getSpecialties: async (): Promise<Specialty[]> => {
    const response = await axiosInstance.get("/specialties");
    return response.data.data;
  },
};
