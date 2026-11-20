"use client";

import { AppProvider } from "@/components/app-state";
import { AppRoot } from "@/components/app-root";

export default function HomePage() {
  return (
    <AppProvider>
      <AppRoot />
    </AppProvider>
  );
}
