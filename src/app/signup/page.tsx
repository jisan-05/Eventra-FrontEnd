import { SignupForm } from "@/components/signup-form"

export default function Page() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-background px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <SignupForm />
      </div>
    </div>
  )
}
