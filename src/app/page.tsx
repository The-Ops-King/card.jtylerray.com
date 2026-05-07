import { AnimatedBackground } from "@/components/animated-background";
import { ProfileCard } from "@/components/profile-card";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full items-start justify-center px-4 py-8 sm:py-16">
      <AnimatedBackground />
      <div className="flex w-full max-w-[440px] justify-center sm:min-h-[calc(100vh-8rem)] sm:items-center">
        <ProfileCard />
      </div>
    </main>
  );
}
