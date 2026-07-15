import { Button } from '@/components/ui/button'
import { COLORS } from '@/lib/config/constants'

interface ProcessButtonProps {
  isSubmitting?: boolean
  isResetting?: boolean
  children?: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export function ProcessButton({
  isSubmitting = false,
  isResetting = false,
  children = 'Process',
  className = '',
  onClick,
  type = 'submit',
}: ProcessButtonProps) {
  return (
    <Button
      type={type}
      className={`w-full text-white ${className}`}
      style={{
        backgroundColor: COLORS.PRIMARY,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = COLORS.PRIMARY_HOVER
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = COLORS.PRIMARY
      }}
      disabled={isSubmitting || isResetting}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}