// Base service for common API operations
import { ApiResponse, ApiError } from './types'
import { DELAYS } from '@/lib/config/constants'

export interface FetchOptions {
  endpoint: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: FormData | Record<string, unknown>
  headers?: Record<string, string>
  delay?: number
  queryParams?: Record<string, string | number>
}

export class BaseService {
  protected static readonly API_BASE_URL = process.env.NEXT_PUBLIC_N8N_URL

  /**
   * Centralized fetch method for API calls
   */
  protected static async fetch<T = unknown>(options: FetchOptions): Promise<ApiResponse<T>> {
    try {
      const { endpoint, method = 'POST', body, headers, delay, queryParams } = options

      // Apply processing delay if specified
      if (delay) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }

      let url = `${this.API_BASE_URL}${endpoint}`

      // Append query parameters if provided
      if (queryParams) {
        const searchParams = new URLSearchParams()
        Object.entries(queryParams).forEach(([key, value]) => {
          searchParams.append(key, String(value))
        })
        url += `?${searchParams.toString()}`
      }

      // Build fetch options
      const fetchOptions: RequestInit = {
        method,
      }

      // Handle different body types (GET requests shouldn't have body)
      if (body && method !== 'GET') {
        if (body instanceof FormData) {
          fetchOptions.body = body
        } else {
          fetchOptions.headers = { ...headers, 'Content-Type': 'application/json' }
          fetchOptions.body = JSON.stringify(body)
        }
      }

      // Apply custom headers for non-FormData requests
      if (headers && !(body instanceof FormData)) {
        fetchOptions.headers = { ...fetchOptions.headers, ...headers }
      }

      // Add default headers for GET requests
      if (method === 'GET' && !fetchOptions.headers) {
        fetchOptions.headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }

      const response = await fetch(url, fetchOptions)
      const result = await response.json()

      if (!response.ok) {
        throw this.createError(result, response.status)
      }

      return {
        success: true,
        message: result.message || 'Operation completed successfully',
        data: result as T,
      }
    } catch (error) {
      if (error instanceof Error && 'code' in error) {
        throw error // Re-throw ApiError
      }
      throw new Error(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      )
    }
  }

  /**
   * Helper to create standardized error objects
   */
  protected static createError(
    errorData: Record<string, unknown>,
    status: number
  ): ApiError {
    return {
      code: (errorData.code as string) || 'API_ERROR',
      message: (errorData.message as string) || 'An error occurred',
      status,
      details: errorData.details as Record<string, unknown>,
    }
  }

  /**
   * Helper to create FormData from object
   */
  protected static createFormData(
    data: Record<string, unknown>
  ): FormData {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value)
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (item instanceof File) {
            formData.append(`${key}[${index}]`, item)
          }
        })
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value))
      }
    })
    return formData
  }

  /**
   * Helper to get delay constant by workflow
   */
  protected static getDelay(workflowKey: keyof typeof DELAYS): number {
    return DELAYS[workflowKey] || 2000
  }
}
