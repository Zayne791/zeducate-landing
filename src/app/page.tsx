import QuizForm from '@/components/QuizForm';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      
      {/* Sticky form container that stays centered */}
      <div id="quiz-section" className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto w-full">
            <QuizForm />
          </div>
        </div>
        
        {/* Optimized floating background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-secondary-100 to-blue-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full blur-2xl opacity-15 animate-pulse" style={{ animationDelay: '3s', animationDuration: '6s' }} />
        </div>
      </div>
    </main>
  );
} 