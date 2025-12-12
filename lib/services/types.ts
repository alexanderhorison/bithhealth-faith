// Shared types for all services
export interface ApiResponse {
  success: boolean
  message: string
  data?: Record<string, unknown> // More specific than any
}