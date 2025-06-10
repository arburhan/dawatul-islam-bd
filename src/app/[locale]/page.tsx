import Hero from '@/components/home/Hero';
import NavigationCards from '@/components/home/NavigationCards';
import StatsSection from '@/components/home/StatsSection';
import LatestUpdates from '@/components/home/LatestUpdates';
import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  await params; // Consume params to avoid unused variable warning

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Navigation Cards */}
      <NavigationCards />
      
      {/* Statistics Section */}
      <StatsSection />
      
      {/* Latest Updates */}
      <LatestUpdates />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* Call to Action */}
      <CallToAction />
    </div>
  );
} 