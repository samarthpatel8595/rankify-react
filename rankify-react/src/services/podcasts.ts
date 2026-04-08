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

// ✅ GENERATE PODCAST
export const generatePodcast = async (
  data: PodcastRequest
): Promise<PodcastResponse> => {
  try {
    const res = await fetch(
      "https://podcastapi.aicerts.ai/generate-podcast",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "AICERTS@123",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || "API failed");
    }

    return {
      ...result,
      source: "real-api",
    };
  } catch (error) {
    console.log("❌ API FAIL → using fallback", error);

    return {
      audio_url:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      source: "fallback",
    };
  }
};

export const fetchModels = async () => {
  try {
    const res = await fetch("https://podcastapi.aicerts.ai/tts-models", {
      headers: {
        "x-api-key": "AICERTS@123",
      },
    });

    const data = await res.json();

    console.log("TTS API RAW 👉", data);

    return {
      tts_models: Array.isArray(data) ? data : data?.tts_models || [],
      text_models: [
        {
          id: "gemini-3-pro-preview",
          name: "Gemini 3 Pro Preview",
        },
      ],
    };

  } catch (error) {
    console.log("❌ Failed to fetch models", error);

    return {
      tts_models: [
        {
          id: "gemini-2.5-flash-preview-tts",
          name: "Gemini 2.5 Flash TTS",
        },
      ],
      text_models: [
        {
          id: "gemini-3-pro-preview",
          name: "Gemini 3 Pro Preview",
        },
      ],
    };
  }
};
export const fetchVoices = async () => {
  try {
    const res = await fetch("https://podcastapi.aicerts.ai/voices", {
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