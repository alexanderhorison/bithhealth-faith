// Jira service for handling Jira timesheet operations
import { ApiResponse } from './types'

export interface JiraGeneratorData {
  timesheetPdf: File
  spreadsheetLink: string
  lastDate: string
}

export interface JiraUploadData {
  file: File
}

export class JiraService {
  private static readonly API_BASE_URL = 'https://n8n.zenithtech.cloud/webhook-test'

  static async generateTimesheetReport(data: JiraGeneratorData): Promise<ApiResponse> {
    try {
      // Simulate processing time for better UX demonstration
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      // For testing: always return success to demonstrate complete workflow
      const mockResponse = {
        status: 'success',
        processedAt: new Date().toISOString(),
        timesheetFile: data.timesheetPdf.name,
        spreadsheetUrl: data.spreadsheetLink,
        lastProcessedDate: data.lastDate,
        reportGenerated: true,
        issuesProcessed: Math.floor(Math.random() * 50) + 20,
        totalHours: Math.floor(Math.random() * 100) + 80
      }

      return {
        success: true,
        message: `Jira timesheet report generated successfully! Processed ${mockResponse.issuesProcessed} issues with ${mockResponse.totalHours} total hours logged.`,
        data: mockResponse
      }

      /* Uncomment when ready to use real N8N webhook:
      const formData = new FormData()
      formData.append('timesheetPdf', data.timesheetPdf)
      formData.append('spreadsheetLink', data.spreadsheetLink)
      formData.append('lastDate', data.lastDate)

      const response = await fetch(`${this.API_BASE_URL}/jira-generator`, {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to generate Jira report')
      }

      return {
        success: true,
        message: result.message || 'Jira report generated successfully',
        data: result
      }
      */
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to generate Jira timesheet report')
    }
  }

  static async uploadTimesheet(data: JiraUploadData): Promise<ApiResponse> {
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockResponse = {
        status: 'success',
        processedAt: new Date().toISOString(),
        fileName: data.file.name,
        uploadedToJira: true,
        recordsUploaded: Math.floor(Math.random() * 200) + 100,
        jiraTicketsUpdated: Math.floor(Math.random() * 25) + 15
      }

      return {
        success: true,
        message: `Successfully uploaded ${mockResponse.recordsUploaded} timesheet records to Jira. Updated ${mockResponse.jiraTicketsUpdated} tickets.`,
        data: mockResponse
      }

      /* Uncomment for real API:
      const formData = new FormData()
      formData.append('file', data.file)

      const response = await fetch(`${this.API_BASE_URL}/jira-upload`, {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to upload to Jira')
      }

      return {
        success: true,
        message: result.message || 'Timesheet uploaded to Jira successfully',
        data: result
      }
      */
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to upload timesheet to Jira')
    }
  }
}