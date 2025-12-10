// Timesheet service for handling Talenta timesheet operations
import { ApiResponse } from './types'

export interface TimesheetData {
  file: File
}

export interface TimesheetPdfData {
  date: string
}

export interface TimesheetMergeData {
  files: FileList
}

export class TimesheetService {
  private static readonly API_BASE_URL = 'https://n8n.zenithtech.cloud/webhook-test'

  static async summarizeTimesheet(data: TimesheetData): Promise<ApiResponse> {
    try {
      // Simulate processing time for better UX demonstration
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For testing: always return success to demonstrate complete workflow
      const mockResponse = {
        status: 'success',
        processedAt: new Date().toISOString(),
        fileName: data.file.name,
        recordsProcessed: Math.floor(Math.random() * 1000) + 500,
        summaryGenerated: true,
        totalHours: Math.floor(Math.random() * 200) + 160
      }

      return {
        success: true,
        message: `Successfully processed ${mockResponse.recordsProcessed} timesheet records. Generated summary with ${mockResponse.totalHours} total hours.`,
        data: mockResponse
      }

      /* Uncomment when ready to use real N8N webhook:
      const formData = new FormData()
      formData.append('file', data.file)

      const response = await fetch(`${this.API_BASE_URL}/timesheet-summary`, {
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
      */
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to process timesheet')
    }
  }

  static async generatePdf(data: TimesheetPdfData): Promise<ApiResponse> {
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockResponse = {
        status: 'success',
        processedAt: new Date().toISOString(),
        date: data.date,
        pdfGenerated: true,
        fileSize: '2.4MB'
      }

      return {
        success: true,
        message: `PDF generated successfully for ${data.date}. File size: ${mockResponse.fileSize}`,
        data: mockResponse
      }

      /* Uncomment for real API:
      const response = await fetch(`${this.API_BASE_URL}/generate-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: data.date }),
      })
      */
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to generate PDF')
    }
  }

  static async mergePdfs(data: TimesheetMergeData): Promise<ApiResponse> {
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const fileCount = data.files.length
      const mockResponse = {
        status: 'success',
        processedAt: new Date().toISOString(),
        filesCount: fileCount,
        mergedFileName: `merged_timesheets_${new Date().toISOString().split('T')[0]}.pdf`,
        totalSize: '8.7MB'
      }

      return {
        success: true,
        message: `Successfully merged ${fileCount} PDF files into ${mockResponse.mergedFileName}. Total size: ${mockResponse.totalSize}`,
        data: mockResponse
      }

      /* Uncomment for real API:
      const formData = new FormData()
      for (let i = 0; i < data.files.length; i++) {
        formData.append('files', data.files[i])
      }

      const response = await fetch(`${this.API_BASE_URL}/merge-pdf`, {
        method: 'POST',
        body: formData,
      })
      */
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to merge PDFs')
    }
  }
}