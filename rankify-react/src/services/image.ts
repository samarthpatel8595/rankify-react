const BASE_URL = process.env.NEXT_PUBLIC_IMG_API_BASE_URL;
type GenerateImagePayload = {
  prompt: string;
  model: string;
  image_size?: string;
  aspect_ratio?: string;
};
 
export const generateImages = async (payload: GenerateImagePayload) => {
  try {
    const res = await fetch(`${BASE_URL}/generate-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
 
    if (!res.ok) {
      throw new Error("Failed to generate image");
    }
 
    return await res.json();
  } catch (error) {
    console.error("Image API Error:", error);
    throw error;
  }
};
