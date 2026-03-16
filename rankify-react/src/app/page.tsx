"use client";

import "chart.js/auto";
import KeywordResearch from "@/components/common/KeywordResearch";
import ChartSection from "@/components/dashboard/ChartSection";
import DashboardHero from "@/components/dashboard/DashboardHero";
import KpiSection from "@/components/dashboard/KpiSection";
import ScoreCards from "@/components/dashboard/ScoreCards";
import StatsBar from "@/components/dashboard/StatsBar";
import type { SourceOption } from "@/services/dashboard";
import { useState } from "react";

const Home = () => {
  const [selectedProject, setSelectedProject] = useState<SourceOption | null>(null);

  return (
    <>
      <DashboardHero onSelectProject={setSelectedProject} />
      <ScoreCards sourceKey={selectedProject?.source} />
      <StatsBar />
      <ChartSection />
      <KpiSection />
      <KeywordResearch />
    </>
  );
}


export default Home;