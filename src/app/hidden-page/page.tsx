export default function HiddenPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Secret Page</h1>
        <p className="text-gray-600 mb-6">
          You've found the hidden page! This area is not linked from the main navigation.
        </p>
        <a 
          href="/" 
          className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}
