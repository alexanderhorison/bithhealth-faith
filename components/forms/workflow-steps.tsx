import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Cog } from "lucide-react"

interface WorkflowStep {
  title: string
  description: string
  status: 'active' | 'automated' | 'pending'
}

interface WorkflowStepsProps {
  title?: string
  description?: string
  steps: WorkflowStep[]
}

export function WorkflowSteps({ 
  title = "Workflow Steps",
  description = "Automated workflow process",
  steps 
}: WorkflowStepsProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                step.status === 'active' 
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step.status === 'active' ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Cog className="h-5 w-5" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}