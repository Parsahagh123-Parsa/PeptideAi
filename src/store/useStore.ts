import { create } from 'zustand';
import { User, Injection, SavedCalculation, Recommendation } from '../types';

interface AppState {
  // User
  user: User | null;
  setUser: (user: User | null) => void;

  // Injections
  injections: Injection[];
  addInjection: (injection: Injection) => void;
  updateInjection: (id: string, updates: Partial<Injection>) => void;
  deleteInjection: (id: string) => void;
  completeInjection: (id: string) => void;

  // Calculations
  savedCalculations: SavedCalculation[];
  addCalculation: (calculation: SavedCalculation) => void;
  deleteCalculation: (id: string) => void;

  // Recommendations
  recommendations: Recommendation[];
  setRecommendations: (recommendations: Recommendation[]) => void;
  clearRecommendations: () => void;
}

export const useStore = create<AppState>((set) => ({
  // User
  user: null,
  setUser: (user) => set({ user }),

  // Injections
  injections: [],
  addInjection: (injection) =>
    set((state) => ({
      injections: [...state.injections, injection],
    })),
  updateInjection: (id, updates) =>
    set((state) => ({
      injections: state.injections.map((inj) =>
        inj.id === id ? { ...inj, ...updates } : inj
      ),
    })),
  deleteInjection: (id) =>
    set((state) => ({
      injections: state.injections.filter((inj) => inj.id !== id),
    })),
  completeInjection: (id) =>
    set((state) => ({
      injections: state.injections.map((inj) =>
        inj.id === id
          ? { ...inj, status: 'completed', completedTime: new Date() }
          : inj
      ),
    })),

  // Calculations
  savedCalculations: [],
  addCalculation: (calculation) =>
    set((state) => ({
      savedCalculations: [...state.savedCalculations, calculation],
    })),
  deleteCalculation: (id) =>
    set((state) => ({
      savedCalculations: state.savedCalculations.filter((calc) => calc.id !== id),
    })),

  // Recommendations
  recommendations: [],
  setRecommendations: (recommendations) => set({ recommendations }),
  clearRecommendations: () => set({ recommendations: [] }),
}));

