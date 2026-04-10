"use client";

import { useState } from "react";


export default function ImageGenerationPage() {

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [logo, setLogo] = useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    body: "",
    cta: "",
    num_images: 1,
    aspect_ratio: "",
    resolution: "",
    gemini_model: "",
  });

  const content = [
    form.title,
    form.subtitle,
    form.body,
    form.cta,
  ];

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {

    if (!form.title.trim() || !form.subtitle.trim() || !form.body.trim()) {
      alert("Please fill Title, Subtitle and Body");
      return;
    }

    try {
      setLoading(true);
      setImages([]);

      const payload = {
        content: content,
        num_images: form.num_images,
        aspect_ratio: form.aspect_ratio,
        image_size: form.resolution,
        gemini_model: form.gemini_model || "gemini-3-pro-preview",
        logo: logo ? {
          name: logo.name,
          type: logo.type,
          size: logo.size,
        } : null,
      };

      console.log("📤 REQUEST PAYLOAD:", payload);

      await new Promise((res) => setTimeout(res, 1500));

    } catch (err) {
      console.log("❌ ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = (file: File) => {
    setLogo(file);
  };

  return (
    <>
      {/* LOADER */}
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
            Create high-quality marketing visuals using AI-Powered automative
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="md:col-span-2 space-y-4">

            <div className="bg-white p-4 md:p-5 rounded-xl border border-[#E5E7EB]">

              <h2 className="text-sm font-semibold text-[#374151] mb-4">
                Post Content (STRICT FORMAT)
              </h2>

              <label className="text-xs text-[#6B7280]">TITLE:</label>
              <input
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full mt-1 mb-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
              />

              <label className="text-xs text-[#6B7280]">SUBTITLE:</label>
              <input
                value={form.subtitle}
                onChange={(e) => handleChange("subtitle", e.target.value)}
                className="w-full mt-1 mb-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
              />

              <label className="text-xs text-[#6B7280]">BODY:</label>
              <textarea
                value={form.body}
                onChange={(e) => handleChange("body", e.target.value)}
                className="w-full h-32 mt-1 mb-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
              />

              <label className="text-xs text-[#6B7280]">CTA BUTTON:</label>
              <input
                value={form.cta}
                onChange={(e) => handleChange("cta", e.target.value)}
                className="w-full mt-1 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-[#C9A227] text-white py-3 rounded-xl font-medium disabled:opacity-50"
            >
              {loading ? "Generating..." : "✨ Generate Images"}
            </button>

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

            {/* GEMINI */}
            <label className="text-xs text-[#6B7280]">Gemini Model</label>
            <select
              onChange={(e) => handleChange("gemini_model", e.target.value)}
              className="w-full mt-1 mb-4 border border-[#E5E7EB] rounded-md px-2 py-1.5 text-sm outline-none focus:outline-none focus:ring-0 focus:border-[#E5E7EB] appearance-none bg-white hover:bg-gray-100"
            >
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
              >-</button>

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
              >+</button>
            </div>

            {/* ASPECT */}
            <label className="text-xs text-[#6B7280]">Aspect Ratio</label>
            <select
              onChange={(e) => handleChange("aspect_ratio", e.target.value)}
              className="w-full mt-1 mb-4 border border-[#E5E7EB] rounded-md px-2 py-1.5 text-sm outline-none focus:outline-none focus:ring-0 focus:border-[#E5E7EB] appearance-none bg-white hover:bg-gray-100"
            >
              <option value="1:1">1:1</option>
              <option value="16:9">16:9</option>
            </select>

            {/* RESOLUTION */}
            <label className="text-xs text-[#6B7280]">Image Resolution</label>
            <select
              onChange={(e) => handleChange("resolution", e.target.value)}
              className="w-full mt-1 mb-4 border border-[#E5E7EB] rounded-md px-2 py-1.5 text-sm outline-none focus:outline-none focus:ring-0 focus:border-[#E5E7EB] appearance-none bg-white hover:bg-gray-100"
            >
              <option value="512">512</option>
              <option value="1024">1024</option>
            </select>

            {/* UPLOAD */}
            <label className="text-xs text-[#6B7280]">Upload Logo (Optional)</label>

            <div
              className="mt-2 border-2 border-dashed border-[#E5E7EB] rounded-xl p-6 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files[0]) {
                  handleLogoUpload(e.dataTransfer.files[0]);
                }
              }}
            >
              <p className="text-sm text-[#6B7280]">
                Drag and drop file here
              </p>
              <p className="text-xs text-[#9CA3AF] mt-1">
                Limit 200MB per file • PNG, JPG
              </p>
            </div>

            <button
              onClick={() => document.getElementById("logoInput")?.click()}
              className="w-full mt-3 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg py-2 text-sm text-[#374151] hover:bg-gray-200"
            >
              Browse files
            </button>

            <input
              id="logoInput"
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleLogoUpload(e.target.files[0]);
                }
              }}
            />

            {logo && (
              <div className="mt-3">
                <p className="text-xs text-[#6B7280] mb-1">Preview:</p>
                <img
                  src={URL.createObjectURL(logo)}
                  alt="logo"
                  className="w-24 h-24 object-contain border rounded-md"
                />
                <p className="text-xs mt-2 text-[#6B7280]">
                  {logo.name}
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}