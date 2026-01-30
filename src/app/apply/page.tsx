import ApplyHero from '@/components/ApplyHero';
import ApplicationForm from '@/components/ApplicationForm';

export default function ApplyPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <ApplyHero />
      
      <div id="apply-section" className="relative py-20 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto w-full">
            <ApplicationForm />
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-secondary-100 to-blue-100 rounded-full blur-3xl opacity-20" />
        </div>
      </div>
    </main>
  );
}
