export type GeneratedImage = {
  url: string;
  filename?: string;
};

export type ImageGenerateRequest = {
  content: string;
  model_name: string;
  num_images: string | number;
  aspect_ratio: string;
  image_size: string;
};

export type ImageGenerateResponse =
  | GeneratedImage[]
  | { images?: GeneratedImage[] }
  | { data?: GeneratedImage[] }
  | unknown;
