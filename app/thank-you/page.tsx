import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-8">
          Your form has been successfully submitted. We appreciate your interest and will get back to you soon.
        </p>
        <Link href="/">
          <Button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}