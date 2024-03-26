import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Gerar capa alunos | Instituto Mix de Profissões",
  description:
    "Gerador de capa para ficha de alunos dos cursos individualizados, do Instituto Mix de Profissões.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body className={inter.variable}>
          {children}
          <Toaster />
        </body>
      </ThemeProvider>
    </html>
  );
}
