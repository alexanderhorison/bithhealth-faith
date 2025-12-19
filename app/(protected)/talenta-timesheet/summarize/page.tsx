"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormCard } from "@/components/forms/form-card";
import { ProcessButton } from "@/components/forms/process-button";
import { WorkflowSteps } from "@/components/forms/workflow-steps";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { TimesheetService } from "@/lib/services";

export default function TimesheetSummarizePage() {
  const [fileName, setFileName] = useState(""); // file_name will be the selected date
  const [file, setFile] = useState<File | null>(null);

  const workflowSteps = [
    {
      title: "Process Timesheet",
      description: "Current step - Upload and validate timesheet data",
      status: "active" as const
    },
    {
      title: "Generate PDF",
      description: "Automated processing - Generate individual PDFs",
      status: "automated" as const
    },
    {
      title: "Merge PDFs",
      description: "Automated processing - Combine into consolidated document",
      status: "automated" as const
    }
  ];

  const { isSubmitting, isResetting, submitForm, resetForm } = useFormSubmission({
    onSuccess: () => {
      resetForm(() => {
        setFileName("");
        setFile(null);
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
      if (!fileName.trim()) {
        throw new Error("Please select a date");
      }
      
      if (!file) {
        throw new Error("Please select a timesheet file to continue");
      }

      return await TimesheetService.summarizeTimesheet({ file, file_name: fileName });
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Summarize Timesheet
        </h1>
        <p className="text-muted-foreground mt-2">
          Timesheet Summarize is an intelligent orchestration engine designed to fully automate
          <br />the process of employee work hour validation, calculation, and reporting.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <FormCard
            title="Upload Timesheet"
            description="Select your timesheet file to begin processing"
            isSubmitting={isSubmitting}
            isResetting={isResetting}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="file-name">
                  Enter Date<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="file-name"
                  type="date"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timesheet-file">
                  Upload Timesheet<span className="text-red-500">*</span>
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

              <ProcessButton 
                isSubmitting={isSubmitting} 
                isResetting={isResetting}
              />
            </form>
          </FormCard>
        </div>
        
        <div className="lg:w-80 flex-shrink-0">
          <WorkflowSteps
            title="Processing Workflow"
            description="Automated timesheet processing workflow that validates data, generates summaries, and creates comprehensive reports"
            steps={workflowSteps}
          />
        </div>
      </div>
    </div>
  );
}
