'use client'

import { useState, useCallback } from 'react'
import { FILE_CONFIG } from '@/lib/config/constants'

export interface FileUploadOptions {
  maxSizeMB?: number
  acceptedFormats?: string[]
  multiple?: boolean
}

export interface FileUploadState {
  file: File | null
  files: File[]
  error: string | null
}

export function useFileUpload(options: FileUploadOptions = {}) {
  const {
    maxSizeMB = FILE_CONFIG.MAX_SIZE_MB,
    acceptedFormats = FILE_CONFIG.ACCEPTED_FORMATS as readonly string[],
    multiple = false,
  } = options

  const [state, setState] = useState<FileUploadState>({
    file: null,
    files: [],
    error: null,
  })

  /**
   * Validate file against size and format constraints
   */
  const validateFile = useCallback(
    (file: File): string | null => {
      // Check file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        return `File size exceeds ${maxSizeMB}MB limit.`
      }

      // Check file format
      const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`
      if (!acceptedFormats.includes(fileExtension)) {
        return `Invalid file type. Accepted: ${acceptedFormats.join(', ')}`
      }

      return null
    },
    [maxSizeMB, acceptedFormats]
  )

  /**
   * Handle file input change
   */
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || [])

      if (selectedFiles.length === 0) {
        setState(prev => ({ ...prev, error: null }))
        return
      }

      // Validate first file or all files
      const filesToValidate = multiple ? selectedFiles : [selectedFiles[0]]
      const errorMessage = filesToValidate
        .map(file => validateFile(file))
        .find(error => error !== null)

      if (errorMessage) {
        setState(prev => ({
          ...prev,
          file: null,
          files: [],
          error: errorMessage,
        }))
        return
      }

      setState(prev => ({
        ...prev,
        file: multiple ? null : selectedFiles[0],
        files: multiple ? selectedFiles : [],
        error: null,
      }))
    },
    [validateFile, multiple]
  )

  /**
   * Clear file(s) and input element
   */
  const clearFile = useCallback((inputId?: string) => {
    setState({
      file: null,
      files: [],
      error: null,
    })

    // Clear DOM input element if ID provided
    if (inputId) {
      const fileInput = document.getElementById(inputId) as HTMLInputElement
      if (fileInput) {
        fileInput.value = ''
      }
    }
  }, [])

  /**
   * Set file programmatically
   */
  const setFile = useCallback((file: File | null) => {
    if (file) {
      const errorMessage = validateFile(file)
      if (errorMessage) {
        setState(prev => ({
          ...prev,
          file: null,
          error: errorMessage,
        }))
        return
      }
    }

    setState(prev => ({
      ...prev,
      file,
      error: null,
    }))
  }, [validateFile])

  /**
   * Set multiple files programmatically
   */
  const setFiles = useCallback(
    (files: File[]) => {
      const errorMessage = files
        .map(file => validateFile(file))
        .find(error => error !== null)

      if (errorMessage) {
        setState(prev => ({
          ...prev,
          files: [],
          error: errorMessage,
        }))
        return
      }

      setState(prev => ({
        ...prev,
        files,
        error: null,
      }))
    },
    [validateFile]
  )

  return {
    file: state.file,
    files: state.files,
    error: state.error,
    handleFileChange,
    setFile,
    setFiles,
    clearFile,
  }
}
