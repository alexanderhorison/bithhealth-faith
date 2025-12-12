"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormCard } from "@/components/forms/form-card";
import { ProcessButton } from "@/components/forms/process-button";
import { WorkflowSteps } from "@/components/forms/workflow-steps";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { JiraService } from "@/lib/services";

export default function JiraTimesheetUploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [spreadsheetLink, setSpreadsheetLink] = useState("");
  const [lastDate, setLastDate] = useState("");

  const workflowSteps = [
    {
      title: "Upload Timesheet File",
      description:
        "Current step - Provide timesheet PDF and configure upload settings",
      status: "active" as const,
    },
    {
      title: "Process & Validate",
      description: "Automated processing - Validate timesheet data",
      status: "automated" as const,
    },
    {
      title: "Upload to Jira",
      description: "Automated processing - Upload validated entries to Jira",
      status: "automated" as const,
    },
  ];

  const { isSubmitting, isResetting, submitForm, resetForm } =
    useFormSubmission({
      onSuccess: () => {
        resetForm(() => {
          setFiles([]);
          setSpreadsheetLink("");
          setLastDate("");

          const fileInput = document.getElementById(
            "timesheet-file"
          ) as HTMLInputElement;
          if (fileInput) fileInput.value = "";
        });
      },
    });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    setFiles(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await submitForm(async () => {
      if (!files.length) {
        throw new Error("Please select at least one PDF file");
      }

      if (!spreadsheetLink) {
        throw new Error("Please provide a folder link");
      }

      if (!lastDate) {
        throw new Error("Please select the last processing date");
      }

      // Send ALL files to JiraService
      return await JiraService.uploadTimesheet({
        files,
        spreadsheetLink,
        lastDate,
      });
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Jira Timesheet Upload
        </h1>
        <p className="text-muted-foreground mt-2">
          Upload timesheet data directly to Jira for automated time entry
          processing.
          <br />
          Configure upload settings and validate entries before submission to
          Jira tickets.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <FormCard
            title="Upload Configuration"
            description="Configure timesheet upload settings for Jira"
            isSubmitting={isSubmitting}
            isResetting={isResetting}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Bulk File Upload */}
              <div className="space-y-2">
                <Label htmlFor="timesheet-file">
                  Timesheet Files <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="timesheet-file"
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground">Jira PDF Files Employee</p>
                {files.length > 0 && (
                  <ul className="text-sm text-muted-foreground mt-1">
                    {files.map((f, idx) => (
                      <li key={idx}>• {f.name}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Link */}
              <div className="space-y-2">
                <Label htmlFor="spreadsheet-link">
                  Spreadsheet Link <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="spreadsheet-link"
                  type="url"
                  value={spreadsheetLink}
                  onChange={(e) => setSpreadsheetLink(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/.."
                />
                <p className="text-sm text-muted-foreground">Existing Spreadsheet link to stores the changes result</p>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="last-date">
                  Last Processing Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="last-date"
                  type="date"
                  value={lastDate}
                  onChange={(e) => setLastDate(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Calculation Date mid (15) or end (30/31) of the month
                </p>
              </div>

              <ProcessButton
                isSubmitting={isSubmitting}
                isResetting={isResetting}
              />
            </form>
          </FormCard>
        </div>

        <div className="lg:w-80 flex-shrink-0">
          <WorkflowSteps
            title="Upload Process"
            description="Automated Jira timesheet upload workflow that validates data, processes entries, and updates Jira tickets with time tracking information"
            steps={workflowSteps}
          />
        </div>
      </div>
    </div>
  );
}
