import { create } from 'zustand';

interface UIState {
    unlockedTemplateIds: string[];
    unlockTemplate: (id: string) => void;
    resetPremium: () => void;
    isTemplateUnlocked: (id: string) => boolean;
}

export const useUIStore = create<UIState>((set, get) => ({
    unlockedTemplateIds: [],

    unlockTemplate: (id) => {
        set((state) => ({
            unlockedTemplateIds: [...state.unlockedTemplateIds, id]
        }));
    },

    resetPremium: () => set({ unlockedTemplateIds: [] }),

    isTemplateUnlocked: (id) => get().unlockedTemplateIds.includes(id),
}));
