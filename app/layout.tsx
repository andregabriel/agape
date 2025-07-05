import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ágape - Orações e Meditações",
  description: "Seu app de orações e meditações católicas com áudios gerados por IA.",
  generator: "v0.dev",
  icons: {
    icon: "/images/agape-logo.svg",
    apple: "/images/agape-logo.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="app-background">
      <body className={`${inter.className} app-background`}>
        <div className="app-background">
          {children}
        </div>
      </body>
    </html>
  )
}
