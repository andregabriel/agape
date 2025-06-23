import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PlayerProvider } from "@/contexts/player-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hallow App Clone",
  description: "Frontend clone of Hallow app screens",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <PlayerProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="md:max-w-sm md:mx-auto md:shadow-lg md:overflow-hidden md:h-[800px] border md:border-gray-300">
              {children}
            </div>
          </ThemeProvider>
        </PlayerProvider>
      </body>
    </html>
  )
}
