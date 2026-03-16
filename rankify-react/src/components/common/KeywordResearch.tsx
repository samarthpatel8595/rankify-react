import "chart.js/auto";
import { Eye, Search, Sparkles, Target, TrendingUp } from 'lucide-react'
import React, { useMemo } from 'react'
import { ChartData, ChartOptions } from "chart.js";
import { Scatter } from 'react-chartjs-2'
import Button from '@/components/common/Button';
import InputField from '@/components/common/InputField';
import { usePathname } from "next/navigation";

const KeywordResearch = () => {

    // Const variables
    const pathname = usePathname();

    const difficultyData = useMemo<ChartData<"scatter">>(
        () => ({
            datasets: [
                {
                    label: "High Potential",
                    data: [
                        { x: 18, y: 4200 },
                        { x: 25, y: 11800 },
                        { x: 32, y: 6500 },
                        { x: 38, y: 7600 },
                    ],
                    backgroundColor: "#C9AA3F",
                    pointRadius: 4,
                },
                {
                    label: "Medium",
                    data: [
                        { x: 44, y: 8200 },
                        { x: 50, y: 9800 },
                        { x: 56, y: 11400 },
                    ],
                    backgroundColor: "#3B82F6",
                    pointRadius: 4,
                },
                {
                    label: "Low",
                    data: [
                        { x: 70, y: 15000 },
                        { x: 74, y: 18200 },
                        { x: 78, y: 22000 },
                    ],
                    backgroundColor: "#22D3EE",
                    pointRadius: 4,
                },
            ],
        }),
        []
    );

    const difficultyOptions = useMemo<ChartOptions<"scatter">>(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                    align: "start",
                    labels: {
                        usePointStyle: true,
                        boxWidth: 6,
                        boxHeight: 6,
                        padding: 14,
                        color: "#475569",
                        font: { size: 11, weight: 600, lineHeight: 1.2 },
                    },
                },
                tooltip: {
                    backgroundColor: "rgba(17, 24, 39, 0.9)",
                    padding: 10,
                    displayColors: false,
                    titleColor: "#F9FAFB",
                    bodyColor: "#E5E7EB",
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Difficulty",
                        color: "#64748B",
                        font: { size: 11, weight: 400 },
                    },
                    grid: {
                        color: "rgba(148, 163, 184, 0.18)",
                    },
                    border: { display: true, width: 2, color: "#E2E8F0" },
                    min: 0,
                    max: 110,
                    ticks: { color: "#94A3B8", font: { size: 11 }, stepSize: 25 },
                },
                y: {
                    title: {
                        display: true,
                        text: "Search Volume",
                        color: "#64748B",
                        font: { size: 11, weight: 400 },
                    },
                    grid: {
                        color: "rgba(148, 163, 184, 0.18)",
                    },
                    border: { display: true, width: 2, color: "#E2E8F0" },
                    min: 0,
                    max: 27500,
                    ticks: { color: "#94A3B8", font: { size: 11 }, stepSize: 5500 },
                },
            },
        }),
        []
    );
    return (
        <>
            <section className={`${pathname === "/keyword-research" ? "" : "mt-6"} rounded-3xl`}>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-4 mb-1">
                            <span
                                className="flex h-12 w-12 items-center justify-center rounded-xl"
                                style={{ backgroundColor: `#C9AA3F1A`, color: `#C9AA3F` }}
                            >
                                <Search className="h-6 w-6" />
                            </span>
                            <p className="font-display text-lg font-semibold text-ink">
                                Keyword Research
                            </p>
                        </div>
                        <p className="text-sm text-independence">
                            Discover high-potential keywords with AI-powered insights
                        </p>
                    </div>
                </div>
                <div className="mt-6 flex flex-col gap-4 lg:flex-row">
                    <InputField
                        wrapperClassName="flex-1 px-4 py-3"
                        icon={<Search className="text-independence" size={20} />}
                        placeholder="Enter seed keyword (e.g., AI marketing)"
                    />
                    <Button
                        className="px-5 py-3 text-sm lg:w-auto"
                        icon={<Sparkles />}
                        variant="primary"
                    >
                        Generate
                    </Button>
                </div>
            </section>
            <section className="mt-2 grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-platinum bg-white p-4 shadow-[0_18px_40px_-32px_rgba(28,31,48,0.5)] sm:p-6">
                    <p className="font-display text-base font-normal text-ink">
                        Difficulty vs Volume
                    </p>
                    <div className="mt-5 h-56 sm:h-64 lg:h-72">
                        <Scatter data={difficultyData} options={difficultyOptions} />
                    </div>
                    <div className="mt-6 border-t border-slate-100 pt-4">
                        <p className="text-sm font-normal text-ink">
                            Keyword Distribution
                        </p>
                        <div className="mt-4 space-y-3">
                            {[
                                {
                                    label: "Easy (0-30)",
                                    value: "23 keywords",
                                    percent: "35%",
                                    color: "#C9AA3F",
                                },
                                {
                                    label: "Medium (31-60)",
                                    value: "54 keywords",
                                    percent: "62%",
                                    color: "#3B82F6",
                                },
                                {
                                    label: "Hard (61-100)",
                                    value: "50 keywords",
                                    percent: "50%",
                                    color: "#22D3EE",
                                },
                            ].map((item) => (
                                <div key={item.label} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm text-slate-500">
                                        <span>{item.label}</span>
                                        <span className="text-ink">{item.value}</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-slate-100">
                                        <span
                                            className="block h-full rounded-full"
                                            style={{ width: item.percent, backgroundColor: item.color }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="rounded-3xl border border-platinum bg-white p-4 shadow-[0_18px_40px_-32px_rgba(28,31,48,0.5)] sm:p-6">
                    <p className="font-display text-base font-normal text-ink">
                        Volume Searches
                    </p>
                    <div className="mt-5 space-y-4">
                        {[
                            {
                                title: "AI marketing tools",
                                volume: "12K",
                                kd: "25",
                                trend: "+12%",
                                cpc: "$8.50",
                                tag1: "Commercial",
                                tag2: "Featured Snippet",
                                tag2Color: "text-sunray",
                            },
                            {
                                title: "AI content generator",
                                volume: "8.5K",
                                kd: "45",
                                trend: "+8%",
                                cpc: "$6.20",
                                tag1: "Commercial",
                                tag2: "Standard",
                                tag2Color: "text-sunray",
                            },
                            {
                                title: "marketing automation AI",
                                volume: "6.5K",
                                kd: "30",
                                trend: "+15%",
                                cpc: "$9.10",
                                tag1: "Commercial",
                                tag2: "Featured Snippet",
                                tag2Color: "text-sunray",
                            },
                            {
                                title: "AI powered marketing",
                                volume: "7.8K",
                                kd: "40",
                                trend: "+10%",
                                cpc: "$7.30",
                                tag1: "Informational",
                                tag2: "Standard",
                                tag2Color: "text-sunray",
                            },
                            {
                                title: "AI marketing software",
                                volume: "4.2K",
                                kd: "20",
                                trend: "+18%",
                                cpc: "$11.50",
                                tag1: "Commercial",
                                tag2: "Shopping",
                                tag2Color: "text-sunray",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="rounded-2xl border border-slate-200 bg-[#F3F4F6] px-4 py-3 shadow-[0_12px_24px_-20px_rgba(15,23,42,0.35)]"
                            >
                                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-start">
                                    <div>
                                        <p className="text-sm font-normal text-ink">
                                            {item.title}
                                        </p>
                                        <div className="mt-1 flex flex-wrap items-center gap-3 text-[12px] text-slate-400">
                                            <span className="inline-flex items-center gap-1"><Eye size={12} /> {item.volume}</span>
                                            <span className="inline-flex items-center gap-1"><Target size={12} /> KD: {item.kd}</span>
                                            <span className="inline-flex items-center gap-1 text-emerald-500"><TrendingUp size={12} /> {item.trend}</span>
                                        </div>
                                    </div>
                                    <div className="text-left text-xs text-slate-500 sm:text-right">
                                        <p className="font-normal text-ink">{item.cpc}</p>
                                        <p>CPC</p>
                                    </div>
                                </div>
                                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
                                    <span className="rounded-lg border border-platinum bg-white px-3 py-2 text-slate-500">
                                        {item.tag1}
                                    </span>
                                    <span
                                        className={`rounded-lg bg-amber-50 px-3 py-2 ${item.tag2Color}`}
                                    >
                                        {item.tag2}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button
                        className="mt-5 w-full rounded-[14px] py-3 text-sm font-normal"
                        variant="primary"
                    >
                        View All Keywords
                    </Button>
                </div>
            </section>
        </>
    )
}

export default KeywordResearch
