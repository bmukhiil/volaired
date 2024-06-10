"use client";

import { Provider } from "jotai";
import { ThemeProvider } from "./theme-provider";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </Provider>
  );
};
