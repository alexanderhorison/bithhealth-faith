// Timesheet service for handling Talenta timesheet operations
import { ApiResponse } from './types'

export interface TimesheetData {
  file: File
  file_name: string
}

export interface TimesheetPdfData {
  date: string
}

export interface TimesheetMergeData {
  date: string
  sendTo: string
}

export class TimesheetService {
  private static readonly API_BASE_URL = process.env.NEXT_PUBLIC_N8N_URL

  static async summarizeTimesheet(data: TimesheetData): Promise<ApiResponse> {
    try {
      // Simulate processing time for better UX demonstration
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const formData = new FormData()
      formData.append('file', data.file)
      formData.append('file_name', data.file_name)

      const response = await fetch(`${this.API_BASE_URL}/talenta-timesheet/summarize`, {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to process timesheet')
      }

      return {
        success: true,
        message: result.message || 'Timesheet processed successfully',
        data: result
      }
      
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to process timesheet')
    }
  }

  static async generatePdf(data: TimesheetPdfData): Promise<ApiResponse> {
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const response = await fetch(`${this.API_BASE_URL}/talenta-timesheet/generate-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: data.date }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to generate PDF')
      }

      return {
        success: true,
        message: result.message || 'PDF generated successfully',
        data: result
      }
      
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to generate PDF')
    }
  }

  static async mergePdfs(data: TimesheetMergeData): Promise<ApiResponse> {
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const formData = new FormData()
      formData.append('date', data.date)
      formData.append('sendTo', data.sendTo)

      const response = await fetch(`${this.API_BASE_URL}/talenta-timesheet/merge-pdf`, {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to merge PDFs')
      }

      return {
        success: true,
        message: result.message || 'PDFs merged successfully',
        data: result
      }
      
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to merge PDFs')
    }
  }
}