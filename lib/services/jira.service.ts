// Jira service for handling Jira timesheet operations
import { ApiResponse } from "./types";

export interface JiraGeneratorData {
  driveLink: string;
  spreadSheetName: string;
  lastDate: string;
}

export interface JiraUploadData {
  files: File[];
  spreadsheetLink: string;
  lastDate: string;
}

export class JiraService {
  private static readonly API_BASE_URL =
    "https://n8n-farhad.avocode.cloud/webhook";

  static async generateTimesheetReport(
    data: JiraGeneratorData
  ): Promise<ApiResponse> {
    try {
      // Simulate processing time for better UX demonstration
      await new Promise((resolve) => setTimeout(resolve, 2500));

      const formData = new FormData();
      formData.append("Folder Link", data.driveLink);
      formData.append("Generated Excel Timesheet Name", data.spreadSheetName);
      formData.append("Last Date for timesheet calculation", data.lastDate);

      const response = await fetch(
        `${this.API_BASE_URL}/5ee6ce9b-011d-435b-a7cb-d2a37793d417`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to generate Jira report");
      }

      return {
        success: true,
        message: result.message || "Jira report generated successfully",
        data: result,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to generate Jira timesheet report"
      );
    }
  }

  static async uploadTimesheet(data: JiraUploadData): Promise<ApiResponse> {
    try {
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const formData = new FormData();
      data.files.forEach((file) => {
        formData.append("Timesheet Pdf", file);
      });
      formData.append("Spreadhseet Link", data.spreadsheetLink);
      formData.append("Last Date for Calculation", data.lastDate);

      const response = await fetch(
        `${this.API_BASE_URL}/53a21877-81a0-481c-9d0e-b313e0dafcef`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to upload to Jira");
      }

      return {
        success: true,
        message: result.message || "Timesheet uploaded to Jira successfully",
        data: result,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to upload timesheet to Jira"
      );
    }
  }
}
