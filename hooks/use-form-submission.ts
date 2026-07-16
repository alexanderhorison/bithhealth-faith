'use client'

import { useState, useCallback, useRef } from 'react'
import { useToast } from '@/hooks/use-toast'
import { DELAYS } from '@/lib/config/constants'

export interface UseFormSubmissionOptions<T = unknown> {
  onSuccess?: (data?: T) => void | Promise<void>
  onError?: (error: Error) => void | Promise<void>
  resetDelay?: number
  formId?: string
}

export interface UseFormSubmissionReturn {
  isSubmitting: boolean
  isResetting: boolean
  submitForm: (submitFn: () => Promise<unknown>) => Promise<void>
  resetForm: (resetFn?: () => void | Promise<void>) => Promise<void>
  formRef?: React.RefObject<HTMLFormElement | null>
}

/**
 * Hook for managing form submission and reset state
 *
 * @param options - Configuration options
 * @param options.onSuccess - Callback when submission succeeds
 * @param options.onError - Callback when submission fails
 * @param options.resetDelay - Delay before resetting (default: 1500ms)
 * @param options.formId - Optional form element ID for automatic reset
 * @returns Form submission state and handlers
 */
export function useFormSubmission<T = unknown>(
  options: UseFormSubmissionOptions<T> = {}
): UseFormSubmissionReturn {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  const {
    onSuccess,
    onError,
    resetDelay = DELAYS.FORM_RESET,
    formId,
  } = options

  /**
   * Submit form and handle success/error states
   */
  const submitForm = useCallback(
    async (submitFn: () => Promise<unknown>) => {
      setIsSubmitting(true)

      try {
        const result = await submitFn()

        toast({
          title: 'Processing Started',
          description: 'Your request has been submitted successfully',
        })

        // Show reset animation only on success
        setIsResetting(true)

        if (onSuccess) {
          await onSuccess(result as T)
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Unable to process your request. Please try again'

        toast({
          title: 'Processing Failed',
          description: errorMessage,
          variant: 'destructive',
        })

        if (onError) {
          await onError(
            error instanceof Error ? error : new Error(errorMessage)
          )
        }
      } finally {
        setIsSubmitting(false)
      }
    },
    [onSuccess, onError, toast]
  )

  /**
   * Reset form and optionally call custom reset logic
   */
  const resetForm = useCallback(
    async (resetFn?: () => void | Promise<void>) => {
      // Call custom reset function if provided
      if (resetFn) {
        await resetFn()
      }

      // Auto-reset form element if ref or ID is available
      const form = formRef.current || (formId ? document.getElementById(formId) : null)
      if (form instanceof HTMLFormElement) {
        form.reset()
      }

      // Wait for animation, then end reset state
      await new Promise(resolve => setTimeout(resolve, resetDelay))
      setIsResetting(false)
    },
    [formId, resetDelay]
  )

  return {
    isSubmitting,
    isResetting,
    submitForm,
    resetForm,
    formRef,
  }
}