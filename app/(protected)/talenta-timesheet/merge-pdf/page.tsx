"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormCard } from "@/components/forms/form-card";
import { ProcessButton } from "@/components/forms/process-button";
import { WorkflowSteps } from "@/components/forms/workflow-steps";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { TimesheetService } from "@/lib/services";

export default function MergePDFPage() {
  const [date, setDate] = useState("");
  const [sendTo, setSendTo] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const workflowSteps = [
    {
      title: "Select PDFs & Options",
      description: "Current step - Choose files and merge settings",
      status: "active" as const
    },
    {
      title: "Merge PDF Files",
      description: "Automated processing - Combine selected PDFs",
      status: "automated" as const
    },
    {
      title: "Send Final Document",
      description: "Automated processing - Deliver merged PDF",
      status: "automated" as const
    }
  ];

  const { isSubmitting, isResetting, submitForm, resetForm } = useFormSubmission({
    onSuccess: () => {
      resetForm(() => {
        setDate("");
        setSendTo("");
        setFiles(null);
        const fileInput = document.getElementById('pdf-files') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      });
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await submitForm(async () => {
      if (!date) {
        throw new Error("Please select a date to continue");
      }

      if (!sendTo) {
        throw new Error("Please select where to send the merged PDF");
      }

      if (!files || files.length === 0) {
        throw new Error("Please select PDF files to merge");
      }

      return await TimesheetService.mergePdfs({ files });
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Merge PDF Timesheets
        </h1>
        <p className="text-muted-foreground mt-2">
          Combine multiple timesheet PDF files into a single consolidated document.
          <br />Select files, configure options, and merge for streamlined distribution.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <FormCard
            title="PDF Merge Configuration"
            description="Configure settings for merging individual PDFs"
            isSubmitting={isSubmitting}
            isResetting={isResetting}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pdf-files">
                  Select PDF Files <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="pdf-files"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="cursor-pointer"
                />
                {files && files.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Selected {files.length} file(s)
                  </p>
                )}
              </div>

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
              </div>

              <div className="space-y-2">
                <Label htmlFor="sendTo">
                  Send To <span className="text-red-500">*</span>
                </Label>
                <Select value={sendTo} onValueChange={setSendTo}>
                  <SelectTrigger id="sendTo">
                    <SelectValue placeholder="Select destination..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sharepoint">SharePoint</SelectItem>
                    <SelectItem value="download">Direct Download</SelectItem>
                    <SelectItem value="cloud">Cloud Storage</SelectItem>
                  </SelectContent>
                </Select>
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
            title="Merge Process"
            description="Automated PDF merging workflow that consolidates individual timesheet documents into a single comprehensive report"
            steps={workflowSteps}
          />
        </div>
      </div>
    </div>
  );
}
