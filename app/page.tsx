import { getAllWriteups, getAllTeamMembers } from "@/lib/mdx";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestWriteups } from "@/components/home/LatestWriteups";
import { TeamHighlights } from "@/components/home/TeamHighlights";
import { SponsorCTA } from "@/components/home/SponsorCTA";

export default function HomePage() {
  const writeups = getAllWriteups().slice(0, 3);
  const teamMembers = getAllTeamMembers().slice(0, 4);

  return (
    <div className="flex flex-col gap-16 md:gap-24 relative overflow-hidden">
      <HeroSection />
      <LatestWriteups writeups={writeups} />
      <TeamHighlights members={teamMembers} />
      <SponsorCTA />
    </div>
  );
}
