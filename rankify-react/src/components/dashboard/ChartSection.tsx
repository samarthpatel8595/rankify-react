import { Monitor, Smartphone, Tablet, Tv } from 'lucide-react';
import React, { useMemo } from 'react'
import { ChartData, ChartOptions } from "chart.js";
import { Bar, Doughnut, Line } from 'react-chartjs-2'

const ChartSection = () => {

    const barData = useMemo<ChartData<"bar">>(() => {
        const labels = ["USA", "GER", "CHINA", "UAE", "INDIA", "SING", "CAN"];
        const values = [74000, 32000, 69000, 52000, 66000, 34000, 47000];

        return {
            labels,
            datasets: [
                {
                    label: "Active users",
                    data: values,
                    borderRadius: {
                        topLeft: 0,
                        topRight: 6,
                        bottomLeft: 0,
                        bottomRight: 6,
                    },
                    borderSkipped: false,
                    categoryPercentage: 0.7,
                    barPercentage: 0.7,
                    backgroundColor: (context) => {
                        const { chart } = context;
                        const { ctx, chartArea } = chart;

                        if (!chartArea) {
                            return "#3B82F6";
                        }

                        const gradient = ctx.createLinearGradient(
                            chartArea.left,
                            0,
                            chartArea.right,
                            0
                        );
                        gradient.addColorStop(0, "#3B82F6");
                        gradient.addColorStop(1, "#06B6D4");
                        return gradient;
                    },
                },
            ],
        };
    }, []);

    const barOptions = useMemo<ChartOptions<"bar">>(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: "y",
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: "rgba(17, 24, 39, 0.9)",
                    padding: 10,
                    displayColors: false,
                    titleColor: "#F9FAFB",
                    bodyColor: "#E5E7EB",
                },
            },
            layout: {
                padding: {
                    top: 4,
                    right: 6,
                    bottom: 4,
                    left: 0,
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    border: { display: true, width: 2, color: "#E2E8F0" },
                    ticks: {
                        color: "#94A3B8",
                        font: { size: 11 },
                        stepSize: 20000,
                        callback: (value) => `${value}`,
                    },
                },
                y: {
                    grid: {
                        display: false,
                    },
                    border: {
                        display: true, width: 2, color: "#E2E8F0"
                    },
                    ticks: {
                        color: "#475569",
                        font: { size: 12, weight: 600 },
                    },
                },
            },
        }),
        []
    );

    const doughnutData = useMemo<ChartData<"doughnut">>(() => {
        const labels = ["Desktop", "Mobile", "Tablet", "Smart TV"];
        const values = [36, 40, 8, 16];

        return {
            labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: ["#3B82F6", "#22D3EE", "#0EA5E9", "#06B6D4"],
                    borderColor: "#FFFFFF",
                    borderWidth: 4,
                    hoverOffset: 6,
                },
            ],
        };
    }, []);

    const doughnutOptions = useMemo<ChartOptions<"doughnut">>(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            cutout: "64%",
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: "rgba(17, 24, 39, 0.9)",
                    padding: 10,
                    displayColors: false,
                    titleColor: "#F9FAFB",
                    bodyColor: "#E5E7EB",
                },
            },
        }),
        []
    );

    const lineData = useMemo<ChartData<"line">>(() => {
        const labels = ["Jan", "Feb", "Mar", "Apr", "May"];

        return {
            labels,
            datasets: [
                {
                    label: "China",
                    data: [12, 28, 40, 30, 44],
                    borderColor: "#0EA5E9",
                    backgroundColor: "rgba(14, 165, 233, 0.15)",
                    tension: 0.35,
                    pointRadius: 4,
                    pointHoverRadius: 5,
                    pointBackgroundColor: "#0EA5E9",
                },
                {
                    label: "India",
                    data: [18, 30, 26, 40, 48],
                    borderColor: "#3B82F6",
                    backgroundColor: "rgba(59, 130, 246, 0.15)",
                    tension: 0.35,
                    pointRadius: 4,
                    pointHoverRadius: 5,
                    pointBackgroundColor: "#3B82F6",
                },
                {
                    label: "USA",
                    data: [8, 14, 22, 16, 36],
                    borderColor: "#06B6D4",
                    backgroundColor: "rgba(6, 182, 212, 0.15)",
                    tension: 0.35,
                    pointRadius: 4,
                    pointHoverRadius: 5,
                    pointBackgroundColor: "#06B6D4",
                },
            ],
        };
    }, []);

    const lineOptions = useMemo<ChartOptions<"line">>(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                    align: "center",
                    labels: {
                        usePointStyle: true,
                        boxWidth: 8,
                        boxHeight: 8,
                        padding: 16,
                        color: "#475569",
                        font: { size: 12, weight: 600, lineHeight: 1 },
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
                    grid: {
                        color: "rgba(148, 163, 184, 0.18)",
                    },
                    border: { display: true, width: 2, color: "#E2E8F0" },
                    ticks: { color: "#94A3B8", font: { size: 11 } },
                },
                y: {
                    grid: {
                        color: "rgba(148, 163, 184, 0.18)",
                        drawTicks: false,
                    },
                    border: { display: true, width: 2, color: "#E2E8F0" },
                    ticks: { color: "#94A3B8", font: { size: 11 }, stepSize: 15 },
                },
            },
        }),
        []
    );


    return (
        <>
            <section className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-platinum bg-white p-4 shadow-[0_18px_40px_-32px_rgba(28,31,48,0.5)] sm:p-6">
                    <p className="font-display text-base font-semibold text-ink">
                        Users by Country
                    </p>
                    <p className="text-sm text-independence">
                        Geographic distribution of active users.
                    </p>
                    <div className="mt-6 h-64 rounded-2xl bg-white sm:h-64 lg:h-72">
                        <Bar data={barData} options={barOptions} />
                    </div>
                </div>
                <div className="rounded-3xl border border-platinum bg-white p-4 shadow-[0_18px_40px_-32px_rgba(28,31,48,0.5)] sm:p-6">
                    <p className="font-display text-base font-semibold text-ink">
                        Device Distribution
                    </p>
                    <p className="text-sm text-independence">
                        Usage across different platforms.
                    </p>
                    <div className="mt-6 flex flex-col gap-6">
                        <div className="mx-auto h-52 w-full max-w-65 sm:h-60 sm:max-w-70">
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                { label: "Desktop", icon: Monitor, value: "36%", color: "#3B82F6" },
                                { label: "Mobile", icon: Smartphone, value: "40%", color: "#22D3EE" },
                                { label: "Tablet", icon: Tablet, value: "8%", color: "#0EA5E9" },
                                { label: "Smart TV", icon: Tv, value: "16%", color: "#06B6D4" },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3"
                                >
                                    <span
                                        className="flex h-10 w-10 items-center justify-center rounded-[10px]"
                                        style={{
                                            backgroundColor: `${item.color}22`,
                                            color: item.color,
                                        }}
                                    >
                                        <item.icon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-ink">
                                            {item.value}
                                        </p>
                                        <p className="text-xs text-independence">{item.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-2 rounded-3xl border border-platinum bg-white p-4 shadow-[0_18px_40px_-32px_rgba(28,31,48,0.5)] sm:p-6">
                <p className="font-display text-base font-semibold text-ink">
                    Growth Trends
                </p>
                <p className="text-sm text-independence">
                    User growth over time by top countries.
                </p>
                <div className="mt-6 h-60 w-full sm:h-64 lg:h-72">
                    <Line data={lineData} options={lineOptions} />
                </div>
            </section>
        </>
    )
}

export default ChartSection