import { Button } from "@/components/ui/button"

interface ProcessButtonProps {
  isSubmitting?: boolean
  isResetting?: boolean
  children?: React.ReactNode
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
}

export function ProcessButton({ 
  isSubmitting = false, 
  isResetting = false,
  children = "Process",
  className = "",
  onClick,
  type = "submit"
}: ProcessButtonProps) {
  return (
    <Button
      type={type}
      className={`w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white ${className}`}
      disabled={isSubmitting || isResetting}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}