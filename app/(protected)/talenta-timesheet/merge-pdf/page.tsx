'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Calendar, CheckCircle2 } from 'lucide-react'

export default function MergePDFPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [date, setDate] = useState('')
  const [sendTo, setSendTo] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!date || !sendTo) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/merge-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, sendTo }),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'PDF merge request submitted successfully',
        })
        setDate('')
        setSendTo('')
      } else {
        throw new Error(result.message || 'Failed to submit request')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit request',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Merge File</h1>
        <p className="text-muted-foreground">
          Consolidate all individual employee PDF timesheets into a single comprehensive document,
          <br />organized and ready for distribution to management, payroll processing, and secure archival storage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Merge File</CardTitle>
              <CardDescription>
                Select date and recipient for merged PDF report
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="date">
                    Date <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      placeholder="dd/mm/yyyy"
                      className="pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sendTo">
                    Send to <span className="text-red-500">*</span>
                  </Label>
                  <Select value={sendTo} onValueChange={setSendTo} required>
                    <SelectTrigger id="sendTo">
                      <SelectValue placeholder="Select an option ..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="hr">HR Department</SelectItem>
                      <SelectItem value="finance">Finance Department</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  {!sendTo && (
                    <p className="text-sm text-red-500">This field is required</p>
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
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Generate PDF</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate individual PDF timesheets for each employee
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5" />
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
