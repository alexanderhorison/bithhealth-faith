// Pharmacy delivery service for handling delivery data processing
import { ApiResponse } from './types'

export interface PharmacyDeliveryData {
  data: File
  Month: string
}

export class PharmacyDeliveryService {
  private static readonly API_BASE_URL = process.env.NEXT_PUBLIC_N8N_URL

  static async submitDeliveryData(data: PharmacyDeliveryData): Promise<ApiResponse> {
    const formData = new FormData()
    formData.append('data', data.data)
    formData.append('Month', data.Month)

    try {
      // Simulate processing time for better UX demonstration
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const response = await fetch(`${this.API_BASE_URL}/pharmacy-delivery/reconsile`, {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to process delivery data')
      }

      return {
        success: true,
        message: result.message || 'Workflow was started',
        data: result
      }
      
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to process delivery data')
    }
  }

  static async generateSummaryReport(month: string): Promise<ApiResponse> {
    try {
      if (!this.API_BASE_URL) {
        throw new Error('API base URL not configured')
      }

      // Simulate processing time for better UX demonstration
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const url = `${this.API_BASE_URL}/pharmacy-delivery/generate-summary-report?month=${month}`
      console.log('Making request to:', url)
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      const result = await response.json()

      return {
        success: true,
        message: result.message || 'Summary report generated successfully',
        data: result
      }
      
    } catch (error) {
      console.error('Summary report generation error:', error)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to the API. Please check your internet connection.')
      }
      throw new Error(error instanceof Error ? error.message : 'Failed to generate summary report')
    }
  }
}