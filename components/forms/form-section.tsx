'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface FormFieldConfig {
  id: string
  label: string
  type: 'text' | 'file' | 'date' | 'email' | 'select'
  placeholder?: string
  required?: boolean
  accept?: string
  options?: Array<{ value: string; label: string }>
  value?: string | File | null
  onChange?: (value: string | File | null) => void
  error?: string
  helperText?: string
}

interface FormSectionProps {
  fields: FormFieldConfig[]
  isSubmitting?: boolean
}

/**
 * Reusable form section component that renders various input types
 * Reduces code duplication across workflow pages
 */
export function FormSection({ fields, isSubmitting }: FormSectionProps) {
  const renderField = (field: FormFieldConfig) => {
    switch (field.type) {
      case 'file':
        return (
          <Input
            key={field.id}
            id={field.id}
            type="file"
            onChange={e =>
              field.onChange?.(e.target.files?.[0] || null)
            }
            accept={field.accept}
            disabled={isSubmitting}
            className="cursor-pointer"
          />
        )

      case 'date':
        return (
          <Input
            key={field.id}
            id={field.id}
            type="date"
            value={typeof field.value === 'string' ? field.value : ''}
            onChange={e => field.onChange?.(e.target.value)}
            disabled={isSubmitting}
            className="w-full"
          />
        )

      case 'email':
        return (
          <Input
            key={field.id}
            id={field.id}
            type="email"
            placeholder={field.placeholder}
            value={typeof field.value === 'string' ? field.value : ''}
            onChange={e => field.onChange?.(e.target.value)}
            disabled={isSubmitting}
            className="w-full"
          />
        )

      case 'select':
        return (
          <Select
            value={typeof field.value === 'string' ? field.value : ''}
            onValueChange={value => field.onChange?.(value)}
            disabled={isSubmitting}
          >
            <SelectTrigger id={field.id} className="w-full">
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case 'text':
      default:
        return (
          <Input
            key={field.id}
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            value={typeof field.value === 'string' ? field.value : ''}
            onChange={e => field.onChange?.(e.target.value)}
            disabled={isSubmitting}
            className="w-full"
          />
        )
    }
  }

  return (
    <div className="space-y-4">
      {fields.map(field => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </Label>
          {renderField(field)}
          {field.type === 'file' && field.value instanceof File && (
            <p className="text-sm text-muted-foreground">
              Selected: {field.value.name}
            </p>
          )}
          {field.error && (
            <p className="text-sm text-red-500">{field.error}</p>
          )}
          {field.helperText && !field.error && (
            <p className="text-sm text-muted-foreground">{field.helperText}</p>
          )}
        </div>
      ))}
    </div>
  )
}
