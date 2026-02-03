import ApplyHero from '@/components/ApplyHero';
import ApplicationForm from '@/components/ApplicationForm';
import Script from 'next/script';

export default function ApplyPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Script id="fb-pixel-applicant" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '735495399156716');
          fbq('track', 'PageView', { access_token: 'EAAUGawZBZAeH8BQuAZCsNZCo0envfSkZAB5jZAZCnXRh9fAaCnFksZA09Dgc6aZCIZCK6PZAnPWTA96561PZBfldj7ZAJYOo3IzZBgY6iwnbkw6TP0ZBZCfZCnBr0PKECKqCp8Grn41WLr7iKtuIqNxDzlWMqSjjmHaqblD5ceZBZAlkF6RgPhcP5bsfNgDOIDdhUnVHp0xNecXSQZDZD' });
        `}
      </Script>
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
