"use client";

import { getOptimization } from "@/services/dashboard";
import { OptimizationData } from "@/types/dashboard";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

type ScoreCardsProps = {
  sourceKey?: string;
};

const ScoreCards = ({ sourceKey }: ScoreCardsProps) => {

  // Component state
  const [optimizationResponse, setOptimizationResponse] =
    useState<OptimizationData | null>(null);

  // Side effect handler
  useEffect(() => {
    const ScoreCardData = async () => {
      try {
        if (!sourceKey) return;
        const data = await getOptimization(sourceKey);
        setOptimizationResponse(data as OptimizationData);
      } catch (error) {
        console.error(error);
      }
    };

    ScoreCardData();
  }, [sourceKey]);

  // Const based on state
  const scoreCards = [
    {
      tag: "AEO",
      value: optimizationResponse ? String(optimizationResponse.aeo_score) : "00",
      delta: "+6%",
      title: "Answer Engine Optimization Score",
      description:
        "Optimize: answer blocks, FAQ schema, concise snippets for AI Overviews.",
      tags: ["FAQ", "Schema", "Entities"],
    },
    {
      tag: "GEO",
      value: optimizationResponse ? String(optimizationResponse.geo_score) : "00",
      delta: "+3%",
      title: "Google Engine Optimization Score",
      description:
        "Optimize: backlinks, technical audits, metadata, content depth, page speed.",
      tags: ["Backlinks", "Speed", "Meta"],
    },
    {
      tag: "GEN",
      value: optimizationResponse ? String(optimizationResponse.gen_score) : "00",
      delta: "+4%",
      title: "Generative Engine Optimization Score",
      description:
        "Optimize: entity graphs, knowledge panels, citation readiness for LLMs.",
      tags: ["KG", "Citations", "Trust"],
    },
  ];

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      {scoreCards.map((card) => (
        <article
          key={card.tag}
          className="rounded-3xl border border-platinum bg-white p-5 shadow-[0_18px_40px_-30px_rgba(28,31,48,0.5)] sm:p-6"
        >
          <div className="flex items-center justify-between text-sm text-independence">
            <span>{card.tag}</span>
          </div>
          <div className="mt-2 flex items-end gap-2">
            <p className="text-4xl font-normal text-ink sm:text-5xl">{card.value}</p>
            <span className="flex items-center text-emerald-500 text-sm">
              <TrendingUp size={16} />
              {card.delta}
            </span>
          </div>
          <p className="mt-2 text-sm text-independence">{card.title}</p>
          <div className="mt-4 h-2 rounded-full bg-anti-flash">
            <div className="h-2 w-2/3 rounded-full bg-sunray" />
          </div>
          <p className="mt-4 text-sm text-independence">{card.description}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-independence">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[10px] border border-platinum bg-floral px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}

export default ScoreCards;
