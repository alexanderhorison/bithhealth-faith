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
  const [timesheetPdf, setTimesheetPdf] = useState<File | null>(null);
  const [spreadsheetLink, setSpreadsheetLink] = useState("");
  const [lastDate, setLastDate] = useState("");

  const workflowSteps = [
    {
      title: "Upload Timesheet & Data",
      description: "Current step - Provide timesheet PDF and spreadsheet link",
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
        setTimesheetPdf(null);
        setSpreadsheetLink("");
        setLastDate("");
        const fileInput = document.getElementById('timesheet-pdf') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      });
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTimesheetPdf(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await submitForm(async () => {
      if (!timesheetPdf) {
        throw new Error("Please select a timesheet PDF file to continue");
      }

      if (!spreadsheetLink) {
        throw new Error("Please provide a spreadsheet link");
      }

      if (!lastDate) {
        throw new Error("Please select the last processing date");
      }

      return await JiraService.generateTimesheetReport({
        timesheetPdf,
        spreadsheetLink,
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
          Generate comprehensive Jira timesheet reports by combining PDF timesheets with spreadsheet data.
          <br />Process and validate time entries logged in Jira against project requirements.
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
              <Label htmlFor="timesheet-pdf">
                Timesheet PDF <span className="text-red-500">*</span>
              </Label>
              <Input
                id="timesheet-pdf"
                type="file"
                onChange={handleFileChange}
                accept=".pdf"
                className="cursor-pointer"
              />
              {timesheetPdf && (
                <p className="text-sm text-muted-foreground">
                  Selected: {timesheetPdf.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="spreadsheet-link">
                Spreadsheet Link <span className="text-red-500">*</span>
              </Label>
              <Input
                id="spreadsheet-link"
                type="url"
                value={spreadsheetLink}
                onChange={(e) => setSpreadsheetLink(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/..."
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
            title="Report Generation"
            description="Automated Jira timesheet report generation workflow that processes PDF data, validates spreadsheet entries, and creates comprehensive reports"
            steps={workflowSteps}
          />
        </div>
      </div>
    </div>
  );
}
