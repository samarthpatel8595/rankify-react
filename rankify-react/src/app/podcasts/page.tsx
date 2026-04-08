"use client";

import { useState } from "react";
import LayoutShell from "@/components/common/LayoutShell";
import { generatePodcast } from "@/services/podcasts";

export default function TextToPodcastPage() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ DOWNLOAD FUNCTION (BEST METHOD)
  const downloadAudio = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "podcast.mp3";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.log("Download failed", err);
    }
  };

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

      let finalUrl = "";

      if (res?.audio_url) {
        finalUrl = res.audio_url;
      } else if (res?.audioId) {
        finalUrl = `https://podcastapi.aicerts.ai/audio/${res.audioId}`;
      }

      if (finalUrl) {
        setAudioUrl(finalUrl);

        // ✅ AUTO DOWNLOAD
        await downloadAudio(finalUrl);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
              <h1 className="text-base sm:text-lg font-semibold text-[#111827]">
                Text to Podcast
              </h1>

              <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                Convert your text into AI-generated podcast audio.
              </p>

              <div className="mt-4 mb-2 text-sm font-medium">
                ✨ Input Content
              </div>

              {/* ✅ TEXTAREA */}
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste article, paper, or notes here"
                className="w-full h-[250px] sm:h-[320px] md:h-[420px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3 sm:p-4 text-sm outline-none resize-none"
              />
            </div>

            {/* ✅ BUTTON */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="mt-4 w-full bg-[#CFA935] hover:bg-[#b8932f] text-white py-3 rounded-lg text-sm font-medium disabled:opacity-50"
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

          {/* RIGHT SIDE */}
          <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-4 sm:p-5 space-y-4 sm:space-y-5">

            <div className="text-sm font-medium">⚙ Configuration</div>

            <div>
              <label className="text-xs text-[#6B7280]">
                Gemini Text Model
              </label>
              <select className="w-full mt-1  border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm">
                <option>gemini-3-pro-preview</option>
                <option>ChatGpt</option>
                <option>Directorai</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-[#6B7280]">
                Gemini TTS Model
              </label>
              <select className="w-full mt-1  border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm">
                <option>gemini-2.5-flash-preview-tts</option>
                <option>ChatGpt</option>
                <option>Directorai</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-[#6B7280]">
                Creativity
              </label>
              <input type="range" className="w-full mt-2" />
            </div>

            <div className="w-full h-[2px] bg-[#E5E7EB]"></div>

            <div>
              <label className="text-xs text-[#6B7280]">
                Speaker 1 Voice
              </label>
              <select className="w-full mt-1 border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm">
                <option>achernar</option>
                <option>enceladus</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-[#6B7280]">
                Speaker 2 Voice
              </label>
              <select className="w-full mt-1 border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm">
                <option>enceladus</option>
                <option>achernar</option>
              </select>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}