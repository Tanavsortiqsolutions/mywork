import React from 'react';


import HomeFeature from './HomeFeature';
import HeroSection from './hero';
import CTA from './CTA/CTA';
import StorySection from './ScrollStory';
import WhoItsFor from './WhoItsFor';


export default function Home() {
  return (
    <div>
      <HeroSection />
      <WhoItsFor />
       <StorySection />
      <HomeFeature />
      <CTA />
    </div>
  );
}
