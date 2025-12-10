import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <SignedIn>
        {redirect("/home")}
      </SignedIn>
      <SignedOut>
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center space-y-6 p-8">
            <h1 className="text-4xl font-bold tracking-tight">F.A.I.T.H</h1>
            <p className="text-gray-600 max-w-md">
              Sign in to access the admin dashboard and manage your application.
            </p>
            <div className="flex gap-4 justify-center">
              <SignInButton mode="modal">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="lg">
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
}

