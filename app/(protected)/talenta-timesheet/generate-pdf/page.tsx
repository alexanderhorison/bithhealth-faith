"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormCard } from "@/components/forms/form-card";
import { ProcessButton } from "@/components/forms/process-button";
import { WorkflowSteps } from "@/components/forms/workflow-steps";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { TimesheetService } from "@/lib/services";

export default function GeneratePDFPage() {
  const [date, setDate] = useState("");

  const workflowSteps = [
    {
      title: "Select Date",
      description: "Current step - Choose date for PDF generation",
      status: "active" as const
    },
    {
      title: "Generate Individual PDFs",
      description: "Automated processing - Create individual timesheet PDFs",
      status: "automated" as const
    },
    {
      title: "Quality Validation",
      description: "Automated processing - Validate PDF generation",
      status: "automated" as const
    }
  ];

  const { isSubmitting, isResetting, submitForm, resetForm } = useFormSubmission({
    onSuccess: () => {
      resetForm(() => {
        setDate("");
      });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await submitForm(async () => {
      if (!date) {
        throw new Error("Please select a date to continue");
      }

      return await TimesheetService.generatePdf({ date });
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Generate PDF Timesheets
        </h1>
        <p className="text-muted-foreground mt-2">
          Generate individual PDF timesheets for employee mobility tracking.
          <br />Select a date to process and create professional timesheet documents.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <FormCard
            title="Date Selection"
            description="Choose the date for PDF generation"
            isSubmitting={isSubmitting}
            isResetting={isResetting}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="date">
                  Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">
                  Select date in dd/mm/yyyy format for PDF generation
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
            title="PDF Generation Process"
            description="Automated PDF generation workflow for mobility timesheets with individual document creation and validation"
            steps={workflowSteps}
          />
        </div>
      </div>
    </div>
  );
}
