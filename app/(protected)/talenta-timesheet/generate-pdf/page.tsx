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
  const [currentStep, setCurrentStep] = useState(0);

  const getWorkflowSteps = () => [
    {
      title: "Process Timesheet",
      description: currentStep === 0 ? "Current step - Upload and validate timesheet data" : "Upload and validate timesheet data",
      status: currentStep > 0 ? "completed" as const : "active" as const
    },
    {
      title: "Generate PDF",
      description: "Automated processing - Generate individual PDFs",
      status: currentStep > 1 ? "completed" as const : currentStep === 1 ? "processing" as const : "pending" as const
    },
    {
      title: "Merge PDFs",
      description: "Automated processing - Combine into consolidated document",
      status: currentStep > 2 ? "completed" as const : currentStep === 2 ? "processing" as const : "pending" as const
    }
  ];

  const { isSubmitting, isResetting, submitForm, resetForm } = useFormSubmission({
    onSuccess: () => {
      // Progress through workflow steps
      setCurrentStep(1);
      setTimeout(() => setCurrentStep(2), 1500);
      setTimeout(() => {
        setCurrentStep(3);
        // Reset form after completion
        setTimeout(() => {
          resetForm(() => {
            setDate("");
            setCurrentStep(0);
          });
        }, 1500);
      }, 3000);
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
            title="Processing Workflow"
            description="Automated timesheet processing workflow that validates data, generates summaries, and creates comprehensive reports"
            steps={getWorkflowSteps()}
          />
        </div>
      </div>
    </div>
  );
}
