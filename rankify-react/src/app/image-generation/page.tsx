"use client";

import { useEffect, useState } from "react";
import { fetchImageConfig, fetchImageModels, generateImage } from "@/services/image";

export default function ImageGenerationPage() {

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<{ url: string; filename?: string }[]>([]);
  const [logo, setLogo] = useState<File | null>(null);
  const [sizes, setSizes] = useState<string[]>([]);
  const [ratios, setRatios] = useState<string[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [errors, setErrors] = useState<any>({});
  const downloadImageFromUrl = (url: string, filename: string) => {
    try {
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.target = "_blank"; // fallback support

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

    // ✅ ADD THESE 3 LINES
    if (!form.gemini_model) {
      newErrors.gemini_model = true;
    }

    if (!form.aspect_ratio) {
      newErrors.aspect_ratio = true;
    }

    if (!form.resolution) {
      newErrors.resolution = true;
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
  };

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const triggerDownloadLink = (href: string, filename: string) => {
    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  // const downloadImageFromUrl = async (url: string, filename: string) => {
  //   const response = await fetch(url, { mode: "cors" });
  //   if (!response.ok) throw new Error("Download failed");
  //   const blob = await response.blob();
  //   const objectUrl = URL.createObjectURL(blob);
  //   triggerDownloadLink(objectUrl, filename);
  //   URL.revokeObjectURL(objectUrl);
  // };

  const handleGenerate = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    // try {
    //   setLoading(true);
    //   setImages([]);

    //   const payload = {
    //     content: `${form.title}/${form.subtitle}/${form.body}/${form.cta}`,
    //     model_name: form.gemini_model,
    //     num_images: String(form.num_images),
    //     aspect_ratio: form.aspect_ratio,
    //     image_size: form.resolution,

    //   };

    //   const res = await generateImage(payload);

    //   // ✅ NORMALIZE RESPONSE → ALWAYS OBJECT[]
    //   let images: { url: string; filename?: string }[] = [];

    //   if (Array.isArray(res)) {
    //     images = res;
    //   } else if (res?.images) {
    //     images = res.images;
    //   } else if (res?.data) {
    //     images = res.data;
    //   }

    //   if (!images.length) {
    //     alert("No images returned");
    //     return;
    //   }

    //   setImages(images); // ✅ store full objects

    //   // ✅ DOWNLOAD ONE BY ONE
    //   for (let i = 0; i < images.length; i++) {
    //     const img = images[i];

    //     await downloadImageFromUrl(
    //       img.url,
    //       img.filename ?? `generated-${i + 1}.png`
    //     );

    //     // prevent browser blocking
    //     await new Promise((res) => setTimeout(res, 300));
    //   }

    // } catch (err) {
    //   console.error("❌ ERROR:", err);
    //   alert("Image generation failed");
    // } finally {
    //   setLoading(false);
    // }
    try {
      const payload = {
        content: `${form.title}/${form.subtitle}/${form.body}/${form.cta}`,
        model_name: form.gemini_model,
        num_images: String(form.num_images),
        aspect_ratio: form.aspect_ratio,
        image_size: form.resolution,

      };
      const response = await generateImage(payload);  //replace this with you actuall api calling
      const images =
        response.images ??
        (response.data as { images?: { url: string; filename?: string }[] } | undefined)
          ?.images ??
        [];
      if (!images.length) return;
      for (let index = 0; index < images.length; index += 1) {
        const image = images[index];
        await downloadImageFromUrl(
          image.url,
          image.filename ?? `generated-image-${index + 1}.png`
        );
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
      console.log("Images downloaded successfully.");
    } catch (error) {
      console.error("Download failed. Please enable downloads or try again.");
    } finally {
      setLoading(false);
    }


    // const downloadImageFromUrl = async (url: string, filename: string) => {
    //     const response = await fetch(url, { mode: "cors" });
    //     if (!response.ok) throw new Error("Download failed");
    //     const blob = await response.blob();
    //     const objectUrl = URL.createObjectURL(blob);
    //     triggerDownloadLink(objectUrl, filename);
    //     URL.revokeObjectURL(objectUrl);
    //   };

  }; const handleLogoUpload = (file: File) => {
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

            {/* {images.length > 0 && (
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
            )} */}

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
              className={`w-full mt-1 border rounded-md px-2 py-1.5 text-sm outline-none
    ${errors.gemini_model ? "border-red-500" : "border-[#E5E7EB]"}`}
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
            {errors.gemini_model && (
              <p className="text-red-500 text-xs mt-1">
                Model is required
              </p>
            )}

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
              className={`w-full mt-1 border rounded-md px-2 py-1.5 text-sm 
    ${errors.resolution ? "border-red-500" : "border-[#E5E7EB]"}`}
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
            {errors.resolution && (
              <p className="text-red-500 text-xs mt-1">Resolution is required</p>
            )}


            <label className="text-xs text-[#6B7280]">Aspect Ratio</label>

            <select
              value={form.aspect_ratio}
              onChange={(e) => handleChange("aspect_ratio", e.target.value)}
              className={`w-full mt-1 border rounded-md px-2 py-1.5 text-sm 
    ${errors.aspect_ratio ? "border-red-500" : "border-[#E5E7EB]"}`}
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
            {errors.aspect_ratio && (
              <p className="text-red-500 text-xs mt-1">Aspect ratio is required</p>
            )}

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