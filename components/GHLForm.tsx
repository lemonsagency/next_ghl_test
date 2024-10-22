'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function GHLForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    try {
      console.log('Submitting form data:', data)
      const response = await fetch('/api/submit-to-ghl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      console.log('API response:', result)

      if (response.ok) {
        toast({
          title: "Success",
          description: "Your form has been submitted successfully!",
        })
        router.push('/thank-you')
      } else {
        throw new Error(result.error || 'Form submission failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "There was a problem submitting your form. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</Label>
        <Input 
          id="name" 
          name="name" 
          required 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          required 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  )
}