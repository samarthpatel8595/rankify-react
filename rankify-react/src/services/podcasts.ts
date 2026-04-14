export type PodcastRequest = {
  input_text: string;
  speaker_voices: string[];
  num_speakers: number;
  
  tts_model: string;
  text_model: string;
  temperature: number;
};

export type PodcastResponse = {
  audio_url?: string;
  audioId?: string;
  source?: string;
};

const podcastEndPoint = process.env.NEXT_PUBLIC_PODCAST_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_PODCAST_X_API_KEY;

export const generatePodcast = async (data: PodcastRequest) => {
  try {
    console.log("📤 PAYLOAD:", data);

    const res = await fetch(`${podcastEndPoint}/generate-podcast`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY || "",
      },
      body: JSON.stringify(data),
    });

    console.log("📡 STATUS:", res.status);

    const textResponse = await res.text();
    console.log("📥 RAW RESPONSE:", textResponse);

    let result;
    try {
      result = JSON.parse(textResponse);
    } catch {
      throw new Error("Invalid JSON response from API");
    }

    if (!res.ok) {
      console.log("❌ ERROR RESPONSE:", result);
      throw new Error(result?.message || "Podcast generation failed");
    }

    console.log("✅ SUCCESS:", result);

    return result;

  } catch (error) {
    console.log("❌ Generate Podcast Error:", error);
    throw error;
  }
};
export const fetchModels = async () => {
  try {
    const res = await fetch(`${podcastEndPoint}/tts-models`, {
      headers: {
        "x-api-key": "AICERTS@123",
      },
    });

    const data = await res.json();

    // ✅ assume API returns mixed models
    return data;

  } catch (error) {
    console.log("Failed to fetch models", error);
    return [];
  }
};
export const fetchVoices = async () => {
  try {
    const res = await fetch(`${podcastEndPoint}/voices`, {
      headers: {
        "x-api-key": "AICERTS@123",
      },
    });

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch voices", error);
    return { voices: [] };
  }
};
