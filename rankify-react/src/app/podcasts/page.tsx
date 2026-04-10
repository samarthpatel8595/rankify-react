"use client";

import { useState, useEffect } from "react";
import LayoutShell from "@/components/common/LayoutShell";
import {
  generatePodcast,
  fetchModels,
  waitForAudio,
  fetchVoices,
} from "@/services/podcasts";

export default function TextToPodcastPage() {
  const [text, setText] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [ttsModels, setTtsModels] = useState<any[]>([]);
  const [selectedTTS, setSelectedTTS] = useState(
    "gemini-2.5-flash-preview-tts"
  );
  const [textModels, setTextModels] = useState<any[]>([]);
  const [selectedTextModel, setSelectedTextModel] = useState(
    "gemini-3-pro-preview"
  );
  const [voices, setVoices] = useState<any[]>([]);
  const [speaker1, setSpeaker1] = useState("achernar");
  const [speaker2, setSpeaker2] = useState("enceladus");

  // ✅ LOAD MODELS
  useEffect(() => {
    const loadModels = async () => {
      try {
        const data = await fetchModels();
        console.log("MODELS RESPONSE:", data);

        setTtsModels(data?.tts_models || []);
        setTextModels(data?.text_models || []);
      } catch (err) {
        console.log("❌ Models fetch error:", err);
      }
    };

    loadModels();
  }, []);

  // ✅ LOAD VOICES
  useEffect(() => {
    const loadVoices = async () => {
      try {
        const data = await fetchVoices();
        console.log(" VOICES RESPONSE:", data);

        setVoices(data?.voices || []);
      } catch (err) {
        console.log("❌ Voices fetch error:", err);
      }
    };

    loadVoices();
  }, []);

  // ✅ DOWNLOAD AUDIO
  const downloadAudio = async (url: string) => {
    try {
      setDownloading(true);

      console.log("⬇ Downloading from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-api-key": "AICERTS@123",
        },
      });

      console.log("📡 Download response status:", response.status);

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      console.log("Blob size:", blob.size);

      const file = new File([blob], "podcast.mp3", {
        type: "audio/mpeg",
      });

      const blobUrl = window.URL.createObjectURL(file);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "podcast.mp3";

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(blobUrl);

      console.log(" Download completed");
    } catch (err: any) {
      console.log("❌ Download failed:", err);
      alert(err.message);
    } finally {
      setDownloading(false);
    }
  };

  // ✅ GENERATE PODCAST
  const handleGenerate = async () => {
    if (!text.trim()) {
      alert("Please enter some text!");
      return;
    }

    try {
      setLoading(true);

      console.log("Generating podcast...");

      const res = await generatePodcast({
        input_text: text,
        speaker_voices: [speaker1, speaker2],
        num_speakers: 2,
        tts_model: selectedTTS,
        text_model: selectedTextModel,
        temperature: 0.7,
      });

      console.log("API RESPONSE:", res);

      let finalUrl = "";

      console.log("🔍 Checking response...");
      console.log("audio_url 👉", res?.audio_url);
      console.log("audioId 👉", res?.audioId);

      if (res?.audio_url) {
        finalUrl = res.audio_url;
      } else if (res?.audioId) {
        console.log("⏳ Waiting for audio...");
        finalUrl = await waitForAudio(res.audioId);
        console.log("✅ Audio ready:", finalUrl);
      }

      console.log("FINAL URL:", finalUrl);

      if (!finalUrl) {
        throw new Error("Audio URL not found");
      }

      // 🔥 increased delay (important)
      await new Promise((r) => setTimeout(r, 2000));

      await downloadAudio(finalUrl);
    } catch (error: any) {
      console.log("❌ ERROR:", error);
      alert(error.message || "Podcast generation failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {(loading || downloading) && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white px-6 py-5 rounded-xl shadow-lg text-center w-full max-w-sm">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#CFA935] mx-auto mb-3"></div>
            <p className="text-sm font-medium text-[#111827]">
              {loading ? "Generating Podcast..." : "Downloading Podcast..."}
            </p>
          </div>
        </div>
      )}

      <div className="p-3 sm:p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

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
          </div>

          
          <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-4 sm:p-5 space-y-4 sm:space-y-5">
            <div className="text-sm font-medium">⚙ Configuration</div>

            <div>
              <label className="text-xs text-[#6B7280]">
                Gemini Text Model
              </label>
              <select
                value={selectedTextModel}
                onChange={(e) => setSelectedTextModel(e.target.value)}
                className="w-full mt-1 border border-[#E5E7EB] rounded-md px-2 py-1.5 text-sm outline-none focus:outline-none focus:ring-0 focus:border-[#E5E7EB]"
              >
                {textModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-[#6B7280]">
                Gemini TTS Model
              </label>
              <select
                value={selectedTTS}
                onChange={(e) => setSelectedTTS(e.target.value)}
                className="w-full mt-1 border border-[#E5E7EB] rounded-md px-2 py-1.5 text-sm outline-none focus:outline-none focus:ring-0 focus:border-[#E5E7EB]"
              >
                {ttsModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
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
              <select
                value={speaker1}
                onChange={(e) => setSpeaker1(e.target.value)}
                className="w-full mt-1 border border-[#E5E7EB] rounded-md px-2 py-1.5 text-sm outline-none focus:outline-none focus:ring-0 focus:border-[#E5E7EB]"
              >
                {voices.map((voice) => (
                  <option key={voice.id} value={voice.id}>
                    {voice.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-[#6B7280]">
                Speaker 2 Voice
              </label>
              <select
                value={speaker2}
                onChange={(e) => setSpeaker2(e.target.value)}
                className="w-full mt-1 border border-[#E5E7EB] rounded-md px-2 py-1.5 text-sm outline-none focus:outline-none focus:ring-0 focus:border-[#E5E7EB]"
              >
                {voices.map((voice) => (
                  <option key={voice.id} value={voice.id}>
                    {voice.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}