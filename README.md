# Admin Panel Application

A modern admin application built with Next.js 16, shadcn/ui, and Clerk authentication, containerized with Docker.

## Features

- 🔐 **Authentication**: Clerk authentication with protected routes
- 🎨 **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- 📝 **Forms**: Dynamic forms with validation using react-hook-form and zod
- 📤 **File Upload**: Multi-file upload functionality
- 🔗 **n8n Integration**: Send form data and files to n8n webhooks
- 🐳 **Docker Support**: Fully containerized with Docker Compose
- 📱 **Responsive Design**: Mobile-friendly sidebar navigation

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: shadcn/ui + Tailwind CSS
- **Authentication**: Clerk
- **Form Handling**: react-hook-form + zod
- **Containerization**: Docker + Docker Compose
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Docker and Docker Compose (for containerized deployment)
- Clerk account (for authentication)
- n8n instance with webhook configured

### Installation

1. **Clone the repository and navigate to the project**:
   ```bash
   cd admin-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Update the following variables in `.env.local`:

   - **Clerk Authentication** (Get from https://dashboard.clerk.com):
     ```
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     CLERK_SECRET_KEY=your_clerk_secret_key
     ```

   - **n8n Webhook**:
     ```
     N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id
     ```

### Running Locally

1. **Development mode**:
   ```bash
   npm run dev
   ```

2. **Open your browser**:
   Navigate to `http://localhost:3000`

3. **Sign up/Sign in**:
   You'll be redirected to Clerk authentication

### Running with Docker

1. **Build and start the container**:
   ```bash
   docker-compose up --build
   ```

2. **Access the application**:
   Navigate to `http://localhost:3000`

3. **Stop the container**:
   ```bash
   docker-compose down
   ```

## Application Structure

```
admin-app/
├── app/
│   ├── dashboard/          # Protected dashboard routes
│   │   ├── forms/          # Form submission page
│   │   ├── upload/         # File upload page
│   │   ├── users/          # User management page
│   │   ├── settings/       # Settings page
│   │   └── layout.tsx      # Dashboard layout with sidebar
│   ├── sign-in/            # Sign-in page
│   ├── sign-up/            # Sign-up page
│   ├── api/
│   │   ├── submit-form/    # API route for form submissions
│   │   └── upload-file/    # API route for file uploads
│   └── layout.tsx          # Root layout with ClerkProvider
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── dashboard-nav.tsx   # Navigation components
├── lib/
│   ├── utils.ts            # Utility functions
│   └── n8n.ts              # n8n integration
├── middleware.ts           # Clerk middleware for protected routes
├── Dockerfile              # Docker configuration
└── docker-compose.yml      # Docker Compose configuration
```

## Menu Pages

1. **Dashboard**: Overview with statistics and quick actions
2. **Forms**: Submit form data to n8n
3. **File Upload**: Upload files with metadata to n8n
4. **Users**: View user list (demo data)
5. **Settings**: Application configuration

## n8n Integration

The application sends data to n8n webhooks in the following format:

### Form Submission
```json
{
  "endpoint": "form-submission",
  "timestamp": "2025-12-09T...",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "category": "general",
    "message": "..."
  }
}
```

### File Upload
Sends multipart/form-data with:
- `title`: Upload title
- `description`: Upload description
- `category`: File category
- `file_0`, `file_1`, etc.: The uploaded files
- `fileCount`: Number of files

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Sign-in URL path | Yes |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Sign-up URL path | Yes |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Redirect after sign-in | Yes |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Redirect after sign-up | Yes |
| `N8N_WEBHOOK_URL` | n8n webhook endpoint | Yes |

## Development

### Adding New Components

Use shadcn CLI to add components:
```bash
npx shadcn@latest add [component-name]
```

### Building for Production

```bash
npm run build
npm start
```

## Docker Commands

```bash
# Build the image
docker-compose build

# Start the container
docker-compose up

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down

# Rebuild and start
docker-compose up --build
```

## Security Notes

- Never commit `.env.local` or any files containing secrets
- Clerk handles authentication and session management securely
- All dashboard routes are protected by Clerk middleware
- Environment variables are validated at runtime

## Troubleshooting

### Clerk Authentication Issues
- Verify your Clerk keys are correct
- Check that your domain is configured in Clerk dashboard
- Ensure sign-in/sign-up URLs are properly set

### n8n Connection Issues
- Verify your n8n webhook URL is accessible
- Check n8n workflow is active
- Review n8n logs for incoming webhook requests

### Docker Issues
- Ensure `.env.local` exists before building
- Check Docker logs: `docker-compose logs`
- Verify port 3000 is not in use

## License

MIT

## Support

For issues and questions, please open an issue in the repository.
