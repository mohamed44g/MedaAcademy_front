// Mock API functions - replace with real API calls

export async function getInstructorData(instructorId: string) {
  // Simulate API call
  const response = await fetch(`/api/instructor/${instructorId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch instructor data")
  }

  return response.json()
}

export async function getInstructorCourses(
  instructorId: string,
  options: {
    page?: number
    category?: string
    level?: string
    search?: string
  } = {},
) {
  const { page = 1, category, level, search } = options

  const params = new URLSearchParams({
    page: page.toString(),
    ...(category && { category }),
    ...(level && { level }),
    ...(search && { search }),
  })

  const response = await fetch(`/api/courses/instructor/${instructorId}?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch instructor courses")
  }

  return response.json()
}

export async function contactInstructor(instructorId: string, message: string) {
  const response = await fetch(`/api/instructor/${instructorId}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to send message")
  }

  return response.json()
}
