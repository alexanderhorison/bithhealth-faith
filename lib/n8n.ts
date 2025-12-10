export interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  category: string;
}

export interface FileUploadData {
  title: string;
  description: string;
  category: string;
  files: File[];
}

export type N8nEndpoint = 'forms' | 'upload' | 'advanced' | 'users' | 'settings' | 'timesheet-summary' | 'generate-pdf' | 'merge-pdf';

const getWebhookUrl = (endpoint: N8nEndpoint): string => {
  const baseUrl = process.env.N8N_WEBHOOK_BASE_URL;
  
  if (!baseUrl) {
    throw new Error('N8N_WEBHOOK_BASE_URL is not configured');
  }

  const endpoints = {
    forms: process.env.N8N_FORMS_ENDPOINT || '/forms-submission',
    upload: process.env.N8N_UPLOAD_ENDPOINT || '/file-upload',
    advanced: process.env.N8N_ADVANCED_ENDPOINT || '/advanced-data',
    users: process.env.N8N_USERS_ENDPOINT || '/users-management',
    settings: process.env.N8N_SETTINGS_ENDPOINT || '/settings-update',
    'timesheet-summary': process.env.N8N_TIMESHEET_SUMMARY_ENDPOINT || '/timesheet-summary',
    'generate-pdf': process.env.N8N_GENERATE_PDF_ENDPOINT || '/generate-pdf',
    'merge-pdf': process.env.N8N_MERGE_PDF_ENDPOINT || '/merge-pdf',
  };

  return `${baseUrl}${endpoints[endpoint]}`;
};

export async function sendToN8n(endpoint: N8nEndpoint, data: any) {
  const webhookUrl = getWebhookUrl(endpoint);

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      endpoint,
      timestamp: new Date().toISOString(),
      data,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send data to n8n: ${response.statusText}`);
  }

  return response.json();
}

export async function uploadFileToN8n(endpoint: N8nEndpoint, formData: globalThis.FormData) {
  const webhookUrl = getWebhookUrl(endpoint);

  const response = await fetch(webhookUrl, {
    method: 'POST',
    body: formData as BodyInit,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload file to n8n: ${response.statusText}`);
  }

  return response.json();
}
