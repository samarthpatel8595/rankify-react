"use client";

import { useState, useEffect } from "react";
import LayoutShell from "@/components/common/LayoutShell";
import { generatePodcast, fetchModels } from "@/services/podcasts";
import { fetchVoices } from "@/services/podcasts";

export default function TextToPodcastPage() {
  const [text, setText] = useState("");
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
  const [creativity, setCreativity] = useState(3);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [openTTS, setOpenTTS] = useState(false);
  const [openText, setOpenText] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const data = await fetchModels();
      setTtsModels(data?.tts_models || []);
      setTextModels(data?.text_models || []);
    };
    loadModels();
  }, []);

  useEffect(() => {
    const loadVoices = async () => {
      const data = await fetchVoices();
      setVoices(data?.voices || []);
    };
    loadVoices();
  }, []);

  const downloadAudio = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank"; // important
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        speaker_voices: [speaker1, speaker2],
        num_speakers: 2,
        tts_model: selectedTTS,
        text_model: selectedTextModel,
        temperature: 0.7,
      });

      console.log("API RESPONSE 👉", res);

      // ✅ IMPORTANT: direct audio_url use karo
      if (res?.audio_url) {
        downloadAudio(res.audio_url);
      }
      else {
        alert("Audio not generated");
      }

    } catch (error) {
      alert("Podcast generation failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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

            {/* ❌ No audio UI */}
          </div>

          <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-4 sm:p-5 space-y-4 sm:space-y-5">

            <div className="text-sm font-medium">⚙ Configuration</div>

            <div className="relative">
              <label className="text-xs text-[#6B7280]">
                Gemini Text Model
              </label>

              {/* Button */}
              <button
                onClick={() => setOpenText(!openText)}
                className="w-full mt-1 border border-[#E5E7EB] rounded-md px-2 py-1 text-sm flex justify-between items-center"
              >
                <span>
                  {textModels.find(m => m.id === selectedTextModel)?.name || "Select model"}
                </span>

                {/* Arrow */}
                <svg
                  className={`w-4 h-4 transition-transform ${openText ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown List */}
              {openText && (
                <ul className="absolute w-full mt-1 border border-[#E5E7EB] rounded-md bg-white max-h-40 overflow-y-auto text-xs z-10">
                  {textModels.length > 0 ? (
                    textModels.map((model) => (
                      <li
                        key={model.id}
                        onClick={() => {
                          setSelectedTextModel(model.id);
                          setOpenText(false);
                        }}
                        className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                      >
                        {model.name}
                      </li>
                    ))
                  ) : (
                    <li className="px-2 py-1 text-gray-400">No models found</li>
                  )}
                </ul>
              )}
            </div>

            <div className="relative">
              <label className="text-xs text-[#6B7280]">
                Gemini TTS Model
              </label>

              {/* Button */}
              <button
                onClick={() => setOpenTTS(!openTTS)}
                className="w-full mt-1 border border-[#E5E7EB] rounded-md px-2 py-1 text-sm flex justify-between items-center"
              >
                <span>
                  {ttsModels.find(m => m.id === selectedTTS)?.name || "Select model"}
                </span>

                {/* Arrow */}
                <svg
                  className={`w-4 h-4 transition-transform ${openTTS ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown List */}
              {openTTS && (
                <ul className="absolute w-full mt-1 border border-[#E5E7EB] rounded-md bg-white max-h-40 overflow-y-auto text-xs z-10">
                  {ttsModels.length > 0 ? (
                    ttsModels.map((model) => (
                      <li
                        key={model.id}
                        onClick={() => {
                          setSelectedTTS(model.id);
                          setOpenTTS(false);
                        }}
                        className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                      >
                        {model.name}
                      </li>
                    ))
                  ) : (
                    <li className="px-2 py-1 text-gray-400">Loading...</li>
                  )}
                </ul>
              )}
            </div>

            <div>
              <label className="text-xs text-[#6B7280] flex justify-between">
                <span>Creativity</span>
                <span className="text-[#111827] font-medium">
                  {creativity}
                </span>
              </label>

              <input
                type="range"
                min="0"
                max="7"
                step="1"
                value={creativity}
                onChange={(e) => setCreativity(Number(e.target.value))}
                className="w-full mt-2"
              />
            </div>

            <div className="w-full h-[2px] bg-[#E5E7EB]"></div>

            <div className="relative">
              <label className="text-xs text-[#6B7280]">Speaker 1 Voice</label>

              {/* Button */}
              <button
                onClick={() => setOpen1(!open1)}
                className="w-full mt-1 border border-[#E5E7EB] rounded-md px-2 py-1 text-sm flex justify-between items-center"
              >
                <span>
                  {voices.find(v => v.id === speaker1)
                    ? `${voices.find(v => v.id === speaker1)?.name} (${voices.find(v => v.id === speaker1)?.description})`
                    : "Select voice"}
                </span>

                {/* Arrow */}
                <svg
                  className={`w-4 h-4 transition-transform ${open1 ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown List */}
              {open1 && (
                <ul className="absolute w-full mt-1 border border-[#E5E7EB] rounded-md bg-white max-h-40 overflow-y-auto text-xs z-10">
                  {voices.map((voice) => (
                    <li
                      key={voice.id}
                      onClick={() => {
                        setSpeaker1(voice.id);
                        setOpen1(false);
                      }}
                      className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                    >
                      {voice.name} ({voice.description})
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="relative">
              <label className="text-xs text-[#6B7280]">Speaker 2 Voice</label>

              <button
                onClick={() => setOpen(!open)}
                className="w-full mt-1 border border-[#E5E7EB] rounded-md px-2 py-1 text-sm text-left flex justify-between items-center"
              >
                <span>
                  {voices.find(v => v.id === speaker2)?.name || "Select voice"}
                </span>

                {/* Arrow Icon */}
                <svg
                  className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {open && (
                <ul className="absolute w-full mt-1 border border-[#E5E7EB] rounded-md bg-white max-h-40 overflow-y-auto text-xs z-10">
                  {voices.map((voice) => (
                    <li
                      key={voice.id}
                      onClick={() => {
                        setSpeaker2(voice.id);
                        setOpen(false);
                      }}
                      className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                    >
                      {voice.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}