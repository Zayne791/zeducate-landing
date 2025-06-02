import QuizForm from '@/components/QuizForm';
import Hero from '@/components/Hero';
import SmoothScroll from '@/components/SmoothScroll';
import Benefits from '@/components/Benefits';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <SmoothScroll />
      <Hero />
      
      <section id="quiz-section" className="flex-1 py-12 md:py-16 flex items-center">
        <div className="container">
          <QuizForm />
        </div>
      </section>

      <Benefits />
    </main>
  );
} 