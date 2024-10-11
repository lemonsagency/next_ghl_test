// This is a simplified version of the use-toast.ts file
import { useState, useEffect } from 'react'

export interface Toast {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, action }: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prevToasts) => [...prevToasts, { id, title, description, action }])
  }

  const dismiss = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (toasts.length > 0) {
        dismiss(toasts[0].id)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [toasts])

  return { toast, dismiss, toasts }
}