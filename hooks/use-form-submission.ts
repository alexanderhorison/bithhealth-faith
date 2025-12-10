'use client'

import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

interface UseFormSubmissionOptions {
  onSuccess?: (data?: any) => void
  onError?: (error: Error) => void
  resetDelay?: number
}

interface UseFormSubmissionReturn {
  isSubmitting: boolean
  isResetting: boolean
  submitForm: (submitFn: () => Promise<any>) => Promise<void>
  resetForm: (resetFn: () => void) => void
}

export function useFormSubmission(options: UseFormSubmissionOptions = {}): UseFormSubmissionReturn {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const { toast } = useToast()
  
  const { onSuccess, onError, resetDelay = 1500 } = options

  const submitForm = async (submitFn: () => Promise<any>) => {
    setIsSubmitting(true)

    try {
      const result = await submitFn()
      
      toast({
        title: "Processing Started",
        description: "Your request has been submitted successfully",
      })

      if (onSuccess) {
        onSuccess(result)
      }

      // Show reset animation only on success
      setIsResetting(true)

      // Reset form after animation
      setTimeout(() => {
        if (onSuccess) {
          // Let the parent handle the actual reset
          setIsResetting(false)
        }
      }, resetDelay)

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unable to process your request. Please try again"
      
      toast({
        title: "Processing Failed",
        description: errorMessage,
        variant: "destructive",
      })

      if (onError) {
        onError(error instanceof Error ? error : new Error(errorMessage))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = (resetFn: () => void) => {
    resetFn()
    setIsResetting(false)
  }

  return {
    isSubmitting,
    isResetting,
    submitForm,
    resetForm
  }
}