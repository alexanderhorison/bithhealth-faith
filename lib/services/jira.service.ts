// Jira service for handling Jira timesheet operations
import { BaseService } from './base.service'
import {
  ApiResponse,
  JiraGeneratorData,
  JiraUploadData,
  JiraGeneratorResponse,
  JiraUploadResponse,
} from './types'

export class JiraService extends BaseService {
  static async generateTimesheetReport(
    data: JiraGeneratorData
  ): Promise<ApiResponse<JiraGeneratorResponse>> {
    const formData = new FormData()
    formData.append('Folder Link', data.driveLink)
    formData.append('Generated Excel Timesheet Name', data.spreadSheetName)
    formData.append('Last Date for timesheet calculation', data.lastDate)

    return this.fetch({
      endpoint: '/jira-timesheet/generate-report',
      body: formData,
      delay: this.getDelay('JIRA_GENERATE_REPORT'),
    })
  }

  static async uploadTimesheet(data: JiraUploadData): Promise<ApiResponse<JiraUploadResponse>> {
    const formData = new FormData()
    data.files.forEach(file => {
      formData.append('Timesheet Pdf', file)
    })
    formData.append('Spreadhseet Link', data.spreadsheetLink)
    formData.append('Last Date for Calculation', data.lastDate)

    return this.fetch({
      endpoint: '/jira-timesheet/bulk-upload',
      body: formData,
      delay: this.getDelay('JIRA_UPLOAD'),
    })
  }
}
