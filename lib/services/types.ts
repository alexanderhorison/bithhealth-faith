// Shared types for all services

/**
 * Generic API response wrapper with typed data
 */
export interface ApiResponse<T = Record<string, unknown>> {
  success: boolean
  message: string
  data?: T
}

/**
 * API error response
 */
export interface ApiError {
  code: string
  message: string
  status: number
  details?: Record<string, unknown>
}

/**
 * Form submission state
 */
export interface FormSubmissionState {
  isSubmitting: boolean
  isResetting: boolean
  error?: string
}

/**
 * Form submission callbacks
 */
export interface FormSubmissionCallbacks {
  onSuccess?: (data?: unknown) => void | Promise<void>
  onError?: (error: Error) => void | Promise<void>
}

/**
 * Talenta Timesheet workflow types
 */
export interface TimesheetData {
  file: File
  file_name: string
}

export interface TimesheetSummarizeResponse {
  success: true
  message: string
  data?: unknown
}

export interface GeneratePdfData {
  date: string
}

export interface GeneratePdfResponse {
  success: true
  message: string
  pdfUrl?: string
}

export interface MergePdfData {
  date: string
  sendTo: string
}

export interface MergePdfResponse {
  success: true
  message: string
  mergedPdfUrl?: string
}

/**
 * Jira Timesheet workflow types
 */
export interface JiraGeneratorData {
  driveLink: string
  spreadSheetName: string
  lastDate: string
}

export interface JiraGeneratorResponse {
  success: true
  message: string
  reportUrl?: string
}

export interface JiraUploadData {
  files: File[]
  spreadsheetLink: string
  lastDate: string
}

export interface JiraUploadResponse {
  success: true
  message: string
  uploadedCount?: number
}

/**
 * Pharmacy Delivery workflow types
 */
export interface PharmacyDeliveryData {
  data: File
  month: string
}

export interface PharmacyDeliveryResponse {
  success: true
  message: string
  reconciliationId?: string
}

export interface PharmacySummaryData {
  month: string
}

export interface PharmacySummaryResponse {
  success: true
  message: string
  reportUrl?: string
}

/**
 * File upload common types
 */
export interface FileUploadData {
  file: File | File[]
  metadata?: Record<string, unknown>
}

export interface FileUploadResponse {
  success: true
  message: string
  fileUrl?: string
  uploadedCount?: number
}

/**
 * Validation error type
 */
export interface ValidationError {
  field: string
  message: string
}