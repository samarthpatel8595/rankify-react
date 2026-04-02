"use client";

import { useState } from "react";
import LayoutShell from "@/components/common/LayoutShell";
import { generatePodcast } from "@/services/podcasts";

export default function TextToPodcastPage() {

    // ✅ STATE (STEP 4)
    const [text, setText] = useState("");
    const [audioUrl, setAudioUrl] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ FUNCTION (STEP 5)
    const handleGenerate = async () => {
        try {
            setLoading(true);

            const res = await generatePodcast({
                input_text: text,
                speaker_voices: ["achernar", "enceladus"],
                num_speakers: 2,
                tts_model: "gemini-2.5-flash-preview-tts",
                text_model: "gemini-3-pro-preview",
                temperature: 0.7,
            });

            console.log("API RESPONSE:", res);

            // ✅ SET AUDIO
            if (res?.audio_url) {
                setAudioUrl(res.audio_url);
            } else if (res?.audioId) {
                setAudioUrl(`https://podcastapi.aicerts.ai/audio/${res.audioId}`);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="p-2 space-y-6">

            <div className="grid grid-cols-3 gap-6">

                {/* LEFT SIDE */}
                <div className="col-span-2 bg-white border border-[#E5E7EB] rounded-xl p-5 flex flex-col justify-between">

                    <div>
                        <h1 className="text-[18px] font-semibold text-[#111827]">
                            Text to Podcast
                        </h1>

                        <p className="text-[13px] text-[#6B7280] mt-1">
                            Lorem Ipsum is simply dummy text.
                        </p>

                        <div className="mt-5 mb-3 text-sm font-medium">
                            ✨ Input Content
                        </div>

                        {/* ✅ TEXTAREA CONNECTED */}
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Paste article, paper, or notes here"
                            className="w-full h-[420px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 text-sm outline-none resize-none"
                        />
                    </div>

                    {/* ✅ BUTTON CONNECTED */}
                    <button
                        onClick={handleGenerate}
                        className="mt-5 w-full bg-[#CFA935] hover:bg-[#b8932f] text-white py-3 rounded-lg text-sm font-medium"
                    >
                        {loading ? "Generating..." : "✨ Generate Podcast Audio"}
                    </button>

                    {/* ✅ AUDIO PLAYER */}
                    {audioUrl && (
                        <audio controls className="mt-4 w-full">
                            <source src={audioUrl} />
                        </audio>
                    )}

                </div>

                {/* RIGHT SIDE (UNCHANGED UI) */}
                <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-5 space-y-5">

                    <div className="text-sm font-medium">⚙ Configuration</div>

                    <div>
                        <label className="text-xs text-[#6B7280]">Gemini Text Model</label>
                        <select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm">
                            <option>gemini-3-pro-preview</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-xs text-[#6B7280]">Gemini TTS Model</label>
                        <select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm">
                            <option>gemini-2.5-flash-preview-tts</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-xs text-[#6B7280]">Creativity</label>
                        <input type="range" className="w-full mt-2" />
                    </div>

                    <div className="w-full h-[2px] bg-[#E5E7EB]"></div>

                    <div>
                        <label className="text-xs text-[#6B7280]">Speaker 1 Voice</label>
                        <select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm">
                            <option>achernar</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-xs text-[#6B7280]">Speaker 2 Voice</label>
                        <select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm">
                            <option>enceladus</option>
                        </select>
                    </div>

                </div>

            </div>

        </div>
    );
}