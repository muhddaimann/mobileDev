import { create } from 'zustand';
import axios from 'axios';

const BASE_URL = 'http://colormind.io/api/';

export interface ColorPalette {
  colors: number[][];
}

export interface ColorState {
  palette: ColorPalette | null;
  suggestions: ColorPalette | null;
  loading: boolean;
  error: string | null;
  fetchPalette: () => Promise<void>;
  fetchPaletteFromImage: (imageUrl: string) => Promise<void>;
  fetchColorSuggestions: (baseColor: number[]) => Promise<void>;
}

export const useColorStore = create<ColorState>((set) => ({
  palette: null,
  suggestions: null,
  loading: false,
  error: null,

  fetchPalette: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(BASE_URL, { model: 'default' });
      set({ palette: { colors: response.data.result }, loading: false });
    } catch (error: any) {
      set({ error: 'Failed to fetch color palette', loading: false });
    }
  },

  fetchPaletteFromImage: async (imageUrl: string) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(BASE_URL, { model: 'default', input: imageUrl });
      set({ palette: { colors: response.data.result }, loading: false });
    } catch (error: any) {
      set({ error: 'Failed to extract colors from image', loading: false });
    }
  },

  fetchColorSuggestions: async (baseColor: number[]) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(BASE_URL, { model: 'default', input: [baseColor, "N", "N", "N", "N"] });
      set({ suggestions: { colors: response.data.result }, loading: false });
    } catch (error: any) {
      set({ error: 'Failed to fetch color suggestions', loading: false });
    }
  },
}));
