// Application configuration constants

// Processing delays (simulated processing)
export const DELAYS = {
  TIMESHEET_SUMMARIZE: 2000,
  TIMESHEET_GENERATE_PDF: 2000,
  TIMESHEET_MERGE_PDF: 3000,
  JIRA_GENERATE_REPORT: 2500,
  JIRA_UPLOAD: 2000,
  PHARMACY_SUBMIT: 2000,
  PHARMACY_SUMMARY: 1500,
  FORM_RESET: 1500,
} as const;

// UI Colors
export const COLORS = {
  PRIMARY: '#FF6B6B',
  PRIMARY_HOVER: '#FF5252',
  SUCCESS: '#51CF66',
  ERROR: '#FF6B6B',
  WARNING: '#FFD43B',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  FILE_REQUIRED: 'Please select a file to proceed.',
  FILE_TOO_LARGE: 'File size exceeds 10MB limit.',
  INVALID_FILE_TYPE: 'Invalid file type. Accepted: .xlsx, .xls, .csv',
  LINK_REQUIRED: 'Please enter a valid link.',
  DATE_REQUIRED: 'Please select a date.',
  MONTH_REQUIRED: 'Please select a month.',
  EMAIL_REQUIRED: 'Please enter a valid email address.',
  UPLOAD_FAILED: 'Failed to upload file. Please try again.',
  GENERIC_ERROR: 'An error occurred. Please try again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  TIMESHEET_SUMMARIZED: 'Timesheet summarized successfully.',
  PDF_GENERATED: 'PDF generated successfully.',
  PDF_MERGED: 'PDFs merged successfully.',
  JIRA_REPORT_GENERATED: 'Jira report generated successfully.',
  FILE_UPLOADED: 'File uploaded successfully.',
  PHARMACY_RECONCILED: 'Pharmacy delivery reconciled successfully.',
  SUMMARY_GENERATED: 'Summary report generated successfully.',
} as const;

// File upload constraints
export const FILE_CONFIG = {
  MAX_SIZE_MB: 10,
  MAX_SIZE_BYTES: 10 * 1024 * 1024,
  ACCEPTED_FORMATS: ['.xlsx', '.xls', '.csv', '.pdf'],
  ACCEPTED_MIME_TYPES: [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv',
    'application/pdf',
  ],
} as const;

// Workflow statuses
export const WORKFLOW_STATUS = {
  ACTIVE: 'active',
  AUTOMATED: 'automated',
  PENDING: 'pending',
  COMPLETED: 'completed',
  PROCESSING: 'processing',
} as const;

// Date formats
export const DATE_FORMAT = {
  DISPLAY: 'MMM dd, yyyy',
  ISO: 'yyyy-MM-dd',
  API: 'YYYY-MM-DD',
} as const;

// Month options for pharmacy
export const MONTHS = [
  { value: '11', label: 'November 2025' },
  { value: '12', label: 'December 2025' },
  { value: '1', label: 'January 2026' },
  { value: '2', label: 'February 2026' },
  { value: '3', label: 'March 2026' },
  { value: '4', label: 'April 2026' },
  { value: '5', label: 'May 2026' },
  { value: '6', label: 'June 2026' },
  { value: '7', label: 'July 2026' },
  { value: '8', label: 'August 2026' },
  { value: '9', label: 'September 2026' },
  { value: '10', label: 'October 2026' },
  { value: '11', label: 'November 2026' },
  { value: '12', label: 'December 2026' },
] as const;
