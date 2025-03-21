import { create } from 'zustand';
import axios from 'axios';

const BASE_URL = 'https://api.imgflip.com';

export interface MemeTemplate {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

export interface Meme {
  url: string;
  page_url: string;
}

export interface ImgFlipState {
  templates: MemeTemplate[];
  trendingMemes: Meme[];
  generatedMeme: Meme | null;
  loading: boolean;
  error: string | null;
  fetchTemplates: () => Promise<void>;
  fetchMemes: () => Promise<void>;
  generateMeme: (templateId: string, captions: string[]) => Promise<void>;
}

export const useImgFlipStore = create<ImgFlipState>((set) => ({
  templates: [],
  trendingMemes: [],
  generatedMeme: null,
  loading: false,
  error: null,

  fetchTemplates: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${BASE_URL}/get_memes`);
      if (response.data.success) {
        set({ templates: response.data.data.memes, loading: false });
      } else {
        set({ error: 'Failed to fetch meme templates', loading: false });
      }
    } catch (error: any) {
      set({ error: 'Error fetching meme templates', loading: false });
    }
  },

  fetchMemes: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${BASE_URL}/get_memes`);
      if (response.data.success) {
        set({ trendingMemes: response.data.data.memes.slice(0, 10), loading: false });
      } else {
        set({ error: 'Failed to fetch trending memes', loading: false });
      }
    } catch (error: any) {
      set({ error: 'Error fetching trending memes', loading: false });
    }
  },

  generateMeme: async (templateId: string, captions: string[]) => {
    try {
      set({ loading: true, error: null });
      const params = new URLSearchParams({
        template_id: templateId,
        username: process.env.EXPO_PUBLIC_IMGFLIP_USERNAME!,
        password: process.env.EXPO_PUBLIC_IMGFLIP_PASSWORD!,
      });

      captions.forEach((text, index) => {
        params.append(`boxes[${index}][text]`, text);
      });

      const response = await axios.post(`${BASE_URL}/caption_image`, params);
      if (response.data.success) {
        set({ generatedMeme: response.data.data, loading: false });
      } else {
        set({ error: 'Failed to generate meme', loading: false });
      }
    } catch (error: any) {
      set({ error: 'Error generating meme', loading: false });
    }
  },
}));
