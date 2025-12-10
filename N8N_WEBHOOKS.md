# N8N Webhook Endpoints Configuration

## Overview
Each menu in the FAITH admin application sends data to its own dedicated n8n webhook endpoint.

## Configuration

### Environment Variables (.env.local)
```bash
N8N_WEBHOOK_BASE_URL=https://your-n8n-instance.com/webhook

# Individual endpoints for each menu
N8N_FORMS_ENDPOINT=/forms-submission
N8N_UPLOAD_ENDPOINT=/file-upload
N8N_ADVANCED_ENDPOINT=/advanced-data
N8N_USERS_ENDPOINT=/users-management
N8N_SETTINGS_ENDPOINT=/settings-update
```

## Menu to Endpoint Mapping

### 1. **Forms Menu** → `/dashboard/forms`
- **Endpoint**: `{BASE_URL}/forms-submission`
- **API Route**: `/api/submit-form`
- **Method**: POST
- **Data Sent**:
  ```json
  {
    "endpoint": "forms",
    "timestamp": "2024-12-10T...",
    "data": {
      "name": "...",
      "email": "...",
      "phone": "...",
      "category": "...",
      "message": "..."
    }
  }
  ```

### 2. **File Upload Menu** → `/dashboard/upload`
- **Endpoint**: `{BASE_URL}/file-upload`
- **API Route**: `/api/upload-file`
- **Method**: POST
- **Data Sent**: `multipart/form-data`
  - title
  - description
  - category
  - file_0, file_1, ... (files)
  - fileCount

### 3. **Advanced Menu** → `/dashboard/advanced`
- **Endpoint**: `{BASE_URL}/advanced-data`
- **API Route**: `/api/advanced-upload`
- **Method**: POST
- **Data Sent**: `multipart/form-data`
  - file_0, file_1, ... (files)
  - fileCount
  - timestamp

### 4. **Users Menu** → `/dashboard/users`
- **Endpoint**: `{BASE_URL}/users-management`
- **API Route**: `/api/users`
- **Methods**: GET, POST
- **Data Sent** (POST):
  ```json
  {
    "endpoint": "users",
    "timestamp": "2024-12-10T...",
    "data": {
      "userId": "...",
      "action": "...",
      ...
    }
  }
  ```
- **Data Sent** (GET):
  ```json
  {
    "endpoint": "users",
    "timestamp": "2024-12-10T...",
    "data": {
      "action": "fetch_users"
    }
  }
  ```

### 5. **Settings Menu** → `/dashboard/settings`
- **Endpoint**: `{BASE_URL}/settings-update`
- **API Route**: `/api/settings`
- **Methods**: GET, POST
- **Data Sent** (POST):
  ```json
  {
    "endpoint": "settings",
    "timestamp": "2024-12-10T...",
    "data": {
      "settingKey": "...",
      "settingValue": "...",
      ...
    }
  }
  ```
- **Data Sent** (GET):
  ```json
  {
    "endpoint": "settings",
    "timestamp": "2024-12-10T...",
    "data": {
      "action": "fetch_settings"
    }
  }
  ```

### 6. **Timesheet Summary Menu** → `/dashboard/timesheet-summary`
- **Endpoint**: `https://n8n.zenithtech.cloud/webhook/d1125a91-7b27-40cf-bc6a-8a6055716ce3`
- **API Route**: `/api/timesheet-summary`
- **Method**: POST
- **Data Sent**: `multipart/form-data`
  - file (timesheet file - .xlsx, .xls, .csv)
- **Form Fields**:
  - Upload Timesheet (required)

### 7. **Generate PDF Menu** → `/dashboard/generate-pdf`
- **Endpoint**: `https://n8n.zenithtech.cloud/webhook/aff5e9d3-aae6-42bc-b87f-20f579bf55f5`
- **API Route**: `/api/generate-pdf`
- **Method**: POST
- **Data Sent**:
  ```json
  {
    "endpoint": "generate-pdf",
    "timestamp": "2024-12-10T...",
    "data": {
      "date": "2024-12-10"
    }
  }
  ```
- **Form Fields**:
  - date (date picker)

### 8. **Merge PDF Menu** → `/dashboard/merge-pdf`
- **Endpoint**: `https://n8n.zenithtech.cloud/webhook/96763d27-afac-4dbc-9168-c651be54b3e3`
- **API Route**: `/api/merge-pdf`
- **Method**: POST
- **Data Sent**:
  ```json
  {
    "endpoint": "merge-pdf",
    "timestamp": "2024-12-10T...",
    "data": {
      "date": "2024-12-10",
      "sendTo": "manager|hr|finance|admin"
    }
  }
  ```
- **Form Fields**:
  - Date (required)
  - Send to (required dropdown: Manager, HR Department, Finance Department, Admin)

## N8N Workflow Setup

To receive data from the FAITH admin app, create 5 separate workflows in n8n:

### 1. Forms Submission Workflow
- **Webhook URL**: `https://your-n8n-instance.com/webhook/forms-submission`
- **Method**: POST
- **Expected Data**: JSON with form fields

### 2. File Upload Workflow
- **Webhook URL**: `https://your-n8n-instance.com/webhook/file-upload`
- **Method**: POST
- **Expected Data**: multipart/form-data with files

### 3. Advanced Data Workflow
- **Webhook URL**: `https://your-n8n-instance.com/webhook/advanced-data`
- **Method**: POST
- **Expected Data**: multipart/form-data with files

### 4. Users Management Workflow
- **Webhook URL**: `https://your-n8n-instance.com/webhook/users-management`
- **Methods**: GET, POST
- **Expected Data**: JSON with user data or fetch request

### 5. Settings Update Workflow
- **Webhook URL**: `https://your-n8n-instance.com/webhook/settings-update`
- **Methods**: GET, POST
- **Expected Data**: JSON with settings data or fetch request

## Testing

After configuring your n8n webhooks, update `.env.local`:

```bash
N8N_WEBHOOK_BASE_URL=https://your-actual-n8n-instance.com/webhook
```

Then rebuild the Docker container:
```bash
docker-compose down
cp .env.local .env
docker-compose up --build -d
```

## API Response Format

All endpoints return:
```json
{
  "success": true/false,
  "message": "...",
  "data": { ... }
}
```
