"use client";
import { create } from "zustand";

// ✅ Define type
type ProjectStore = {
  selectedProject: any;
  setProject: (data: any) => void;
};

// ✅ Add type here
export const useProjectStore = create<ProjectStore>((set) => ({
  selectedProject: null,
  setProject: (data) => set({ selectedProject: data }),
}));