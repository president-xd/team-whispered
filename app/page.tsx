import { getAllBlogs, getAllTeamMembers } from "@/lib/mdx";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestBlogs } from "@/components/home/LatestBlogs";
import { TeamHighlights } from "@/components/home/TeamHighlights";
import { SponsorCTA } from "@/components/home/SponsorCTA";

export default function HomePage() {
  const Blogs = getAllBlogs().slice(0, 3);
  const teamMembers = getAllTeamMembers().slice(0, 4);

  return (
    <div className="flex flex-col gap-16 md:gap-24 relative overflow-hidden">
      <HeroSection />
      <LatestBlogs Blogs={Blogs} />
      <TeamHighlights members={teamMembers} />
      <SponsorCTA />
    </div>
  );
}
