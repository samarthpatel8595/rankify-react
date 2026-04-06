export type ImageRequest = {
  prompt: string;
  num_images: number;
  aspect_ratio?: string;
  resolution?: string;
};

export const generateImages = async (data: ImageRequest) => {
  try {
    const res = await fetch("https://podcastapi.aicerts.ai/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "AICERTS@123",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || "API failed");
    }

    // ✅ Expected response:
    // { images: ["url1", "url2"] }

    return {
      images: result?.images || [],
      source: "real-api",
    };

  } catch (error) {
    console.log("❌ Image API FAIL → using fallback");

    // 🔥 fallback images (testing ke liye)
    return {
      images: [
        "https://picsum.photos/400/300",
        "https://picsum.photos/400/301",
      ],
      source: "fallback",
    };
  }
};