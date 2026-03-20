"use client";

import LayoutShell from "@/components/common/LayoutShell";

export default function TextToPodcastPage() {
    return (

        <div className="p-2  space-y-6">

            {/* MAIN CONTAINER */}


            <div className="grid grid-cols-3 gap-6">

                {/* LEFT SIDE */}
                <div className="col-span-2 bg-white border border-[#E5E7EB] rounded-xl p-5 flex flex-col justify-between">

                    {/* TOP CONTENT */}
                    <div>
                        <h1 className="text-[18px] font-semibold text-[#111827]">
                            Text to Podcast
                        </h1>

                        <p className="text-[13px] text-[#6B7280] mt-1">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>

                        {/* INPUT TITLE */}
                        <div className="flex items-center gap-2 mt-5 mb-3">
                            <span className="text-sm font-medium text-[#111827]">
                                ✨ Input Content
                            </span>
                        </div>

                        {/* TEXTAREA */}
                        <textarea
                            placeholder="Paste article, paper, or notes here"
                            className="w-full h-[420px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 text-sm outline-none resize-none"
                        />
                    </div>

                    {/* BUTTON */}
                    <button className="mt-5 w-full bg-[#CFA935] hover:bg-[#b8932f] transition text-white py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                        <span>✨</span>
                        Generate Podcast Audio
                    </button>

                </div>

                {/* RIGHT SIDE */}
                <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-5 space-y-5">

                    {/* TITLE */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#111827]">
                            ⚙ Configuration
                        </span>
                    </div>

                    {/* Gemini Text Model */}
                    <div>
                        <label className="text-xs text-[#6B7280]">Gemini Text Model</label>
                        <select className="w-full mt-1 bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm">
                            <option></option>
                        </select>
                    </div>

                    {/* Gemini TTS Model */}
                    <div>
                        <label className="text-xs text-[#6B7280]">Gemini TTS Model</label>
                        <select className="w-full mt-1 bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm">
                            <option></option>
                        </select>
                    </div>

                    {/* ✅ CREATIVITY (NOW HERE) */}
                    <div>
                        <label className="text-xs text-[#6B7280] flex justify-between">
                            Creativity <span>0 (0)</span>
                        </label>

                        <input
                            type="range"
                            className="w-full mt-6 appearance-none bg-[#E5E7EB] h-[2px] outline-none 
                                   [&::-webkit-slider-thumb]:appearance-none 
                                   [&::-webkit-slider-thumb]:w-0 
                                    [&::-webkit-slider-thumb]:h-0 
                                     [&::-moz-range-thumb]:w-0 
                                    [&::-moz-range-thumb]:h-0"
                        />
                    </div>
                    <div className="w-full h-[2px] bg-[#E5E7EB] mt-2 rounded"></div>

                    {/* Speaker 1 */}
                    <div>
                        <label className="text-xs text-[#6B7280]">Speaker 1 Voice</label>
                        <select className="w-full mt-1 bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm">
                            <option></option>
                        </select>
                    </div>

                    {/* Speaker 2 */}
                    <div>
                        <label className="text-xs text-[#6B7280]">Speaker 2 Voice</label>
                        <select className="w-full mt-1 bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm">
                            <option></option>
                        </select>
                    </div>

                </div>

            </div>


        </div>

    );
}