import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner"; // ✅ korrekt

export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
