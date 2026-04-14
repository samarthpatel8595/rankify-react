"use client";

import { useState, useEffect } from "react";
import {generateImages} from "@/services/image";


export default function ImageGenerationPage() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [logo, setLogo] = useState<File | null>(null);
  const [models, setModels] = useState<any[]>([]); //

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

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ FETCH MODELS
 useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch("https://imgapi.aicerts.ai/api/models", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });
 
        if (!res.ok) {
          throw new Error("Failed to fetch models");
        }
 
        const data = await res.json();
 
        console.log("API RESPONSE:", data);
 
        const modelList = Array.isArray(data?.models) ? data.models : [];
 
        setModels(modelList);
 
        if (modelList.length > 0) {
          setForm((prev) => ({
            ...prev,
            gemini_model: modelList[0].model_name,
          }));
        }
 
      } catch (err) {
        console.log("ERROR:", err);
      }
    };
 
    fetchModels();
  }, []);
  const handleGenerate = async () => {
    if (!form.title.trim() || !form.subtitle.trim() || !form.body.trim()) {
      alert("Please fill Title, Subtitle and Body");
      return;
    }

    try {
      setLoading(true);
      setImages([]);

      const payload = {
        prompt: `
Title: ${form.title}
Subtitle: ${form.subtitle}
Body: ${form.body}
CTA: ${form.cta}
        `,
        model: form.gemini_model || "gemini-3-pro-preview",
        image_size: form.resolution,
        aspect_ratio: form.aspect_ratio,
      };

      console.log("📤 REQUEST PAYLOAD:", payload);

      const res = await generateImages(payload);

      console.log("📥 RESPONSE:", res);

      setImages(res.images || res.data || []);
    } catch (err) {
      console.log("❌ ERROR:", err);
      alert("Image generation failed");
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
                className="w-full mt-1 border border-[#E5E7EB] rounded-md px-2 py-1.5 text-sm outline-none focus:outline-none focus:ring-0 focus: border-[#E5E7EB]"
              />

              <label className="text-xs text-[#6B7280]">SUBTITLE:</label>
              <input
                value={form.subtitle}
                onChange={(e) => handleChange("subtitle", e.target.value)}
                className="w-full mt-1 border border-[#E5E7EB] rounded-md px-2 py-1.5 text-sm outline-none focus:outline-none focus:ring-0 focus: border-[#E5E7EB]"
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
                className="w-full mt-1 border border-[#E5E7EB] rounded-md px-2 py-1.5 text-sm outline-none focus:outline-none focus:ring-0 focus: border-[#E5E7EB]"
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

            {/* ✅ Dynamic Dropdown */}
            <label className="text-xs text-[#6B7280]">Gemini Model</label>
            <select
              value={form.gemini_model}
              onChange={(e) => handleChange("gemini_model", e.target.value)}
              className="w-full mt-1 border border-[#E5E7EB] rounded-md px-2 py-1.5 text-sm outline-none focus:outline-none focus:ring-0 focus: border-[#E5E7EB]"
            >
              {Array.isArray(models) && models.length > 0 ? (
                models.map((m, i) => (
                  <option key={i} value={m.model_name}>
                    {m.model_name}
                  </option>
                ))
              ) : (
                <option>Loading...</option>
              )}
            </select>


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

            <label className="text-xs text-[#6B7280]">Aspect Ratio</label>
            <select
              onChange={(e) => handleChange("aspect_ratio", e.target.value)}
              className="w-full mt-1 border border-[#E5E7EB] rounded-md px-2 py-1.5 text-sm outline-none focus:outline-none focus:ring-0 focus: border-[#E5E7EB]"
            >
              <option value="1:1">1:1</option>
              <option value="16:9">16:9</option>
            </select>

            <label className="text-xs text-[#6B7280]">Image Resolution</label>
            <select
              onChange={(e) => handleChange("resolution", e.target.value)}
              className="w-full mt-1 border border-[#E5E7EB] rounded-md px-2 py-1.5 text-sm outline-none focus:outline-none focus:ring-0 focus: border-[#E5E7EB]"
            >
              <option value="512">512</option>
              <option value="1024">1024</option>
            </select>

            <label className="text-xs text-[#6B7280]">
              Upload Logo (Optional)
            </label>

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
              className="w-full mt-3 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg py-2 text-sm hover:bg-gray-200"
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