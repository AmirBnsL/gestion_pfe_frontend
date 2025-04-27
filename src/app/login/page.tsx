
import {ParticleBackground} from "@/app/components/login-page/ParticleBackground";
import {AnimatedBackgroundOverlay} from "@/app/components/login-page/AnimatedBackgroundOverlay";
import AnimatedFormWrapper from "@/app/components/login-page/AnimatedFormWrapper";
import {Illustration} from "@/app/components/login-page/Illustration";
import LoginForm from "@/app/components/login-page/LoginForm";



export default function AnimatedLoginPage() {
  return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F1022] p-4 relative overflow-hidden">
        <ParticleBackground />
        <AnimatedBackgroundOverlay />
        <AnimatedFormWrapper>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <Illustration />
            <LoginForm />
          </div>
        </AnimatedFormWrapper>
      </div>
  );
}