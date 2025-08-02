import { createSlice } from "@reduxjs/toolkit";

interface DarkModeState {
  darkMode: boolean
}

const getInitialDarkMode = (): boolean => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("darkMode");
    return stored === "true";
  }
  return false;
};

const initialState: DarkModeState = {
  darkMode: getInitialDarkMode()
}

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", state.darkMode.toString());
      }
    }
  }
}) 

export const { toggleDarkMode } = darkModeSlice.actions
export default darkModeSlice.reducer