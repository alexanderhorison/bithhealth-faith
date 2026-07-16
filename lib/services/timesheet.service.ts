// Timesheet service for handling Talenta timesheet operations
import { BaseService } from './base.service'
import {
  ApiResponse,
  TimesheetData,
  GeneratePdfData,
  MergePdfData,
  TimesheetSummarizeResponse,
  GeneratePdfResponse,
  MergePdfResponse,
} from './types'

export class TimesheetService extends BaseService {
  static async summarizeTimesheet(
    data: TimesheetData
  ): Promise<ApiResponse<TimesheetSummarizeResponse>> {
    const formData = this.createFormData({ file: data.file, file_name: data.file_name })
    return this.fetch({
      endpoint: '/v2/talenta-timesheet/summarize',
      body: formData,
      delay: this.getDelay('TIMESHEET_SUMMARIZE'),
    })
  }

  static async generatePdf(data: GeneratePdfData): Promise<ApiResponse<GeneratePdfResponse>> {
    const formData = this.createFormData({ ...data })
    return this.fetch({
      endpoint: '/talenta-timesheet/generate-pdf',
      body: formData,
      delay: this.getDelay('TIMESHEET_GENERATE_PDF'),
    })
  }

  static async mergePdfs(data: MergePdfData): Promise<ApiResponse<MergePdfResponse>> {
    const formData = this.createFormData({ ...data })
    return this.fetch({
      endpoint: '/talenta-timesheet/merge-pdf',
      body: formData,
      delay: this.getDelay('TIMESHEET_MERGE_PDF'),
    })
  }
}