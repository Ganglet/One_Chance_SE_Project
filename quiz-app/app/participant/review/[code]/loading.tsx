export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
        <p className="mt-4 text-lg">Loading your results...</p>
      </div>
    </div>
  )
} 