"use client";

import { useState } from "react";
import LayoutShell from "@/components/common/LayoutShell";
import { generatePodcast } from "@/services/podcasts";

export default function TextToPodcastPage() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0.7);


  const handleGenerate = async () => {
    if (!text.trim()) {
      alert("Please enter some text!");
      return;
    }

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
    <>
      {/* ✅ HEADER */}
      <div className="px-4 sm:px-6 pt-4 pb-2">
        <div className="flex items-center gap-3">
          
          {/* 🎧 EXACT SVG FROM YOUR LINK */}
          <div className="w-10 h-10 flex items-center justify-center bg-[#FFF7E6] rounded-lg">
            <img
              src="https://app.rankify365.ai/icons/podcast-icon-gold.svg"
              alt="podcast"
              className="w-5 h-5"
            />
          </div>

          {/* TEXT */}
          <div>
            <h1 className="text-base sm:text-lg font-semibold text-[#111827]">
              Text → Podcast → Multi-Speaker Audio
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Convert your content into conversational podcasts with AI-generated voices.
            </p>
          </div>
        </div>
      </div>

      {/* ✅ LOADER */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white px-6 py-5 rounded-xl shadow-lg text-center w-full max-w-sm">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#CFA935] mx-auto mb-3"></div>
            <p className="text-sm font-medium text-[#111827]">
              Generating Podcast...
            </p>
          </div>
        </div>
      )}

      {/* ✅ MAIN UI */}
      <div className="p-3 sm:p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-xl p-4 sm:p-5 flex flex-col justify-between">

            <div>
              <div className="mt-2 mb-2 text-sm font-medium">
                ✨ Input Content
              </div>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste article, paper, or notes here"
                className="w-full h-[250px] sm:h-[320px] md:h-[420px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3 sm:p-4 text-sm outline-none resize-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="mt-4 w-full bg-[#CFA935] hover:bg-[#b8932f] text-white py-3 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {loading ? "Generating..." : "✨ Generate Podcast Audio"}
            </button>

            {audioUrl && (
              <audio controls className="mt-4 w-full">
                <source src={audioUrl} />
              </audio>
            )}
          </div>

          {/* RIGHT SIDE CONFIG */}
          <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-4 sm:p-5 space-y-4 sm:space-y-5">

            {/* ⚙ CONFIG HEADER */}
            <div className="flex items-center gap-2 text-sm font-medium">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 6H14" stroke="#CFA935" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="18" cy="6" r="2" fill="#CFA935"/>

                <path d="M4 12H10" stroke="#CFA935" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="14" cy="12" r="2" fill="#CFA935"/>

                <path d="M4 18H18" stroke="#CFA935" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="8" cy="18" r="2" fill="#CFA935"/>
              </svg>
              Configuration
            </div>

            <div>
              <label className="text-xs text-[#6B7280]">
                Gemini Text Model
              </label>
              <select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm">
                <option>gemini-3-pro-preview</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-[#6B7280]">
                Gemini TTS Model
              </label>
              <select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm">
                <option>gemini-2.5-flash-preview-tts</option>
              </select>
            </div>

            <div>
      {/* TOP LABEL + VALUE */}
      <div className="flex justify-between items-center">
        <label className="text-xs text-[#6B7280]">
          Creativity
        </label>
        <span className="text-xs text-[#6B7280]">
          {value.toFixed(1)} (0-1)
        </span>
      </div>

      {/* SLIDER */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
        className="w-full mt-2 accent-[#CFA935] cursor-pointer"
      />
    </div>

            <div>
              <label className="text-xs text-[#6B7280]">
                Speaker 1 Voice
              </label>
              <select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm">
                <option>achernar</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-[#6B7280]">
                Speaker 2 Voice
              </label>
              <select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm">
                <option>enceladus</option>
              </select>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}