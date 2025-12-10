"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Cog } from "lucide-react";

export default function JiraTimesheetUploadPage() {
  const [folderLink, setFolderLink] = useState("");
  const [excelName, setExcelName] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!folderLink || !excelName || !lastDate) {
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
        description: "Jira timesheet upload started",
      });

      // Reset form
      setFolderLink("");
      setExcelName("");
      setLastDate("");
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
          Timesheet
        </h1>
        <p className="text-muted-foreground mt-2">
          Form Timesheet Generator excel
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Timesheet</CardTitle>
            <CardDescription>
              Form Timesheet Generator excel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="folder-link">
                  Folder Link <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="folder-link"
                  type="url"
                  value={folderLink}
                  onChange={(e) => setFolderLink(e.target.value)}
                  placeholder="https://drive.google.com/drive/folders/11tGkpIvkVA7j4NBM8..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excel-name">
                  Generated Excel Timesheet Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="excel-name"
                  type="text"
                  value={excelName}
                  onChange={(e) => setExcelName(e.target.value)}
                  placeholder="15 Aug - 15 Sept 2025"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last-date-calc">
                  Last Date for timesheet calculation <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="last-date-calc"
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
              Automated Jira timesheet upload workflow from Drive to Jira system
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
                  <h3 className="font-semibold text-sm">Retrieve Excel from Drive</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Current step - Get timesheet from folder
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3 py-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Cog className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-gray-700">Process Timesheet Data</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Parse and validate timesheet entries
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3 py-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Cog className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-gray-700">Upload to Jira</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Submit timesheet entries to Jira
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
