"use client";
 
import { useEffect, useState } from "react";
import { fetchImageConfig, fetchImageModels, generateImages } from "@/services/image";
 
export default function ImageGenerationPage() {
 
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [logo, setLogo] = useState<File | null>(null);
  const [sizes, setSizes] = useState<string[]>([]);
  const [ratios, setRatios] = useState<string[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [errors, setErrors] = useState<any>({});
  const downloadImage = async (url: string, index: number) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
 
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `generated-${index + 1}.png`;
 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };
  const validateForm = () => {
    let newErrors: any = {};
 
    if (!form.cta.trim()) {
      newErrors.cta = true;
    }
 
    if (!form.title.trim()) {
      newErrors.title = true;
    }
 
    if (!form.subtitle.trim()) {
      newErrors.subtitle = true;
    }
 
    if (!form.body.trim()) {
      newErrors.body = true;
    }
 
    if (form.num_images < 1 || form.num_images > 10) {
      newErrors.num_images = true;
    }
 
    setErrors(newErrors);
 
    return Object.keys(newErrors).length === 0;
  };
 
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
  useEffect(() => {
    const load = async () => {
      try {
        const [modelsRes, configRes] = await Promise.all([
          fetchImageModels(),
          fetchImageConfig(),
        ]);
 
        console.log("models:", modelsRes);
        console.log("config:", configRes);
 
        // MODELS
        setModels(modelsRes?.models ?? []);
 
        // RATIOS (safe fallback)
        setRatios(
          configRes?.aspect_ratios ??
          configRes?.ratios ??
          []
        );
 
        // SIZES (safe fallback)
        setSizes(
          configRes?.image_sizes ??
          configRes?.sizes ??
          []
        );
 
      } catch (err: any) {
        console.log("API ERROR:", err);
 
        // ✅ fallback so UI never breaks
        setModels([]);
        setRatios([]);
        setSizes([]);
      }
    };
 
    load();
  }, []);
 
  const content = {
    title: form.title,
    subtitle: form.subtitle,
    body: form.body,
    cta: form.cta,
  }
    ;
 
  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
 
  const handleGenerate = async () => {
 
    const isValid = validateForm();
 
    if (!isValid) return;
 
 
    try {
      setLoading(true);
      setImages([]);
 
      // -----------------------------
      // BUILD PAYLOAD (API FORMAT)
      // -----------------------------
      const payload = {
        content: `${form.title}/${form.subtitle}/${form.body}/${form.cta}`,
        model_name: form.gemini_model || "gemini-3-pro-image-preview",
        num_images: String(form.num_images), // ⚠️ must be string
        aspect_ratio: form.aspect_ratio,
        image_size: form.resolution,
        // or remove if not needed
      };
 
      console.log("📤 REQUEST PAYLOAD:", payload);
 
      // -----------------------------
      // REAL API CALL 🔥
      // -----------------------------
      const res = await generateImages(payload);
 
      console.log("📥 API RESPONSE:", res);
 
      // -----------------------------
      // HANDLE RESPONSE SAFELY
      // -----------------------------
      if (Array.isArray(res)) {
        // API returned array of objects
        const imageUrls = res.map((item: any) => item.url);
 
        setImages(imageUrls);
 
        // 🔥 AUTO DOWNLOAD
        imageUrls.forEach((url: string, index: number) => {
          downloadImage(url, index);
        });
 
      } else if (res?.images?.length) {
        setImages(res.images);
 
        res.images.forEach((url: string, index: number) => {
          downloadImage(url, index);
        });
 
      } else if (res?.data?.length) {
        setImages(res.data);
 
        res.data.forEach((url: string, index: number) => {
          downloadImage(url, index);
        });
 
      } else {
        console.warn("Unexpected response:", res);
        alert("No images returned from API");
      }
    } catch (err) {
      console.error("❌ GENERATION ERROR:", err);
      alert("Image generation failed. Check console.");
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
                className={`w-full mt-1 mb-1 bg-[#F3F4F6] border rounded-lg px-3 py-2 text-sm ${errors.title ? "border-red-500" : "border-[#E5E7EB]"
                  }`}
              />
 
              {errors.title && (
                <p className="text-red-500 text-xs mb-3">
                  Title is required
                </p>
              )}
 
              <label className="text-xs text-[#6B7280]">SUBTITLE:</label>
 
              <input
                value={form.subtitle}
                onChange={(e) => handleChange("subtitle", e.target.value)}
                className={`w-full mt-1 mb-1 bg-[#F3F4F6] border rounded-lg px-3 py-2 text-sm ${errors.subtitle ? "border-red-500" : "border-[#E5E7EB]"
                  }`}
              />
 
              {errors.subtitle && (
                <p className="text-red-500 text-xs mb-3">
                  Subtitle is required
                </p>
              )}
 
              <label className="text-xs text-[#6B7280]">BODY:</label>
 
              <textarea
                value={form.body}
                onChange={(e) => handleChange("body", e.target.value)}
                className={`w-full h-32 mt-1 mb-1 bg-[#F3F4F6] border rounded-lg px-3 py-2 text-sm ${errors.body ? "border-red-500" : "border-[#E5E7EB]"
                  }`}
              />
 
              {errors.body && (
                <p className="text-red-500 text-xs mb-3">
                  Body is required
                </p>
              )}
 
              <label className="text-xs text-[#6B7280]">CTA BUTTON:</label>
              <input
                value={form.cta}
                onChange={(e) => handleChange("cta", e.target.value)}
                className={`w-full mt-1 bg-[#F3F4F6] border rounded-lg px-3 py-2 text-sm ${errors.cta ? "border-red-500" : "border-[#E5E7EB]"
                  }`}
              />
 
              {errors.cta && (
                <p className="text-red-500 text-xs mt-1">
                  CTA is required
                </p>
              )}
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
                {images.map((img: string, i: number) => (
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
              value={form.gemini_model}
              onChange={(e) => handleChange("gemini_model", e.target.value)}
              className="w-full mt-1 border border-[#E5E7EB] rounded-md px-2 py-1.5 text-sm outline-none focus:outline-none focus:ring-0 focus: border-[#E5E7EB]"
            >
              <option value="">Select Model</option>
 
              {models.length === 0 && (
                <option disabled>Loading models...</option>
              )}
 
              {models.map((m, i) => (
                <option key={i} value={m.model_name}>
                  {m.model_name}
                </option>
              ))}
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
                  handleChange("num_images", Math.min(10, form.num_images + 1))
                }
                className="w-8 h-8 border border-[#E5E7EB] rounded-md"
              >+</button>
            </div>
 
            {/* ASPECT */}
            <label className="text-xs text-[#6B7280]">Image Resolution</label>
 
            <select
              value={form.resolution}
              onChange={(e) => handleChange("resolution", e.target.value)}
              className="w-full mt-1 border border-[#E5E7EB] rounded-md px-2 py-1.5 text-sm outline-none focus:outline-none focus:ring-0 focus: border-[#E5E7EB]"
            >
              <option value="">Select Resolution</option>
 
              {sizes.length === 0 && (
                <option disabled>Loading sizes...</option>
              )}
 
              {sizes.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
 
            {/* RESOLUTION */}
            <label className="text-xs text-[#6B7280]">Aspect Ratio</label>
 
            <select
              value={form.aspect_ratio}
              onChange={(e) => handleChange("aspect_ratio", e.target.value)}
              className="w-full mt-1 border border-[#E5E7EB] rounded-md px-2 py-1.5 text-sm outline-none focus:outline-none focus:ring-0 focus: border-[#E5E7EB]"
            >
              <option value="">Select Aspect Ratio</option>
 
              {ratios.length === 0 && (
                <option disabled>Loading ratios...</option>
              )}
 
              {ratios.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
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