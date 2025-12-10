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
  const [file, setFile] = useState<File | null>(null);
  const [folderLink, setFolderLink] = useState("");
  const [excelName, setExcelName] = useState("");
  const [lastDate, setLastDate] = useState("");

  const workflowSteps = [
    {
      title: "Upload Timesheet File",
      description: "Current step - Select file and configure upload settings",
      status: "active" as const
    },
    {
      title: "Process & Validate",
      description: "Automated processing - Validate timesheet data",
      status: "automated" as const
    },
    {
      title: "Upload to Jira",
      description: "Automated processing - Upload validated entries to Jira",
      status: "automated" as const
    }
  ];

  const { isSubmitting, isResetting, submitForm, resetForm } = useFormSubmission({
    onSuccess: () => {
      resetForm(() => {
        setFile(null);
        setFolderLink("");
        setExcelName("");
        setLastDate("");
        const fileInput = document.getElementById('timesheet-file') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      });
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await submitForm(async () => {
      if (!file) {
        throw new Error("Please select a timesheet file to upload");
      }

      if (!folderLink) {
        throw new Error("Please provide a folder link");
      }

      if (!excelName) {
        throw new Error("Please enter the Excel file name");
      }

      if (!lastDate) {
        throw new Error("Please select the last processing date");
      }

      return await JiraService.uploadTimesheet({ file });
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Jira Timesheet Upload
        </h1>
        <p className="text-muted-foreground mt-2">
          Upload timesheet data directly to Jira for automated time entry processing.
          <br />Configure upload settings and validate entries before submission to Jira tickets.
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
            <div className="space-y-2">
              <Label htmlFor="timesheet-file">
                Timesheet File <span className="text-red-500">*</span>
              </Label>
              <Input
                id="timesheet-file"
                type="file"
                onChange={handleFileChange}
                accept=".xlsx,.xls,.csv"
                className="cursor-pointer"
              />
              {file && (
                <p className="text-sm text-muted-foreground">
                  Selected: {file.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="folder-link">
                Folder Link <span className="text-red-500">*</span>
              </Label>
              <Input
                id="folder-link"
                type="url"
                value={folderLink}
                onChange={(e) => setFolderLink(e.target.value)}
                placeholder="https://drive.google.com/folder/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excel-name">
                Excel File Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="excel-name"
                type="text"
                value={excelName}
                onChange={(e) => setExcelName(e.target.value)}
                placeholder="timesheet_data.xlsx"
              />
            </div>

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
