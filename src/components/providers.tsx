"use client";

import { Provider } from "jotai";
import { ThemeProvider } from "./theme-provider";

export const Providers = ({ children }) => {
  return (
    <Provider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </Provider>
  );
};
