"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormCard } from "@/components/forms/form-card";
import { ProcessButton } from "@/components/forms/process-button";
import { WorkflowSteps } from "@/components/forms/workflow-steps";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { PharmacyDeliveryService } from "@/lib/services";

export default function PharmacyDeliveryPage() {
  const [file, setFile] = useState<File | null>(null);
  const [month, setMonth] = useState("");
  const [summaryMonth, setSummaryMonth] = useState("");

  const months = [
    "Nov-2025", "Dec-2025", "Jan-2026", "Feb-2026", "Mar-2026", 
    "Apr-2026", "May-2026", "June-2026", "July-2026", 
    "August-2026", "September-2026", "October-2026", "November-2026", "December-2026",
  ];

  const workflowSteps = [
    {
      title: "Upload Report Transaction",
      description: "Current step - Upload delivery data",
      status: "active" as const
    },
    {
      title: "Process Unbilled Transaction", 
      description: "Automated processing - Generate unbilled reports",
      status: "automated" as const
    },
    {
      title: "Process TIKI Delivery Order",
      description: "Automated processing - Handle delivery orders", 
      status: "automated" as const
    }
  ];

  const { isSubmitting, isResetting, submitForm, resetForm } = useFormSubmission({
    onSuccess: () => {
      resetForm(() => {
        setFile(null);
        setMonth("");
        const fileInput = document.getElementById('delivery-data') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      });
    }
  });

  const { 
    isSubmitting: isSummarySubmitting, 
    isResetting: isSummaryResetting, 
    submitForm: submitSummaryForm, 
    resetForm: resetSummaryForm 
  } = useFormSubmission({
    onSuccess: () => {
      resetSummaryForm(() => {
        setSummaryMonth("");
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
        throw new Error("Please select a delivery data file to continue");
      }

      if (!month) {
        throw new Error("Please select a month for processing");
      }

      return await PharmacyDeliveryService.submitDeliveryData({
        data: file,
        Month: month
      });
    });
  };

  const handleSummarySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await submitSummaryForm(async () => {
      if (!summaryMonth) {
        throw new Error("Please select a month for summary report generation");
      }

      return await PharmacyDeliveryService.generateSummaryReport(summaryMonth);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Report Transaction Pharmacy Delivery
        </h1>
        <p className="text-muted-foreground mt-2">
          Upload pharmacy delivery data and process reconciliation for automated transaction handling,
          <br />unbilled report generation, and TIKI delivery order management.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-stretch">
          <FormCard
            title="Upload Delivery Report"
            description="Select the delivery data file and month for processing"
            isSubmitting={isSubmitting}
            isResetting={isResetting}
          >
            <form onSubmit={handleSubmit} className="flex flex-col h-full space-y-6">
              <div className="space-y-2">
                <Label htmlFor="delivery-data">
                  Pharmacy Delivery Report <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="delivery-data"
                  type="file"
                  onChange={handleFileChange}
                  accept=".csv,.xlsx,.xls"
                  className="cursor-pointer"
                />
                {file && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {file.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="month">
                  Month <span className="text-red-500">*</span>
                </Label>
                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger id="month">
                    <SelectValue placeholder="Select an option ..." />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-auto">
                <ProcessButton 
                  isSubmitting={isSubmitting} 
                  isResetting={isResetting}
                />
              </div>
            </form>
          </FormCard>

          <FormCard
            title="Generate Summary Report"
            description="Generate a comprehensive summary report for the selected month"
            isSubmitting={isSummarySubmitting}
            isResetting={isSummaryResetting}
          >
            <form onSubmit={handleSummarySubmit} className="flex flex-col h-full space-y-6">
              <div className="space-y-2">
                <Label htmlFor="summary-month">
                  Month <span className="text-red-500">*</span>
                </Label>
                <Select value={summaryMonth} onValueChange={setSummaryMonth}>
                  <SelectTrigger id="summary-month">
                    <SelectValue placeholder="Select an option ..." />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-auto">
                <ProcessButton 
                  isSubmitting={isSummarySubmitting} 
                  isResetting={isSummaryResetting}
                  text="Generate Summary Report"
                />
              </div>
            </form>
          </FormCard>
        </div>
        
        <WorkflowSteps
          title="Processing Workflow"
          description="Automated pharmacy delivery processing workflow that handles data validation, reconciliation, and report generation"
          steps={workflowSteps}
        />
      </div>
    </div>
  );
}
