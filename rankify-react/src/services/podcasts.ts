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

// ✅ GENERATE PODCAST
export const generatePodcast = async (data: PodcastRequest) => {
  try {
    console.log("📤 PAYLOAD:", data);

    const res = await fetch(`${podcastEndPoint}/generate-podcast`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "AICERTS@123",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

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

// ✅ WAIT FOR AUDIO READY (IMPROVED)
export const waitForAudio = async (audioId: string) => {
  let attempts = 0;

  while (attempts < 20) {
    try {
      console.log(`⏳ Checking audio... ${attempts + 1}`);

      const res = await fetch(`${podcastEndPoint}/audio/${audioId}`, {
        method: "GET",
        headers: {
          "x-api-key": "AICERTS@123",
        },
      });

      // 🔥 IMPORTANT: check content-type
      const contentType = res.headers.get("content-type");

      if (res.ok && contentType?.includes("audio")) {
        console.log("✅ Audio ready!");
        return `${podcastEndPoint}/audio/${audioId}`;
      }

    } catch (err) {
      console.log("Waiting...");
    }

    await new Promise((r) => setTimeout(r, 2000));
    attempts++;
  }

  throw new Error("Audio not ready, try again");
};

// ✅ MODELS
export const fetchModels = async () => {
  try {
    const res = await fetch(`${podcastEndPoint}/tts-models`, {
      headers: {
        "x-api-key": "AICERTS@123",
      },
    });

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch models", error);
    return [];
  }
};

// ✅ VOICES
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