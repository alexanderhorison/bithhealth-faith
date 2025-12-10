"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, Cog, CheckCircle2 } from "lucide-react";

export default function PharmacyDeliveryPage() {
  const [file, setFile] = useState<File | null>(null);
  const [month, setMonth] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file",
        variant: "destructive",
      });
      return;
    }

    if (!month) {
      toast({
        title: "Error",
        description: "Please select a month",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement the actual processing logic
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
      
      toast({
        title: "Success",
        description: "Pharmacy delivery report is being processed",
      });

      // Reset form
      setFile(null);
      setMonth("");
      const fileInput = document.getElementById("file-input") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process the report",
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
          Report Transaction Pharmacy Delivery
        </h1>
        <p className="text-muted-foreground mt-2">
          Upload pharmacy delivery data and process reconciliation for automated transaction handling,
          <br />unbilled report generation, and TIKI delivery order management.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upload Delivery Report</CardTitle>
            <CardDescription>
              Select the delivery data file and month for processing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="file-input">
                  data <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="file-input"
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

              <Button
                type="submit"
                className="w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white mb-0"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Process"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Workflow Steps Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Workflow Steps</CardTitle>
            <CardDescription>
              Automated pharmacy delivery reconciliation workflow for processing transactions, generating unbilled reports, and managing TIKI delivery orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">Upload Report Transaction</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Current step - Upload delivery data
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Cog className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-gray-700">Process Unbilled Transaction</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Automated processing (parallel)
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Cog className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-gray-700">Process TIKI Delivery Order</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Automated processing (parallel)
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
