import { create } from 'zustand';
import axios from 'axios';

const BASE_URL = 'https://opentdb.com/api.php';

export interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface TriviaState {
  questions: TriviaQuestion[];
  loading: boolean;
  error: string | null;
  fetchQuestions: (difficulty: string, category: number, amount?: number) => Promise<void>;
}

export const useTriviaStore = create<TriviaState>((set) => ({
  questions: [],
  loading: false,
  error: null,

  fetchQuestions: async (difficulty, category, amount = 10) => {
    try {
      set({ loading: true, error: null });

      const url = `${BASE_URL}?amount=${amount}&difficulty=${difficulty}&type=multiple&category=${category}`;
      const response = await axios.get(url);

      if (response.data.results) {
        set({ questions: response.data.results, loading: false });
      } else {
        set({ error: 'Failed to fetch trivia questions', loading: false });
      }
    } catch (error: any) {
      set({ error: 'Error fetching trivia questions', loading: false });
    }
  },
}));
