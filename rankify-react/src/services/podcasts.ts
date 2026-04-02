// services/podcasts.ts

import { apiRequest } from "./index";

// Types
export type Voice = {
  id: string;
  name: string;
};

export type PodcastRequest = {
  input_text: string;
  speaker_voices: string[];
  num_speakers: number;
  tts_model: string;
  text_model: string;
  temperature: number;
};

// Common headers
const headers = {
  "x-api-key": "AICERTS@123",
  "Content-Type": "application/json",
};

// 1️⃣ Get Voices
const getVoices = async () =>
  apiRequest({
    method: "GET",
    url: `https://podcastapi.aicerts.ai/voices`,
    headers,
  });

// 2️⃣ Get Voice Sample
const getVoiceSample = async (voiceId: string) =>
  apiRequest({
    method: "GET",
    url: `https://podcastapi.aicerts.ai/voices/sample/${voiceId}`,
    headers,
  });

// 3️⃣ Get Models
const getModels = async () =>
  apiRequest({
    method: "GET",
    url: `https://podcastapi.aicerts.ai/tts-models`,
    headers,
  });

// 4️⃣ Generate Podcast
const generatePodcast = async (data: PodcastRequest) =>
  apiRequest({
    method: "POST",
    url: `https://podcastapi.aicerts.ai/generate-podcast`,
    headers,
    data,
  });

// 5️⃣ Generate Podcast with Script
const generatePodcastWithScript = async (data: PodcastRequest) =>
  apiRequest(
    {
      method: "POST",
      url: `https://podcastapi.aicerts.ai/generate-podcast-with-script`,
      headers,
      data,
    },
    {
      baseURL: "", // ✅ ADD THIS LINE
    }
  );

// 6️⃣ Generate Audio from Script
const generateAudioFromScript = async (data: any) =>
  apiRequest({
    method: "POST",
    url: `https://podcastapi.aicerts.ai/generate-audio-from-script`,
    headers,
    data,
  });

// 7️⃣ Download Audio
const downloadAudio = async (audioId: string) =>
  apiRequest({
    method: "GET",
    url: `https://podcastapi.aicerts.ai/audio/${audioId}`,
    headers,
  });

// 8️⃣ Health Check
const getHealth = async () =>
  apiRequest({
    method: "GET",
    url: `https://podcastapi.aicerts.ai/health`,
    headers,
  });

export {
  getVoices,
  getVoiceSample,
  getModels,
  generatePodcast,
  generatePodcastWithScript,
  generateAudioFromScript,
  downloadAudio,
  getHealth,
};