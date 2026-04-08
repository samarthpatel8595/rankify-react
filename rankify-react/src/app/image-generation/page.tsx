"use client";

import { useState } from "react";
import { generateImages } from "@/services/image";
import { toUSVString } from "util";
import { GitGraph } from "lucide-react";

export default function ImageGenerationPage() {

  // ✅ STATES
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const [form, setForm] = useState({
    title: "Future-Proof Your Career with AI CERTs®",
    subtitle: "Become Certified. Become AI-Ready.",
    body: "",
    cta: "Start Now",
    num_images: 1,
    aspect_ratio: "",
    resolution: "",
  });

  // ✅ HANDLE INPUT
  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ GENERATE IMAGES
  const handleGenerate = async () => {

    // 🔥 VALIDATION
    if (!form.title.trim() || !form.subtitle.trim() || !form.body.trim()) {
      alert("Please fill Title, Subtitle and Body");
      return;
    }

    try {
      setLoading(true);

      // 🔥 CLEAR OLD IMAGES
      setImages([]);

      // 🔥 PROMPT BUILD
      const prompt = `
Create a UNIQUE and HIGH-QUALITY marketing poster.

TEXT CONTENT (must be visible exactly):
- Title: "${form.title}"
- Subtitle: "${form.subtitle}"
- Body: "${form.body}"
- CTA Button: "${form.cta}"

STRICT RULES:
- Use EXACT text given above
- Do NOT generate random/default text
- Clean modern layout
- Proper spacing and alignment

Design Style:
- modern UI
- futuristic AI theme
- glowing elements
- premium look
- high contrast
- sharp typography
`;

      const res = await generateImages({
        prompt,
        num_images: form.num_images,
        aspect_ratio: form.aspect_ratio,
        resolution: form.resolution,
        seed: Date.now(), // 🔥 force new image
      });

      console.log("IMAGE API:", res);

      if (res?.images) {
        setImages(res.images);
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ LOADER */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white px-6 py-5 rounded-xl shadow-lg text-center">
            <div className="animate-spin h-10 w-10 border-b-2 border-[#C9A227] mx-auto mb-3 rounded-full"></div>
            <p>Generating Images...</p>
          </div>
        </div>
      )}

      <div className="p-3 md:p-6 space-y-6">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-[20px] md:text-[22px] font-semibold text-[#111827]">
            Image Generation
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Create AI-powered marketing posters instantly.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="md:col-span-2 space-y-4">

            <div className="bg-white p-4 md:p-5 rounded-xl border border-[#E5E7EB]">

              <h2 className="text-sm font-semibold text-[#374151] mb-4">
                Post Content (STRICT FORMAT)
              </h2>

              {/* TITLE */}
              <label className="text-xs text-[#6B7280]">TITLE:</label>
              <input
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full mt-1 mb-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
              />

              {/* SUBTITLE */}
              <label className="text-xs text-[#6B7280]">SUBTITLE:</label>
              <input
                value={form.subtitle}
                onChange={(e) => handleChange("subtitle", e.target.value)}
                className="w-full mt-1 mb-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
              />

              {/* BODY */}
              <label className="text-xs text-[#6B7280]">BODY:</label>
              <textarea
                value={form.body}
                onChange={(e) => handleChange("body", e.target.value)}
                className="w-full h-32 mt-1 mb-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
              />

              {/* CTA */}
              <label className="text-xs text-[#6B7280]">CTA BUTTON:</label>
              <input
                value={form.cta}
                onChange={(e) => handleChange("cta", e.target.value)}
                className="w-full mt-1 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-[#C9A227] text-white py-3 rounded-xl font-medium disabled:opacity-50"
            >
              {loading ? "Generating..." : "✨ Generate Images"}
            </button>

            {/* ✅ IMAGE OUTPUT */}
            {images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="generated"
                    className="rounded-xl border border-[#E5E7EB]"
                  />
                ))}
              </div>
            )}

          </div>

          {/* RIGHT */}
          <div className="bg-white p-4 md:p-5 rounded-xl border border-[#E5E7EB]">

            <h2 className="text-sm font-semibold text-[#374151] mb-4">
              ✨ Configuration
            </h2>

            {/* MODEL */}
            <label className="text-xs text-[#6B7280]">Gemini Model</label>
            <select className="w-full mt-1 mb-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm">
              <option>Gemini 3 Pro Image Premium Gener</option>
            </select>

            {/* NUMBER */}
            <label className="text-xs text-[#6B7280]">Number of Images</label>
            <div className="flex items-center gap-2 mt-1 mb-4">
              <button
                onClick={() =>
                  handleChange("num_images", Math.max(1, form.num_images - 1))
                }
                className="w-8 h-8 border border-[#E5E7EB] rounded-md"
              >
                -
              </button>

              <input
                value={form.num_images}
                readOnly
                className="flex-1 border border-[#E5E7EB] rounded-lg text-center py-1 bg-[#F3F4F6]"
              />

              <button
                onClick={() =>
                  handleChange("num_images", form.num_images + 1)
                }
                className="w-8 h-8 border border-[#E5E7EB] rounded-md"
              >
                +
              </button>
            </div>

            {/* ASPECT */}
            <label className="text-xs text-[#6B7280]">Aspect Ratio</label>
            <select
              onChange={(e) =>
                handleChange("aspect_ratio", e.target.value)
              }
              className="w-full mt-1 mb-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
            >
              <option value=""></option>
              <option value="1:1">1:1</option>
              <option value="16:9">16:9</option>
            </select>

            {/* RESOLUTION */}
            <label className="text-xs text-[#6B7280]">Image Resolution</label>
            <select
              onChange={(e) =>
                handleChange("resolution", e.target.value)
              }
              className="w-full mt-1 mb-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
            >
              <option value=""></option>
              <option value="512">512</option>
              <option value="1024">1024</option>
            </select>

          </div>
        </div>
      </div>
    </>
  );
}