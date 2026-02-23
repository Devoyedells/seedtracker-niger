import { LandingLayout } from "@/layouts/LandingLayout";
import { Hero } from "@/components/Hero";
import { ActorRegistration } from "@/components/ActorRegistration";
import { ValueChainMap } from "@/components/ValueChainMap";
import { ActorMap } from "@/components/ActorMap";
import { ValueChainVisibility } from "@/components/ValueChainVisibility";
import { StakeholderBenefits } from "@/components/StakeholderBenefits";
import { FAQ } from "@/components/FAQ";

export default function HomePage() {
  return (
    <LandingLayout>
      <Hero />
      <div id="registration">
        <ActorRegistration />
      </div>
      <div id="map">
        <ValueChainMap />
        <ActorMap />
      </div>
      <ValueChainVisibility />
      <StakeholderBenefits />
      <div id="faq">
        <FAQ />
      </div>
    </LandingLayout>
  );
}
