"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormCard } from "@/components/forms/form-card";
import { ProcessButton } from "@/components/forms/process-button";
import { WorkflowSteps } from "@/components/forms/workflow-steps";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { JiraService } from "@/lib/services";

export default function JiraTimesheetGeneratorPage() {
  const [driveLink, setDriveLink] = useState("");
  const [spreadSheetName, setSpreadSheetName] = useState("");
  const [lastDate, setLastDate] = useState("");

  const workflowSteps = [
    {
      title: "Upload Timesheet & Data",
      description: "Current step - Provide Drive Link Contain Jira PDF",
      status: "active" as const
    },
    {
      title: "Process Jira Data",
      description: "Automated processing - Extract and validate Jira entries",
      status: "automated" as const
    },
    {
      title: "Generate Report",
      description: "Automated processing - Create comprehensive timesheet report",
      status: "automated" as const
    }
  ];

  const { isSubmitting, isResetting, submitForm, resetForm } = useFormSubmission({
    onSuccess: () => {
      resetForm(() => {
        setDriveLink("");
        setSpreadSheetName("");
        setLastDate("");
        const fileInput = document.getElementById('timesheet-pdf') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await submitForm(async () => {
      if (!driveLink) {
        throw new Error("Please select a timesheet PDF file to continue");
      }

      if (!spreadSheetName) {
        throw new Error("Please provide a spreadsheet name");
      }

      if (!lastDate) {
        throw new Error("Please select the last processing date");
      }

      return await JiraService.generateTimesheetReport({
        driveLink,
        spreadSheetName,
        lastDate
      });
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Jira Timesheet Report Generator
        </h1>
        <p className="text-muted-foreground mt-2">
          Generate comprehensive Jira timesheet reports by Google Drive URL with provided PDF Jira Timesheet Employee.
          <br />
          *PDF must have Start Date and End Date to calculate the timesheet period.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <FormCard
            title="Timesheet Data Input"
            description="Upload PDF and provide spreadsheet link for processing"
            isSubmitting={isSubmitting}
            isResetting={isResetting}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="drive-link">
                Drive Link <span className="text-red-500">*</span>
              </Label>
              <Input
                id="drive-link"
                type="url"
                value={driveLink}
                onChange={(e) => setDriveLink(e.target.value)}
                placeholder="https://drive.google.com/drive/folders/..."
              />
              <p className="text-sm text-muted-foreground">Google Drive link stores All PDF jira employee</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="spreadsheet-link">
                Spreadsheet Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="spreadsheet-name"
                type="text"
                value={spreadSheetName}
                onChange={(e) => setSpreadSheetName(e.target.value)}
                placeholder="1 - 30 Nov 2025"
              />
              <p className="text-sm text-muted-foreground">Spreadsheet name to store the final processed Jira timesheet report</p>
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
              <p className="text-sm text-muted-foreground">Calculation Date mid (15) or end (30/31) of the month</p>
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
            title="Report Generation"
            description="Automated Jira timesheet report generation workflow that processes PDF data, validates employees task, and creates comprehensive reports"
            steps={workflowSteps}
          />
        </div>
      </div>
    </div>
  );
}
