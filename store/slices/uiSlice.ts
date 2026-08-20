import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Language = "bn" | "en";
export type Theme = "dark" | "light";

export interface UiState {
  language: Language;
  theme: Theme;
  sidebarOpen: boolean;
  search: string;
  activeSection: string | null;
  searchFocused: boolean;
}

const initialState: UiState = {
  language: "bn",
  theme: "dark",
  sidebarOpen: false,
  search: "",
  activeSection: "overview",
  searchFocused: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
      try {
        localStorage.setItem("roadmap:lang", action.payload);
      } catch {
        /* ignore */
      }
    },
    toggleLanguage(state) {
      const next = state.language === "bn" ? "en" : "bn";
      state.language = next;
      try {
        localStorage.setItem("roadmap:lang", next);
      } catch {
        /* ignore */
      }
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
      try {
        localStorage.setItem("roadmap:theme", action.payload);
      } catch {
        /* ignore */
      }
      const root = document.documentElement;
      root.classList.toggle("light", action.payload === "light");
    },
    toggleTheme(state) {
      const next = state.theme === "dark" ? "light" : "dark";
      uiSlice.caseReducers.setTheme(state, { payload: next } as PayloadAction<Theme>);
    },
    hydrateTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    openSidebar(state) {
      state.sidebarOpen = true;
    },
    closeSidebar(state) {
      state.sidebarOpen = false;
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    clearSearch(state) {
      state.search = "";
    },
    setActiveSection(state, action: PayloadAction<string | null>) {
      state.activeSection = action.payload;
    },
    setSearchFocused(state, action: PayloadAction<boolean>) {
      state.searchFocused = action.payload;
    },
  },
});

export const {
  setLanguage,
  toggleLanguage,
  setTheme,
  toggleTheme,
  hydrateTheme,
  openSidebar,
  closeSidebar,
  toggleSidebar,
  setSearch,
  clearSearch,
  setActiveSection,
  setSearchFocused,
} = uiSlice.actions;

export default uiSlice.reducer;
