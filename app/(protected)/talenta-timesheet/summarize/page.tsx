'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Loader2, CheckCircle2 } from 'lucide-react'

export default function TimesheetSummaryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!file) {
      toast({
        title: 'Error',
        description: 'Please select a file to upload',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/timesheet-summary', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Timesheet submitted successfully',
        })
        setFile(null)
        // Reset file input
        const fileInput = document.getElementById('timesheet-file') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      } else {
        throw new Error(result.message || 'Failed to submit timesheet')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit timesheet',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Summarize Timesheet</h1>
        <p className="text-muted-foreground">
          Timesheet Summarize is an intelligent orchestration engine designed to fully automate
          <br />the process of employee work hour validation, calculation, and reporting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upload Timesheet</CardTitle>
              <CardDescription>
                Select your timesheet file to begin processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="timesheet-file">
                    Upload Timesheet <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="timesheet-file"
                    type="file"
                    onChange={handleFileChange}
                    required
                    accept=".xlsx,.xls,.csv"
                    className="cursor-pointer"
                  />
                  {file && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {file.name}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FF6B6B] hover:bg-[#FF5252]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">Workflow Steps</CardTitle>
              <CardDescription>End-to-end automated timesheet processing workflow from data upload through validation, individual PDF generation, and final consolidated document creation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Process Timesheet</h3>
                  <p className="text-sm text-muted-foreground">
                    Your timesheet will be validated and processed automatically
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Generate PDF</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate individual PDF timesheets for each employee
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Merge PDFs</h3>
                  <p className="text-sm text-muted-foreground">
                    Combine all timesheets into a single consolidated PDF document
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
