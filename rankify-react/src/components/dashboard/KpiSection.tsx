import { ArrowRight, Clock, ExternalLink, FileText, MicVocal, TrendingUp, Youtube } from 'lucide-react'
import React from 'react'

const kpiCountList = [
    {
        title: "Total Blogs",
        value: "124",
        growth: "+12%",
        meta: "0 Published",
        icon: FileText,
        tint: "#C9AA3F",
    },
    {
        title: "Podcasts",
        value: "70",
        growth: "+8%",
        meta: "0 Published",
        icon: MicVocal,
        tint: "#C9AA3F",
    },
    {
        title: "YouTube Videos",
        value: "235",
        growth: "+15%",
        meta: "235 Linked Videos",
        icon: Youtube,
        tint: "#C9AA3F",
    },
]

const kpiDescriptionList = [
    {
        title: "AI Blog ",
        accent: "Generation",
        description: "Create professional blog posts with AI",
        icon: FileText,
        tint: "#C9AA3F",
    },
    {
        title: "Podcasts ",
        accent: "Scripts",
        description: "Convert blogs to podcast scripts",
        icon: MicVocal,
        tint: "#C9AA3F",
    },
    {
        title: "YouTube ",
        accent: "Integration",
        description: "Link videos for better SEO",
        icon: Youtube,
        tint: "#C9AA3F",
    },
]

const KpiSection = () => {
    return (
        <section className="mt-6 rounded-3xl">
            <div className="grid gap-4 lg:grid-cols-3">
                {
                    kpiCountList.map((item) => (
                        <div
                            key={item.title}
                            className="flex flex-col justify-between gap-4 overflow-hidden rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-[0_14px_28px_-22px_rgba(15,23,42,0.45)] sm:flex-row sm:items-center"
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <span
                                    className="flex h-12 w-12 shrink-0 aspect-square items-center justify-center rounded-full"
                                    style={{ backgroundColor: `${item.tint}1A`, color: item.tint }}
                                >
                                    <item.icon className="h-8 w-8" />
                                </span>
                                <div className="min-w-0">
                                    <p className="text-sm font-normal text-slate-600 sm:whitespace-nowrap">
                                        {item.title}
                                    </p>
                                    <div className="mt-1 flex items-center gap-3">
                                        <span
                                            className="text-lg font-normal"
                                            style={{ color: item.tint }}
                                        >
                                            {item.value}
                                        </span>

                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-3 sm:justify-end">
                                <div className="flex flex-col gap-2">
                                    <span className="inline-flex w-fit items-center gap-1 rounded-sm bg-emerald-50 px-2 py-1 text-xs font-normal text-emerald-600 sm:self-end">
                                        <TrendingUp className="h-3 w-3" />
                                        {item.growth}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-slate-500 sm:whitespace-nowrap">
                                        <Clock className="h-3 w-3" />
                                        {item.meta}
                                    </span>
                                </div>
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center text-slate-400">
                                    <ExternalLink className="h-4 w-4" />
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                {kpiDescriptionList.map((item) => (
                    <div
                        key={item.description}
                        className="flex h-full flex-col justify-between gap-12 rounded-3xl border border-[#F3F4F6] bg-white p-6 shadow-[0_18px_32px_-28px_rgba(15,23,42,0.45)]"
                    >
                        <div>
                            <span
                                className="flex h-12 w-12 items-center justify-center rounded-full"
                                style={{ backgroundColor: `${item.tint}1A`, color: item.tint }}
                            >
                                <item.icon className="h-8 w-8" />
                            </span>
                            <p className="mt-4 text-base font-normal text-ink">
                                {item.title}
                                <span className="text-sunray">{item.accent}</span>
                            </p>
                            <p className="mt-2 text-sm text-slate-500">
                                {item.description}
                            </p>
                        </div>
                        <button
                            className="flex items-center cursor-pointer gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-sunray">
                            Get Started
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default KpiSection