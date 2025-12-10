"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Cog } from "lucide-react";

export default function JiraTimesheetGeneratorPage() {
  const [timesheetPdf, setTimesheetPdf] = useState<File | null>(null);
  const [spreadsheetLink, setSpreadsheetLink] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTimesheetPdf(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!timesheetPdf || !spreadsheetLink || !lastDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement the actual processing logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Success",
        description: "Jira timesheet report generation started",
      });

      // Reset form
      setTimesheetPdf(null);
      setSpreadsheetLink("");
      setLastDate("");
      const fileInput = document.getElementById("timesheet-pdf") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process the request",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Form Upload Timesheet Generator
        </h1>
        <p className="text-muted-foreground mt-2">
          For timesheet that consider invalid
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Form Upload Timesheet Generator</CardTitle>
            <CardDescription>
              For timesheet that consider invalid
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="timesheet-pdf">
                  Timesheet Pdf <span className="text-red-500">*</span>
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
                  Spreadhsheet Link <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="spreadsheet-link"
                  type="url"
                  value={spreadsheetLink}
                  onChange={(e) => setSpreadsheetLink(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/1h7aOQ9fqF0ncE3..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last-date">
                  Last Date for Calculation <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="last-date"
                  type="date"
                  value={lastDate}
                  onChange={(e) => setLastDate(e.target.value)}
                  placeholder="dd/mm/yyyy"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white mb-0"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Workflow Steps Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Workflow Steps</CardTitle>
            <CardDescription>
              Automated Jira timesheet validation and report generation workflow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {/* Step 1 */}
              <div className="flex items-start gap-3 py-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">Upload Invalid Timesheet</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Current step - Upload PDF and spreadsheet link
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3 py-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Cog className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-gray-700">Generate Excel Report</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Create formatted timesheet report
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3 py-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Cog className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-gray-700">Save to Drive</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Store generated report in Google Drive
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
