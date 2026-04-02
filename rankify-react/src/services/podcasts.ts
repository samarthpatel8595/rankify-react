export type PodcastRequest = {
  input_text: string;
  speaker_voices: string[];
  num_speakers: number;
  tts_model: string;
  text_model: string;
  temperature: number;
};

export const generatePodcast = async (data: PodcastRequest) => {
  try {
    const res = await fetch("https://podcastapi.aicerts.ai/generate-podcast", {
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

    return {
      ...result,
      source: "real-api",
    };

  } catch (error) {
    console.log("❌ API FAIL → using fallback");

    // 🔥 fallback audio
    return {
      audio_url:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      source: "fallback",
    };
  }
};