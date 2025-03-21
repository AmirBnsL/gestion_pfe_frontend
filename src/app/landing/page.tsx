import LandingPageNavBar from "@/app/components/landingPage/LandingPageNavBar";
import LandingPageHero from "@/app/components/landingPage/LandingPageHero";
import LandingPageUserSection from "@/app/components/landingPage/LandingPageUserSection";
import {LandingPageFeaturesSection} from "@/app/components/landingPage/LandingPageFeaturesSection";
import LandingPageTestimonialSection from "@/app/components/landingPage/LandingPageTestimonialSection";
import LandingPageCTASection from "@/app/components/landingPage/LandingPageCTASection";
import {LandingPageFooter} from "@/app/components/landingPage/LandingPageFooter";


export default function LandingPage() {
    return <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen flex justify-center items-center gap-24 flex-col">
        <LandingPageNavBar/>
        <LandingPageHero/>
        <LandingPageUserSection/>
        <LandingPageFeaturesSection/>
        <LandingPageTestimonialSection/>
        <LandingPageCTASection/>
        <LandingPageFooter/>
    </div>
}