import { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cog, RotateCcw } from 'lucide-react'

interface FormCardProps {
  title: string
  description: string
  children: ReactNode
  isSubmitting?: boolean
  isResetting?: boolean
}

export function FormCard({ 
  title, 
  description, 
  children, 
  isSubmitting = false, 
  isResetting = false 
}: FormCardProps) {
  return (
    <Card className="relative w-full">
      {/* Loading Overlay */}
      {(isSubmitting || isResetting) && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-3">
            {isSubmitting ? (
              <>
                <Cog className="h-8 w-8 animate-spin text-[#FF6B6B]" />
                <p className="text-sm font-medium text-gray-600">Processing your request...</p>
              </>
            ) : (
              <>
                <RotateCcw className="h-8 w-8 animate-spin text-[#FF6B6B]" />
                <p className="text-sm font-medium text-gray-600">Resetting form...</p>
              </>
            )}
          </div>
        </div>
      )}
      
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pb-0">
        {children}
      </CardContent>
    </Card>
  )
}