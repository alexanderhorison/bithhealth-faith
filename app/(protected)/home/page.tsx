import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckSquare, Package, Sparkles } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await currentUser();

  const workflows = [
    {
      title: "Talenta Timesheets Report",
      description: "Automated timesheet processing, validation, PDF generation and consolidation",
      icon: Clock,
      href: "/talenta-timesheet/summarize",
      status: "Active",
    },
    {
      title: "Jira Timesheets Checker",
      description: "Validate and verify time entries logged in Jira against project requirements",
      icon: CheckSquare,
      href: "#",
      status: "Coming Soon",
    },
    {
      title: "Auto Reconcile Pharmacy Delivery",
      description: "Automated reconciliation of pharmacy deliveries with invoice generation",
      icon: Package,
      href: "#",
      status: "Coming Soon",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.firstName || "Admin"}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Your intelligent automation hub for streamlined operations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* About FAITH Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-indigo-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-indigo-600" />
              <CardTitle className="text-2xl">F.A.I.T.H</CardTitle>
            </div>
            <CardDescription className="text-base text-gray-700 mt-2">
              Finance Artificial Intelligence Technology Healthcare
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              An intelligent automation platform that revolutionizes operational workflows across finance, technology, 
              and healthcare sectors through AI-powered automation and smart system integration.
            </p>
          </CardContent>
        </Card>

        {/* About Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">About</CardTitle>
            <CardDescription>Application information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Version</span>
                <span className="font-semibold">1.0.0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Framework</span>
                <span className="font-semibold">Next.js 16</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">UI Library</span>
                <span className="font-semibold">shadcn/ui</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Authentication</span>
                <span className="font-semibold">Clerk</span>
              </div>
            </div>
          </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workflows Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Available Workflows</CardTitle>
            <CardDescription>
              Automated processes to streamline your finance operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workflows.map((workflow, index) => {
                const Icon = workflow.icon;
                const isActive = workflow.status === "Active";
                
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-4 rounded-lg border ${
                      isActive 
                        ? "bg-white hover:bg-gray-50 transition-colors cursor-pointer" 
                        : "bg-gray-50 opacity-75"
                    }`}
                  >
                    {isActive ? (
                      <Link href={workflow.href} className="flex items-start gap-4 w-full">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-base">{workflow.title}</h3>
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                              {workflow.status}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {workflow.description}
                          </p>
                        </div>
                      </Link>
                    ) : (
                      <>
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-base text-gray-700">{workflow.title}</h3>
                            <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">
                              {workflow.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {workflow.description}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Third Party Services Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Third Party Services</CardTitle>
            <CardDescription>
              External services and APIs powering our automation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* n8n */}
              <div className="flex flex-col items-center justify-center p-4 rounded-lg border bg-white hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mb-2 flex items-center justify-center">
                  <img src="https://n8n.io/favicon.ico" alt="n8n" className="w-10 h-10" />
                </div>
                <span className="text-sm font-semibold text-center">n8n</span>
                <span className="text-xs text-muted-foreground text-center mt-1">Automation</span>
              </div>

              {/* Google Drive */}
              <div className="flex flex-col items-center justify-center p-4 rounded-lg border bg-white hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mb-2 flex items-center justify-center">
                  <svg viewBox="0 0 87.3 78" className="w-10 h-10">
                    <path fill="#0066da" d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"/>
                    <path fill="#00ac47" d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"/>
                    <path fill="#ea4335" d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"/>
                    <path fill="#00832d" d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"/>
                    <path fill="#2684fc" d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"/>
                    <path fill="#ffba00" d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-center">Google Drive</span>
                <span className="text-xs text-muted-foreground text-center mt-1">Storage</span>
              </div>

              {/* Google Sheets */}
              <div className="flex flex-col items-center justify-center p-4 rounded-lg border bg-white hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mb-2 flex items-center justify-center">
                  <svg viewBox="0 0 192 192" className="w-10 h-10">
                    <path fill="#0f9d58" d="M144 0H48C21.6 0 0 21.6 0 48v96c0 26.4 21.6 48 48 48h96c26.4 0 48-21.6 48-48V48c0-26.4-21.6-48-48-48z"/>
                    <path fill="#f1f1f1" d="M96 136H48v-16h48v16zm48-24H48v-16h96v16zm0-24H48V72h96v16z"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-center">Google Sheets</span>
                <span className="text-xs text-muted-foreground text-center mt-1">Data</span>
              </div>

              {/* Gemini */}
              <div className="flex flex-col items-center justify-center p-4 rounded-lg border bg-white hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mb-2 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-10 h-10">
                    <defs>
                      <linearGradient id="gemini-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#4285f4', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#9b72cb', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#d96570', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    <path fill="url(#gemini-gradient)" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-center">Gemini</span>
                <span className="text-xs text-muted-foreground text-center mt-1">AI Model</span>
              </div>

              {/* Claude */}
              <div className="flex flex-col items-center justify-center p-4 rounded-lg border bg-white hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mb-2 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-10 h-10">
                    <rect width="24" height="24" rx="4" fill="#CC9B7A"/>
                    <text x="12" y="17" fontSize="14" fontWeight="bold" textAnchor="middle" fill="white">AI</text>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-center">Claude Sonnet</span>
                <span className="text-xs text-muted-foreground text-center mt-1">AI Model</span>
              </div>

              {/* Carbone */}
              <div className="flex flex-col items-center justify-center p-4 rounded-lg border bg-white hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mb-2 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-10 h-10">
                    <circle cx="50" cy="50" r="45" fill="#2C3E50"/>
                    <text x="50" y="60" fontSize="32" fontWeight="bold" textAnchor="middle" fill="white">C</text>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-center">Carbone</span>
                <span className="text-xs text-muted-foreground text-center mt-1">Documents</span>
              </div>

              {/* PDF-app.net */}
              <div className="flex flex-col items-center justify-center p-4 rounded-lg border bg-white hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mb-2 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-10 h-10">
                    <path fill="#E53935" d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
                    <text x="12" y="16" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#E53935">PDF</text>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-center">PDF-app.net</span>
                <span className="text-xs text-muted-foreground text-center mt-1">PDF Tools</span>
              </div>

              {/* Clerk */}
              <div className="flex flex-col items-center justify-center p-4 rounded-lg border bg-white hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mb-2 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-10 h-10">
                    <defs>
                      <linearGradient id="clerk-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#6C47FF', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#17CCFC', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="45" fill="url(#clerk-gradient)"/>
                    <path fill="white" d="M50 25C36.2 25 25 36.2 25 50s11.2 25 25 25c6.9 0 13.1-2.8 17.7-7.3l-7.1-7.1C33.2 62.9 32 58.7 32 50c0-9.9 8.1-18 18-18s18 8.1 18 18c0 8.7-1.2 12.9-3.6 15.3l-7.1 7.1C62 67.2 68 58.9 68 50c0-13.8-11.2-25-25-25z"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-center">Clerk</span>
                <span className="text-xs text-muted-foreground text-center mt-1">Authentication</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
